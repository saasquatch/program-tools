import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import { navigation } from "@saasquatch/component-boilerplate";

const PortalVerifyEmailMutation = gql`
  mutation PortalVerifyEmail($oobCode: String!) {
    verifyEmail(input: { oobCode: $oobCode }) {
      success
    }
  }
`;

export function usePortalVerifyEmail({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalVerifyEmailMutation,
    { loading: false }
  );
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");

  const nextPageOverride = urlParams.get(nextPageUrlParameter);

  const [verified, setVerified] = useState(false);
  const submit = async (_event: any) => {
    if (verified) {
      return navigation.push(nextPageOverride || nextPage);
    }
    if (oobCode) {
      await request({ oobCode });
    }
  };

  useEffect(() => {
    if (data?.verifyEmail?.success) {
      setVerified(true);
    }
  }, [data?.verifyEmail?.success]);

  return {
    states: {
      loading,
      error,
      verified,
    },
    callbacks: {
      submit,
    },
  };
}
