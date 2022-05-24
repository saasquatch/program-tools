import { VNode } from "../../stencil-public-runtime";
import { FormState } from "./useValidationState";
export interface PortalRegisterViewProps {
  states: {
    error: string;
    loading: boolean;
    confirmPassword: boolean;
    hideInputs: boolean;
    validationState?: FormState;
    enablePasswordValidation?: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: Function;
    inputFunction: Function;
  };
  content: {
    formData?: VNode;
    terms?: VNode;
    passwordField?: VNode;
    secondaryButton?: VNode;
    emailLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    pageLabel?: string;
    confirmPasswordLabel: string;
  };
  refs: {
    formRef: any;
  };
}
export declare function PortalRegisterView(props: PortalRegisterViewProps): any;
