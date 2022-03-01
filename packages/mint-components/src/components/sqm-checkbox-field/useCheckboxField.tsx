import { useDomContext } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import {
  FormState,
  FORM_VALIDATION_CONTEXT,
} from "../sqm-portal-register/useValidationState";

export function useCheckboxField() {
  const validationState = useDomContext<FormState>(FORM_VALIDATION_CONTEXT);
  const [checked, setChecked] = useState(false);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      checked,
    },
    callbacks: {
      setChecked,
    },
  };
}
