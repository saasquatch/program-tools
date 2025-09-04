import { useDomContext } from "@saasquatch/stencil-hooks";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { LEAD_FORM_STATE_CONTEXT, LeadFormState } from "./useLeadFormState";
import { LeadCheckboxField } from "./sqm-lead-checkbox-field";

export function useLeadCheckboxField(props: LeadCheckboxField) {
  const leadFormState = useDomContext<LeadFormState>(LEAD_FORM_STATE_CONTEXT);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (leadFormState?.initialData?.[props.checkboxName]) {
      setChecked(!!leadFormState?.initialData?.[props.checkboxName]);
    }
  }, [leadFormState?.initialData?.[props.checkboxName]]);

  return {
    states: {
      leadFormState,
      checked,
    },

    callbacks: {
      setChecked,
    },
  };
}
