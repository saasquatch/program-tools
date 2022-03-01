import { useDomContext } from "@saasquatch/stencil-hooks";
import {
  FormState,
  FORM_VALIDATION_CONTEXT,
} from "../sqm-portal-register/useValidationState";
import { NameFields } from "./sqm-name-fields";

export function useNameFields(props: NameFields) {
  const validationState = useDomContext<FormState>(FORM_VALIDATION_CONTEXT);
  return {
    states: {
      validationErrors: validationState?.validationErrors,
      content: {
        lastNameLabel: props.lastNameLabel,
        firstNameLabel: props.firstNameLabel,
      },
    },
  };
}
