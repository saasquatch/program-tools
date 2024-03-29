import { useEffect } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";

export function usePortalVerifyEmail({
  nextPage,
  failedPage,
  verifySuccessText,
  verifyEmailText,
  verifyInvalidText,
  networkErrorMessage,
}) {
  const userIdent = useUserIdentity();
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  const nextPageOverride = urlParams.get("nextPage");

  // derived from useMutation in component boilerplate initialState
  const disableContinue =
    data === undefined && errors === undefined && !!oobCode;

  // if logged out, userIdent?.managedIdentity?.emailVerified will be falsey, even if verification was successful
  const verified = !!(
    userIdent?.managedIdentity?.emailVerified ||
    data?.verifyManagedIdentityEmail.success
  );

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

  const submit = async () => {
    if (oobCode) {
      const result = await request({ oobCode });
      if (
        (result instanceof Error ||
          !result.verifyManagedIdentityEmail.success) &&
        !userIdent?.managedIdentity?.emailVerified
      ) {
        // pause on error if logged out/unverified
        return;
      }
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    }
  };

  useEffect(() => {
    // Already verified, begin redirect
    if (verified) {
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    }
    !data && submit();
  }, [verified]);

  return {
    states: {
      loading: loading || disableContinue,
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        (errors?.message && networkErrorMessage),
      verified,
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
    },
  };
}
