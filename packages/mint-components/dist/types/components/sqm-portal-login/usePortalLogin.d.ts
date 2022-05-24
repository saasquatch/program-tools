export declare function usePortalLogin(props: any): {
  states: {
    loading: boolean;
    error: string;
    registerPath: any;
    forgotPasswordPath: any;
  };
  callbacks: {
    submit: (event: any) => Promise<void>;
  };
};
