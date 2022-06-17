import { useHost } from "@saasquatch/component-boilerplate";
import { ContextProvider } from "dom-context";
import { useDomContextState } from "@saasquatch/dom-context-hooks";

export const REGISTRATION_FORM_STATE_CONTEXT = "sq:registration-form-state";

declare global {
  interface Window {
    squatchValidationState: ContextProvider<any>;
  }
}

export type RegistrationFormState = {
  loading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  initialData?: InitialData;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

export function useRegistrationFormState(formState?: RegistrationFormState) {
  const host = useHost();
  const [registrationFormState, setRegistrationFormState] =
    useDomContextState<RegistrationFormState>(
      host,
      REGISTRATION_FORM_STATE_CONTEXT,
      formState
    );

  return { registrationFormState, setRegistrationFormState };
}
