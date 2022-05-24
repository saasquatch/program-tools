export interface PortalVerifyEmailViewProps {
  states: {
    error: string;
    loading: boolean;
    verified: boolean;
  };
  data: {
    oobCode: string;
  };
  callbacks: {
    gotoNextPage: () => void;
    failed: () => void;
  };
}
export declare function PortalVerifyEmailView(props: PortalVerifyEmailViewProps): any;
