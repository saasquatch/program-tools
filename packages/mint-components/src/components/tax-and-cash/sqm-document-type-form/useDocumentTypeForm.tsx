import { useMutation } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParentValue, useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { DocumentTypeForm } from "./sqm-document-type-form";

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useDocumentTypeForm(props: DocumentTypeForm) {
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const setPath = useSetParent(TAX_CONTEXT_NAMESPACE);

  const { refetch } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const [upsertUser] = useMutation(UPSERT_USER);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
