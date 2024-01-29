import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocusignForm } from "./sqm-docusign-form";

const GET_USER_TAX_INFO = gql`
  query getUserTaxInfo($id: String!, $accountId: String!) {
    user(id: $id, accountId: $accountId) {
      id
      accountId
      firstName
      lastName
      email
      countryCode
      customFields
    }
  }
`;

// TODO: Fill out when API is released
const GET_TAX_DOCUMENT = gql`
  query getTaxDocument ($vars: TaxDocumentInput) {
  }
`;

export function useDocusignForm(props: DocusignForm) {
  const user = useUserIdentity();
  const [path, setPath] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});

  const splitPath = path.split("/");
  const defaultDocumentType = splitPath.length === 3 ? splitPath[2] : undefined;

  console.log({ path, defaultDocumentType });

  const { data, loading } = useQuery(GET_USER_TAX_INFO, {
    id: user.id,
    accountId: user.accountId,
  });
  const countryCode = data?.getUserTaxInfo?.user?.countryCode;

  // TODO: Replace with real backend data
  const {
    data: taxInfo,
    loading: taxInfoLoading,
    refetch: refetchDocument,
  } = {
    data: {
      taxForm: "W9" as const,
      documentUrl: "https://example.com",
    },
    loading: false,
    refetch: (_vars: any) => console.debug("REFETCHING"),
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
        formSubmission: props.formSubmissionError,
      },
    },
    states: {
      submitDisabled: loading || taxInfoLoading || !formSubmitted,
      loading: loading || taxInfoLoading,
      formState: {
        completedTaxForm: formSubmitted,
        errors,
      },
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
