import { useDomContext } from "@saasquatch/stencil-hooks";
import { NameFields } from "./sqm-name-fields";
const CONTEXT_NAME = "sq:validation-state";

type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
};

type ValidationErrors = {
  [key: string]: string;
};

export function useNameFields(props: NameFields) {
  const validationState = useDomContext<FormState>(CONTEXT_NAME);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      content: {
        lastNameLabel: props.lastNameLabel,
        firstNameLabel: props.firstNameLabel,
      },
    },
  };
}
