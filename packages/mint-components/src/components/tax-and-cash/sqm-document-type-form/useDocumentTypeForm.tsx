import { useState } from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocumentTypeForm } from "./sqm-document-type-form";

export function useDocumentTypeForm(props: DocumentTypeForm) {
  const [path, setPath] = useParent(TAX_CONTEXT_NAMESPACE);
  const [errors, setErrors] = useState({});
  const [selectedTaxForm, setSelectedTaxForm] = useState(null);

  const onSubmit = (_args: any) => {};

  return {
    callbacks: {
      onSubmit,
      onBack: () => setPath("/2"),
    },
    states: {
      loading: false,
      submitDisabled: !selectedTaxForm,
      formState: {
        formSubmission: false,
        selectedTaxForm: selectedTaxForm,
        errors,
      },
    },
    text: {
      ...props,
      error: {
        formSubmission: props.formSubmissionError,
      },
    },
  };
}
