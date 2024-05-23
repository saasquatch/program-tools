import {
  navigation,
  setUserIdentity,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { sanitizeUrlPath } from "../../utils/utils";
import { UserInfoFormView } from "../tax-and-cash/sqm-user-info-form/sqm-user-info-form-view";
import { P } from "../../global/mixins";

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
  const [verificationError, setVerificationError] = useState(null);
  const [success, setSuccess] = useState(false);
  const email = userIdent?.managedIdentity?.email;
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  const oobEmail = urlParams.get("email");
  const nextPageOverride = urlParams.get("nextPage");

  // derived from useMutation in component boilerplate initialState
  const disableContinue =
    data === undefined && errors === undefined && !!oobCode;

  // if logged out, userIdent?.managedIdentity?.emailVerified will be falsey, even if verification was successful
  const hasContext = localStorage.getItem("sq:user-identity");
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

  const logout = () => {
    console.debug("LOGOUT");
    setTimeout(() => {
      gotoNextPage();
      setUserIdentity(undefined);
      setSubmitted(false);
    }, 3000);
  };

  const submit = async () => {
    setSubmitted(true);
    const response = await request({ oobCode });
    if (
      response instanceof Error ||
      !response?.verifyManagedIdentityEmail?.success
    ) {
      setVerificationError({ message: true });
    }
    console.debug("SUBMITTED", response);
  };

  console.log({ hasContext, userIdent, data, submitted, verified, errors });

  useEffect(() => {
    if (errors && !verified) setVerificationError(errors);
  }, [errors, verified]);

  useEffect(() => {
    if (!data && !submitted && oobCode) submit();

    // verification successful but user in context is not verified
    // or mismatch between logged in user and user associated with oobCode
    if (submitted) {
      console.debug("in submit condition");
      if (email && email !== oobEmail) {
        console.debug("email mismatch");
        logout();
        return;
        // Already verified, begin redirect
      }
      if (verified) {
        if (!verificationError) setSuccess(true);
        console.debug("verified");
        setTimeout(() => {
          gotoNextPage();
          setSubmitted(false);
        }, 3000);
        return;
      }
    }
  }, [submitted, verificationError, data, email, oobCode, oobEmail, submit]);

  return {
    states: {
      loading: loading || disableContinue,
      success,
      error:
        verificationError?.response?.errors?.[0]?.extensions?.message ||
        verificationError?.response?.errors?.[0]?.message ||
        (verificationError?.message && networkErrorMessage),
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
