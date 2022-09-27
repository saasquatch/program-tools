import { useDomContext } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  RegistrationFormState,
  REGISTRATION_FORM_STATE_CONTEXT,
} from "../sqm-portal-registration-form/useRegistrationFormState";
import { CheckboxField } from "./sqm-checkbox-field";

export function useCheckboxField(props: CheckboxField) {
  const registrationFormState = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (registrationFormState?.initialData?.[props.checkboxName]) {
      setChecked(!!registrationFormState?.initialData?.[props.checkboxName]);
    }
  }, [registrationFormState?.initialData?.[props.checkboxName]]);
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
