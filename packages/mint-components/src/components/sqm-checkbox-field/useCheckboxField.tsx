import { useDomContext } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-registration-form/useRegistrationFormState";

export function useCheckboxField() {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  const [checked, setChecked] = useState(false);
  return {
    states: {
      registrationFormState,
      checked,
    },
    callbacks: {
      setChecked,
    },
  };
}
