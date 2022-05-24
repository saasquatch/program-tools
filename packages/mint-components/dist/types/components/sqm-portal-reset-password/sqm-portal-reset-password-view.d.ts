import { PasswordFieldViewDemoProps } from "../sqm-password-field/sqm-password-field";
export interface PortalResetPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    reset: boolean;
    confirmPassword: boolean;
    oobCodeValidating: boolean;
    oobCodeValid: boolean;
    passwordDemoData?: PasswordFieldViewDemoProps;
    content: {
      passwordResetHeader: string;
      resetPasswordHeader: string;
      continueButtonText: string;
      resetPasswordButtonText: string;
      confirmPasswordFieldLabel: string;
      passwordFieldLabel: string;
    };
  };
  callbacks: {
    submit: (node: any) => void;
    gotoNextPage: () => void;
    failed: () => void;
  };
}
export declare function PortalResetPasswordView(props: PortalResetPasswordViewProps): any;
