import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  FormState,
  FORM_VALIDATION_CONTEXT,
} from "../sqm-portal-register/useValidationState";

export function useDropdownField() {
  const validationState = useDomContext<FormState>(FORM_VALIDATION_CONTEXT);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
    },
  };
}
