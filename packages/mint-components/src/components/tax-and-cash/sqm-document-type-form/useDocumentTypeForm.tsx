import { useState } from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
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
      await upsertUser({
        userInput: {
          id: user.id,
          accountId: user.accountId,
          customFields: {
            __taxDocumentType: selectedDocumentType.toUpperCase(),
          },
        },
      });
      await refetch();

      setPath(`/3/${selectedDocumentType}`);
    } catch (e) {
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

  return {
    callbacks: {
      onSubmit,
      onBack: () => setPath("/2"),
    },
    states: {
      loading,
      disabled: loading,
      formState: {
        formSubmission: false,
        selectedTaxForm: "w9" as const,
        errors,
      },
    },
    text: {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
      },
    },
  };
}
