import { useHost } from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/dom-context-hooks";

export const REGISTRATION_FORM_STATE_CONTEXT = "sq:registration-form-state";

export type GoogleRegistrationFormState = {
  error?: string;
  validationErrors?: ValidationErrors;
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

export function useGoogleRegistrationFormState(formState?: GoogleRegistrationFormState) {
  const host = useHost();
  const [googleRegistrationFormState, setGoogleRegistrationFormState] =
    useDomContextState<GoogleRegistrationFormState>(
      host,
      REGISTRATION_FORM_STATE_CONTEXT,
      formState
    );

  return { googleRegistrationFormState, setGoogleRegistrationFormState };
}
