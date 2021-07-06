import gql from "graphql-tag";
import { useCallback, useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalVerifyEmailMutation = gql`
  mutation PortalVerifyEmail($oobCode: String!) {
    verifyEmail(input: { oobCode: $oobCode }) {
      success
    }
  }
`;

export function usePortalVerifyEmail() {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalVerifyEmailMutation,
    { loading: false }
  );
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");

  const [verified, setVerified] = useState(false);
  const formRef = useCallback((node) => {
    node.addEventListener("sl-submit", async (_event: any) => {
      if (verified) {
        // redirect
        return;
      }
      if (oobCode) {
        console.log(oobCode);
        await request({ oobCode });
      }
    });
  }, []);

  useEffect(() => {
    if (data?.verifyEmail?.success) {
      console.log("email verified");
      setVerified(true);
    }
  }, [data?.verifyEmail?.success]);

  return {
    states: {
      loading,
      error,
      verified,
    },
    refs: {
      formRef,
    },
  };
}
