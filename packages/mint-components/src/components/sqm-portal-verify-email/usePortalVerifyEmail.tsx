import {
  navigation,
  setUserIdentity,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { sanitizeUrlPath } from "../../utils/utils";

let globalPromise: null | Promise<any | Error> = null;

export function usePortalVerifyEmail({
  nextPage,
  failedPage,
  verifySuccessText,
  verifyEmailText,
  verifyInvalidText,
  networkErrorMessage,
  continueText,
}) {
  const [completed, setCompleted] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const userIdent = useUserIdentity();
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  const oobEmail = urlParams.get("email");
  const nextPageOverride = urlParams.get("nextPage");

  // derived from useMutation in component boilerplate initialState
  const disableContinue =
    data === undefined && errors === undefined && !!oobCode;

  // if logged out, userIdent?.managedIdentity?.emailVerified will be falsey, even if verification was successful
  const verified = !!(
    userIdent?.managedIdentity?.emailVerified ||
    data?.verifyManagedIdentityEmail?.success ||
    successful
  );
  const validEmail = userIdent?.managedIdentity?.email === oobEmail;

  const failed = () => {
    return navigation.push({
      pathname: failedPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };

  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    const url = sanitizeUrlPath(nextPageOverride || nextPage);
    navigation.push(url.href);
  };

  const logout = () => {
    setTimeout(() => {
      setUserIdentity(undefined);
      gotoNextPage();
    }, 3000);
  };

  const login = () => {
    setTimeout(gotoNextPage, 3000);
  };

  useEffect(() => {
    const verify = async () => {
      if (!globalPromise) globalPromise = request({ oobCode });
      const result = await globalPromise;

      if (
        !(result instanceof Error) &&
        result.verifyManagedIdentityEmail.success
      ) {
        // Needs to be explicitly updated if multiple renders have occured
        setSuccessful(true);
      }

      setCompleted(true);
    };

    verify();
  }, []);

  useEffect(() => {
    if (!completed) return;

    if (verified && validEmail) login();
    else logout();
  }, [completed, verified]);

  return {
    states: {
      loading: loading || !completed,
      disableContinue,
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        ((errors?.message || !validEmail) && networkErrorMessage),
      success: completed && (verified || validEmail),
    },
    data: {
      oobCode,
    },
    callbacks: {
      failed,
      gotoNextPage,
    },
    content: {
      verifySuccessText,
      verifyEmailText,
      verifyInvalidText,
      continueText,
    },
  };
}
