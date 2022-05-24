import { ContextProvider } from "dom-context";
declare global {
  interface Window {
    squatchValidationState: ContextProvider<any>;
  }
}
export declare type FormState = {
  error?: string;
  validationErrors?: ValidationErrors;
};
export declare type ValidationErrors = {
  [key: string]: string;
};
export declare function useValidationState(formState?: FormState): {
  validationState: FormState;
  setValidationState: (value: FormState | ((previousState?: FormState) => FormState)) => void;
};
