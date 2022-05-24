export interface PortalForgotPasswordViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    secondaryButton: any;
    messageSlot: any;
    emailLabel?: string;
    submitLabel?: string;
  };
}
export declare function PortalForgotPasswordView(props: PortalForgotPasswordViewProps): any;
