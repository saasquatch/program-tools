import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-google-registration-form/useGoogleRegistrationFormState";

export function useInputField() {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );

  return {
    states: {
      registrationFormState: registrationFormState,
    },
  };
}
