import { useState } from "@saasquatch/universal-hooks";
import { PortalPasswordField } from "./sqm-password-field";
import { PortalPasswordFieldViewProps } from "./sqm-password-field-view";
import { validateNewPassword } from "./passwordValidation";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { VNode } from "@stencil/core";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-google-registration-form/useGoogleRegistrationFormState";

export function usePasswordField(
  props: PortalPasswordField
): PortalPasswordFieldViewProps {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  const [dynamicValidation, setDynamicValidation] = useState<VNode | string>(
    ""
  );

  function onInput(input: Event) {
    const validation = validateNewPassword(
      (input.target as HTMLInputElement).value,
      props
    );
    setDynamicValidation(validation);
  }

  return {
    states: {
      enableValidation: !props.disableValidation,
      dynamicValidation,
      registrationFormState,
      content: {
        fieldLabel: props.fieldLabel,
      },
    },
    callbacks: {
      onInput,
    },
  };
}
