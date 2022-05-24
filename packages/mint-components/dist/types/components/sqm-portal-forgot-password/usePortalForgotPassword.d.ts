import { PortalForgotPassword } from "./sqm-portal-forgot-password";
export declare function usePortalForgotPassword(props: PortalForgotPassword): {
  states: {
    loading: boolean;
    error: string;
    success: boolean;
    loginPath: string;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
};
