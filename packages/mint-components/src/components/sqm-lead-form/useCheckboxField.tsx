import { useDomContext } from "@saasquatch/stencil-hooks";
import { LEAD_FORM_STATE_CONTEXT, LeadFormState } from "./useLeadFormState";

export function useLeadCheckboxField() {
  const leadFormState = useDomContext<LeadFormState>(LEAD_FORM_STATE_CONTEXT);

  return {
    states: {
      leadFormState,
    },
  };
}
