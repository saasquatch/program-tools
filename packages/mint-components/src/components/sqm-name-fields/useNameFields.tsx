import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-google-registration-form/useGoogleRegistrationFormState";
import { NameFields } from "./sqm-name-fields";

export function useNameFields(props: NameFields) {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  return {
    states: {
      registrationFormState,
      content: {
        lastNameLabel: props.lastNameLabel,
        firstNameLabel: props.firstNameLabel,
      },
    },
  };
}
