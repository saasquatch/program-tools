import { useState } from "@saasquatch/universal-hooks";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/useTaxAndCash";
import { DocumentTypeForm } from "./sqm-document-type-form";

export function useDocumentTypeForm(props: DocumentTypeForm) {
  const [path, setPath] = useParent(TAX_CONTEXT_NAMESPACE);
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    const controls = e.target.getFormControls();

    let selectedDocumentType: string = null;
    controls.forEach((control) => {
      if (!control.name) return;

      const value = control.value;
      const checked = control.checked;

      if (checked) selectedDocumentType = value;
    });

    if (selectedDocumentType === null) {
      setErrors({ documentType: { status: "required" } });
      return;
    }

    setPath(`/3/${selectedDocumentType}`);
  };

  return {
    callbacks: {
      onSubmit,
      onBack: () => setPath("/2"),
    },
    states: {
      loading: false,
      submitDisabled: false,
      formState: {
        formSubmission: false,
        selectedTaxForm: "w9" as const,
        errors,
      },
    },
    text: {
      ...props,
      error: {
        formSubmission: props.formSubmissionError,
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
      },
    },
  };
}
