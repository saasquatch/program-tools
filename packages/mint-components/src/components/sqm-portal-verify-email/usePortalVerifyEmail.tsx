import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";

export function usePortalVerifyEmail({ nextPage, failedPage }) {
  const [verified, setVerified] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);
  const userIdent = useUserIdentity();
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  const nextPageOverride = urlParams.get("nextPage");

  urlParams.delete("oobCode");

  const failed = () => {
    return navigation.push({
      pathname: failedPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    return navigation.push({
      pathname: nextPageOverride || nextPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  const submit = async () => {
    if (oobCode) {
      setError("");
      await request({ oobCode });
    }
  };

  useEffect(() => {
    if (data?.verifyManagedIdentityEmail?.success) {
      setVerified(true);
    }
  }, [data?.verifyManagedIdentityEmail?.success]);

  useEffect(() => {
    submit();
  }, []);

  useEffect(() => {
    if (userIdent?.managedIdentity?.emailVerified) {
      setDisableContinue(false);
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    } else if (
      !oobCode ||
      data?.verifyManagedIdentityEmail?.success === false
    ) {
      setDisableContinue(false);
    } else if (!userIdent) {
      setDisableContinue(false);
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    }
  }, [userIdent?.managedIdentity?.emailVerified]);

  useEffect(() => {
    if (errors?.message) {
      setError("Network request failed.");
    }
  }, [errors]);

  return {
    states: {
      loading: loading || disableContinue,
      error: errors?.response?.errors?.[0]?.message || error,
      verified,
    },
    data: {
      oobCode,
    },
    callbacks: {
      failed,
      gotoNextPage,
    },
  };
}
