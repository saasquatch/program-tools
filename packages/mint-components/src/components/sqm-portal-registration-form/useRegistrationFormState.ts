import { useHost } from "@saasquatch/component-boilerplate";
import { useDomContextState } from "@saasquatch/dom-context-hooks";
import { State, useDomContext } from "@saasquatch/stencil-hooks";

export const REGISTRATION_FORM_STATE_CONTEXT = "sq:registration-form-state";
const REGISTRATION_FORM_STATE_CONTEXT_INTERNAL =
  "sq:registration-form-state-internal";

type StateType<T> = [value?: T, setValue?: (value: T) => void];
export type RegistrationFormState = {
  error?: string;
  validationErrors?: ValidationErrors;
  loading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  initialData?: InitialData;
  _googleOAuthIdToken?: string;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

export function useRegistrationForm() {
  const parent = useDomContext<StateType<RegistrationFormState>>(
    REGISTRATION_FORM_STATE_CONTEXT_INTERNAL
  );
  const parentValue = useDomContext<RegistrationFormState>(
    REGISTRATION_FORM_STATE_CONTEXT
  );

  if (!parent) return [undefined, undefined];
  return [parentValue, parent[1]] as const;
}

export function useRegistrationFormState(formState?: RegistrationFormState) {
  const host = useHost();
  const [registrationFormState, setRegistrationFormState] =
    useDomContextState<RegistrationFormState>(
      host,
      REGISTRATION_FORM_STATE_CONTEXT,
      formState
    );

  useDomContextState<
    [
      value?: RegistrationFormState,
      setValue?: (value: RegistrationFormState) => void
    ]
  >(host, REGISTRATION_FORM_STATE_CONTEXT_INTERNAL, [
    registrationFormState,
    setRegistrationFormState,
  ]);

  return { registrationFormState, setRegistrationFormState };
}
