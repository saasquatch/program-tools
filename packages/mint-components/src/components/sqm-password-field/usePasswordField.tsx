import { useState } from "@saasquatch/universal-hooks";
import { FormState } from "../sqm-portal-register/useValidationState";
import { PortalPasswordField } from "./sqm-password-field";
import { PortalPasswordFieldViewProps } from "./sqm-password-field-view";
import { validateNewPassword } from "./passwordValidation";
import { useDomContext } from "@saasquatch/stencil-hooks";
import { VNode } from "@stencil/core";

const CONTEXT_NAME = "sq:validation-state";
export function usePasswordField(
  props: PortalPasswordField
): PortalPasswordFieldViewProps {
  const validationState = useDomContext<FormState>(CONTEXT_NAME);
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
