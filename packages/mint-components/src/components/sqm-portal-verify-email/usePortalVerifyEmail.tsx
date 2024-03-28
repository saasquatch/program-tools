import {
  navigation,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { sanitizeUrlPath } from "../../utils/utils";

const SUBMITTED_CONTEXT = "sq:verify-submitted";

function setSubmitted(submitted: boolean) {
  // using window due to dom-context getting reset on re-render
  window[SUBMITTED_CONTEXT] = submitted;
}

export function usePortalVerifyEmail({
  nextPage,
  failedPage,
  verifySuccessText,
  verifyEmailText,
  verifyInvalidText,
  networkErrorMessage,
  continueText,
}) {
  const submitted = window[SUBMITTED_CONTEXT];
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
    setSubmitted(true);

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
        setSubmitted(false);
      }, 3000);
    }
  };

  useEffect(() => {
    // Already verified, begin redirect
    if (verified) {
      setTimeout(() => {
        gotoNextPage();
        setSubmitted(false);
      }, 3000);
      return;
    }

    if (userIdent && !data && !submitted) submit();
  }, [verified, submitted, data, userIdent, submitted]);

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
      continueText,
    },
  };
}
