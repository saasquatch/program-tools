import { PortalChangePassword } from "./sqm-portal-change-password";
export declare function usePortalChangePassword(props: PortalChangePassword): {
  states: {
    open: boolean;
    loading: boolean;
    success: boolean;
    error: string;
    content: {
      modalChangePasswordHeader: string;
      cancelText: string;
      changePasswordButtonText: string;
      passwordFieldLabel: string;
      confirmPasswordFieldLabel: string;
      successMessage: string;
      portalChangePasswordHeader: string;
      portalChangePasswordButtonText: string;
    };
  };
  data: {};
  callbacks: {
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
    submit: (event: any) => Promise<void>;
  };
};
