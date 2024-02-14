import { useState } from "@saasquatch/universal-hooks";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { DocumentTypeForm } from "./sqm-document-type-form";
import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { gql } from "graphql-request";

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useDocumentTypeForm(props: DocumentTypeForm) {
  const [path, setPath] = useParent(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const [loading, setLoading] = useState(false);
  const [upsertUser] = useMutation(UPSERT_USER);
  const [errors, setErrors] = useState({});
  const user = useUserIdentity();
  const { refetch } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const onSubmit = async (e) => {
    const controls = e.target.getFormControls();

    let selectedDocumentType: string = null;
    controls.forEach((control) => {
      if (!control.name) return;

      const value = control.value;
      const checked = control.checked;

      if (checked) selectedDocumentType = value;
    });

    if (selectedDocumentType === null) {
      setErrors({ documentType: true });
      return;
    }

    setLoading(true);
    try {
      console.log({ selectedDocumentType });
      setPath(`/3/${selectedDocumentType}`);
    } catch (e) {
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    text: props.getTextProps(),
    callbacks: {
      onSubmit,
      onBack: () => setPath(context.overrideBackStep || "/2"),
    },
    states: {
      hideSteps: context.hideSteps,
      loading,
      disabled: loading,
      formState: {
        formSubmission: false,
        selectedTaxForm: "W9" as const,
        errors,
      },
    },
  };
}

export type UseDocumentTypeFormResult = ReturnType<typeof useDocumentTypeForm>;
