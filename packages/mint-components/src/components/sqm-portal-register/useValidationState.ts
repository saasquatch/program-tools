import { useHost } from "@saasquatch/component-boilerplate";
import { ContextProvider } from "dom-context";
import { useDomContextState } from "@saasquatch/dom-context-hooks";

const CONTEXT_NAME = "sq:validation-state";

declare global {
  interface Window {
    squatchValidationState: ContextProvider<any>;
  }
}

export type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
};

export type ValidationErrors = {
  [key: string]: string;
};

export function useValidationState(formState?: FormState) {
  const host = useHost();
  const [validationState, setValidationState] = useDomContextState<FormState>(
    host,
    CONTEXT_NAME,
    formState
  );

  return { validationState, setValidationState };
}
