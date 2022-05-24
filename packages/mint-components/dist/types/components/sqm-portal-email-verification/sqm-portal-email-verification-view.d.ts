export interface PortalEmailVerificationViewProps {
  states: {
    error: string;
    loading: boolean;
    success: boolean;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    email: string;
    verifyMessage: string;
    emailVerificationHeader: string;
    resendEmailButtonText: string;
  };
}
export declare function PortalEmailVerificationView(props: PortalEmailVerificationViewProps): any;
