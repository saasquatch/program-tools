import { PortalEmailVerification } from "./sqm-portal-email-verification";
export declare function usePortalEmailVerification(props: PortalEmailVerification): {
  states: {
    loading: boolean;
    error: string;
    success: boolean;
  };
  callbacks: {
    submit: () => Promise<void>;
  };
  content: {
    email: string;
    verifyMessage: string;
    emailVerificationHeader: string;
    resendEmailButtonText: string;
  };
};
