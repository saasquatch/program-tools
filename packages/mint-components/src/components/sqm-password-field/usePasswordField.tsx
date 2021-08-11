import { useDomContext } from "@saasquatch/stencil-hooks";
import { FormState } from "../sqm-portal-register/useValidationState";
import { validateNewPassword } from "./passwordValidation";
import { PortalPasswordField } from "./sqm-password-field";
import { PortalPasswordFieldViewProps } from "./sqm-password-field-view";

const CONTEXT_NAME = "sq:validation-state";
export function usePasswordField(
  props: PortalPasswordField
): PortalPasswordFieldViewProps {
  const validationState = useDomContext<FormState>(CONTEXT_NAME);

  return {
    states: {
      validationErrors: validationState?.validationErrors,
      content: {
        fieldLabel: props.fieldLabel,
      },
    },
    callbacks: {
      validateNewPassword,
    },
  };
}
