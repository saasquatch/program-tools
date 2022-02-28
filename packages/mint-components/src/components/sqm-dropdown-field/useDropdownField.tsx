import { useDomContext } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
const CONTEXT_NAME = "sq:validation-state";

type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
};

type ValidationErrors = {
  [key: string]: string;
};

export function useDropdownField() {
  const validationState = useDomContext<FormState>(CONTEXT_NAME);
  const [checked, setChecked] = useState(false);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      checked,
    },
    callbacks: {
      setChecked,
    },
  };
}
