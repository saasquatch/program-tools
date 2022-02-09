import { useDomContext } from "@saasquatch/stencil-hooks";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { NameFields } from "./sqm-checkbox-field";
const CONTEXT_NAME = "sq:validation-state";

type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
};

type ValidationErrors = {
  [key: string]: string;
};

export function useCheckboxField(props: NameFields) {
  const validationState = useDomContext<FormState>(CONTEXT_NAME);
  const [checked, setChecked] = useState(false);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      checked,
    },
    content: {
      checkboxLabel: props.checkboxLabel,
      checkboxName: props.checkboxName,
      errorMessage: props.errorMessage,
    },
    callbacks: {
      setChecked,
    },
  };
}
