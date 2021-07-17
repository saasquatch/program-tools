import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import {
  navigation,
  useUserIdentity,
  setUserIdentity,
} from "@saasquatch/component-boilerplate";

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
  const userIdentity = useUserIdentity();
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalVerifyEmailMutationResult>(PortalVerifyEmailMutation, {
      loading: false,
    });
  const [verified, setVerified] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  const nextPageOverride = urlParams.get(nextPageUrlParameter);

  urlParams.delete("oobCode");

  const failed = () => {
    return navigation.push({
      pathname: "/",
      search: urlParams.toString(),
    });
  };

  const gotoNextPage = () => {
    urlParams.delete(nextPageUrlParameter);
    return navigation.push({
      pathname: nextPageOverride || nextPage,
      search: urlParams.toString(),
    });
  };

  const submit = async () => {
    if (oobCode) {
      await request({ oobCode });
    }
  };

  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      if (userIdentity) {
        setUserIdentity({
          ...userIdentity,
          managedIdentity: {
            ...userIdentity.managedIdentity,
            emailVerified: true,
          },
        });
      }
      setVerified(true);
      setTimeout(() => {
        gotoNextPage();
      }, 5000);
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

  useEffect(() => {
    submit();
  }, []);

  return {
    states: {
      loading,
      error,
      verified,
    },
    callbacks: {
      failed,
      gotoNextPage,
    },
  };
}
