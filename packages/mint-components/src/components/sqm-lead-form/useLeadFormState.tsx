import { useHost } from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/dom-context-hooks";

export const LEAD_FORM_STATE_CONTEXT = "sq:lead-form-state";
const LEAD_FORM_STATE_CONTEXT_INTERNAL = "sq:lead-form-state-internal";

export type LeadFormState = {
  error?: string;
  validationErrors?: ValidationErrors;
  loading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  initialData?: InitialData;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

export function useLeadFormState(formState?: LeadFormState) {
  const host = useHost();
  const [leadFormState, setLeadFormState] = useDomContextState<LeadFormState>(
    host,
    LEAD_FORM_STATE_CONTEXT,
    formState
  );

  useDomContextState<
    [value?: LeadFormState, setValue?: (value: LeadFormState) => void]
  >(host, LEAD_FORM_STATE_CONTEXT_INTERNAL, [leadFormState, setLeadFormState]);

  return { leadFormState, setLeadFormState };
}
