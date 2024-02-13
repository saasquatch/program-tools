import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useMemo, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxDocumentType,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { DocusignForm } from "./sqm-docusign-form";

type CreateTaxDocumentQuery = {
  documentUrl: string;
};
const GET_TAX_DOCUMENT = gql`
  mutation createImpactPartnerTaxDocument(
    $vars: CreateImpactPartnerTaxDocumentInput
  ) {
    createImpactPartnerTaxDocument(createImpactPartnerTaxDocumentInput: $vars) {
      documentUrl
    }
  }
`;

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useDocusignForm(props: DocusignForm, el: any) {
  const user = useUserIdentity();
  const [path, setPath] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const { data, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const splitPath = path.split("/");
  const pathedDocumentType =
    splitPath.length === 3 ? (splitPath[2] as TaxDocumentType) : undefined;

  const documentType =
    pathedDocumentType || // Prioritise path param override
    data?.user?.impactPartner?.currentTaxDocument?.type || // Then current form (could be different than required)
    data?.user?.impactPartner?.requiredTaxDocumentType; // Last, the required tax form

  const [
    createTaxDocument,
    { loading: documentLoading, data: document, errors: documentErrors },
  ] = useMutation<CreateTaxDocumentQuery>(GET_TAX_DOCUMENT);

  useEffect(() => {
    if (data.user && !data.user.impactPartner) {
      setErrors({ general: true });
      return;
    }

    if (!user || !documentType) return;

    createTaxDocument({
      userId: user.id,
      accountId: user.accountId,
      taxDocumentType: documentType,
    });
  }, [data, user, documentType]);

  useEffect(() => {
    if (!document) return;
    // Load docusign iframe with given url
    const slotted = el.querySelector("sqm-docusign-embed");
    if (slotted) slotted.url = document.documentUrl;
  }, [document]);

  const onSubmit = async () => {
    if (!formSubmitted) {
      setErrors({ submitCheckbox: true });
      return;
    }

    // TODO: Check document is actually registered in the backend
    try {
      setLoading(true);
      // Backend request
      // await upsertUser({
      //   userInput: {
      //     id: user.id,
      //     accountId: user.accountId,
      //     customFields: {
      //       __taxDocumentSubmitted: true,
      //     },
      //   },
      // });
      await refetch();

      setPath(context.overrideNextStep || "/submitted");
    } catch (e) {
      setErrors({ formSubission: { status: "document-error" } });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setPath(context.overrideBackStep || "/2");
  };

  return {
    states: {
      hideSteps: context.hideSteps,
      disabled: documentLoading || loading,
      submitDisabled: !formSubmitted,
      loading: documentLoading || loading,
      formState: {
        completedTaxForm: formSubmitted,
        taxFormExpired: false, // TODO: Unhardcode this
        errors,
      },
      documentType,
    },
    data: {
      taxForm: documentType,
      documentUrl: document?.documentUrl,
    },
    callbacks: {
      onShowDocumentType: () => setPath("/3b"),
      onSubmit,
      toggleFormSubmitted: () => setFormSubmitted((x) => !x),
      onBack,
    },
    text: props.getTextProps(),
  };
}

export type UseDocusignFormResult = ReturnType<typeof useDocusignForm>;
