export declare function usePortalVerifyEmail({ nextPage, failedPage }: {
  nextPage: any;
  failedPage: any;
}): {
  states: {
    loading: boolean;
    error: string;
    verified: boolean;
  };
  data: {
    oobCode: string;
  };
  callbacks: {
    failed: () => void;
    gotoNextPage: () => void;
  };
};
