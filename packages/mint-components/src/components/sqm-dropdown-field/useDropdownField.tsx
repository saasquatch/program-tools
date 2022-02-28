import { useDomContext } from "@saasquatch/stencil-hooks";
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
  return {
    states: {
      validationErrors: validationState?.validationErrors,
    },
  };
}
