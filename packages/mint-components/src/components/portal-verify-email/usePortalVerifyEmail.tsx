import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import { navigation } from "@saasquatch/component-boilerplate";

const PortalVerifyEmailMutation = gql`
  mutation PortalVerifyEmail($oobCode: String!) {
    verifyManagedIdentityEmail(
      verifyManagedIdentityEmailInput: { oobCode: $oobCode }
    ) {
      success
    }
  }
`;

interface PortalVerifyEmailMutationResult {
  verifyManagedIdentityEmail: {
    success: boolean;
  };
}

export function usePortalVerifyEmail({ nextPage, nextPageUrlParameter }) {
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalVerifyEmailMutationResult>(PortalVerifyEmailMutation, {
      loading: false,
    });
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");

  const nextPageOverride = urlParams.get(nextPageUrlParameter);
  urlParams.delete(nextPageUrlParameter);

  const [verified, setVerified] = useState(false);
  const submit = async (_event: any) => {
    if (verified) {
      return navigation.push({
        pathname: nextPageOverride || nextPage,
        search: urlParams.toString(),
      });
    }
    if (oobCode) {
      await request({ oobCode });
    }
  };

  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      setVerified(true);
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

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
