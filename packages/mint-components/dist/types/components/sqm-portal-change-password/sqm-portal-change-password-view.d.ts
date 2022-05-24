export interface PortalChangePasswordViewProps {
  states: {
    open: boolean;
    error: string;
    loading: boolean;
    success: boolean;
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
  callbacks: {
    setOpen: (open: boolean) => void;
    submit: (event: MouseEvent) => void;
  };
}
export declare function PortalChangePasswordView(props: PortalChangePasswordViewProps): any;
