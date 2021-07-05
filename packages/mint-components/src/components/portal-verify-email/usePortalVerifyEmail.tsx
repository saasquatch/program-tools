import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
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

  useEffect(() => {
    if (data?.verifyEmail?.success) {
      console.log("email verified");
      setVerified(true);
    }
  }, [data?.verifyEmail?.success]);

  const verify = async () => {
    if (oobCode) {
      console.log(oobCode);
      await request({ oobCode });
    }
  };

  return {
    states: {
      loading,
      error,
      verified,
    },
    callbacks: {
      verify,
    },
  };
}
