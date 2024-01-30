import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocusignForm } from "./sqm-docusign-form";
import { TaxDocumentType } from "../sqm-tax-document-submitted/sqm-tax-document-submitted-view";

const GET_USER_TAX_INFO = gql`
  query getUserTaxInfo {
    viewer {
      ... on User {
        id
        accountId
        firstName
        lastName
        email
        countryCode
        customFields
      }
    }
  }
`;

// TODO: Fill out when API is released
const GET_TAX_DOCUMENT = gql`
  query getTaxDocument ($vars: TaxDocumentInput) {
  }
`;

export function useDocusignForm(props: DocusignForm, el: any) {
  console.log({ el });
  const user = useUserIdentity();
  const [path, setPath] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const splitPath = path.split("/");
  const defaultDocumentType = splitPath.length === 3 ? splitPath[2] : undefined;

  const { data, loading } = useQuery(GET_USER_TAX_INFO, {});
  const countryCode = data?.viewer?.countryCode;

  // TODO: Replace with real backend data
  const {
    data: taxInfo,
    loading: taxInfoLoading,
    refetch: refetchDocument,
  } = {
    data: {
      taxForm: defaultDocumentType,
      documentUrl: "https://example.com",
    },
    loading: false,
    refetch: (_vars: any) => console.debug("REFETCHING", _vars),
  };

  useEffect(() => {
    if (countryCode && !defaultDocumentType) return;

    if (countryCode === "US") {
      refetchDocument({ documentType: "W9" });
    } else if (countryCode === "CA") {
      refetchDocument({ documentType: "W8-BEN" });
    } else {
      refetchDocument({ documentType: "W8-BEN-E" });
    }
  }, [countryCode]);

  useEffect(() => {
    // Load docusign iframe with given url
    const slotted = el.querySelector("sqm-docusign-embed");
    if (slotted) {
      slotted.url = taxInfo.documentUrl;
    }
  }, [taxInfo.documentUrl]);

  const onSubmit = () => {
    if (!formSubmitted) {
      setErrors({ submitCheckbox: true });
      return;
    }

    setPath("/4");
  };

  return {
    text: {
      ...props,
      error: {
        // TODO: this prop was removed from the controller/view
        // formSubmission: props.formSubmissionError,
      },
    },
    states: {
      submitDisabled: loading || taxInfoLoading || !formSubmitted,
      loading: loading || taxInfoLoading,
      formState: {
        completedTaxForm: formSubmitted,
        errors,
      },
      documentType: defaultDocumentType?.toUpperCase() as TaxDocumentType,
    },
    data: {
      taxForm: taxInfo?.taxForm,
      documentUrl: taxInfo?.documentUrl,
    },
    callbacks: {
      onShowDocumentType: () => setPath("/3b"),
      onSubmit,
      toggleFormSubmitted: () => setFormSubmitted((x) => !x),
      onBack: () => setPath("/2"),
    },
  };
}
