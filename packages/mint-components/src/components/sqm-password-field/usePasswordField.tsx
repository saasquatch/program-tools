import { useState } from "@saasquatch/universal-hooks";
import {
  FormState,
  FORM_VALIDATION_CONTEXT,
} from "../sqm-portal-register/useValidationState";
import { PortalPasswordField } from "./sqm-password-field";
import { PortalPasswordFieldViewProps } from "./sqm-password-field-view";
import { validateNewPassword } from "./passwordValidation";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { VNode } from "@stencil/core";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-registration-form/useRegistrationFormState";

export function usePasswordField(
  props: PortalPasswordField
): PortalPasswordFieldViewProps {
  const validationState = useDomContext<FormState>(FORM_VALIDATION_CONTEXT);
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  const [dynamicValidation, setDynamicValidation] = useState<VNode | string>(
    ""
  );
  function onInput(input: Event) {
    const validation = validateNewPassword(
      (input.target as HTMLInputElement).value
    );
    setDynamicValidation(validation);
  }

  return {
    states: {
      enableValidation: props.enableValidation,
      dynamicValidation,
      registrationFormState,
      validationErrors: validationState?.validationErrors,
      content: {
        fieldLabel: props.fieldLabel,
      },
    },
    callbacks: {
      onInput,
    },
  };
}
