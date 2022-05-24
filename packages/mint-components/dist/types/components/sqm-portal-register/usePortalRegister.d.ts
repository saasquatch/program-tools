import { PortalRegister } from "./sqm-portal-register";
export declare type ValidationErrorFunction = (input: {
  control: any;
  key: string;
  value: any;
}) => string | undefined;
export declare function usePortalRegister(props: PortalRegister): {
  states: {
    loading: boolean;
    error: string;
    validationState: import("./useValidationState").FormState;
    confirmPassword: boolean;
    hideInputs: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
    inputFunction: (e: any) => void;
  };
  refs: {
    formRef: {
      current: HTMLFormElement;
    };
  };
};
