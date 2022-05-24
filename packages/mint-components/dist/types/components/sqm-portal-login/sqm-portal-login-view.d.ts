export interface PortalLoginViewProps {
  states: {
    error: string;
    loading: boolean;
    forgotPasswordPath: string;
    registerPath: string;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
  content: {
    forgotPasswordButton?: any;
    secondaryButton?: any;
    emailLabel?: string;
    passwordLabel?: string;
    submitLabel?: string;
    pageLabel?: string;
  };
}
export declare function PortalLoginView(props: PortalLoginViewProps): any;
