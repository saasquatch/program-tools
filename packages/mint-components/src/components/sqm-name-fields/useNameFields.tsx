import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  FormState,
  FORM_VALIDATION_CONTEXT,
} from "../sqm-portal-register/useValidationState";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-registration-form/useRegistrationFormState";
import { NameFields } from "./sqm-name-fields";

export function useNameFields(props: NameFields) {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  const validationState = useDomContext<FormState>(FORM_VALIDATION_CONTEXT);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      registrationFormState,
      content: {
        lastNameLabel: props.lastNameLabel,
        firstNameLabel: props.firstNameLabel,
      },
    },
  };
}
