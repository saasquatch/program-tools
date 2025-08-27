import { useDomContext } from "@saasquatch/stencil-hooks";
import { LeadFormState, LEAD_FORM_STATE_CONTEXT } from "./useLeadFormState";

export function useLeadDropdownField() {
  const leadFormState = useDomContext<LeadFormState>(LEAD_FORM_STATE_CONTEXT);

  return {
    states: {
      leadFormState,
    },
  };
}
