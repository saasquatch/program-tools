import {
  navigation,
  setUserIdentity,
  useUserIdentity,
  useVerifyEmailMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";
import { UserInfoFormView } from "../tax-and-cash/sqm-user-info-form/sqm-user-info-form-view";
import { P } from "../../global/mixins";
import { validate } from "graphql";
import { useEffect, useMemo, useState } from "@saasquatch/stencil-hooks";

const SUBMITTED_CONTEXT = "sq:verify-submitted";
const COMPLETED_CONTEXT = "sq:verify-completed";

function syncContext(context: string, value: boolean) {
  window[context] = value;
}

export function usePortalVerifyEmail({
  nextPage,
  failedPage,
  verifySuccessText,
  verifyEmailText,
  verifyInvalidText,
  networkErrorMessage,
  continueText,
  id,
}) {
  // const submitted = window[SUBMITTED_CONTEXT];
  // const [id, setId] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
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
  const verified =
    !!userIdent?.managedIdentity?.emailVerified ||
    data?.verifyManagedIdentityEmail?.success;
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
    console.debug("LOGGING OUT");
    setTimeout(() => {
      setUserIdentity(undefined);
      gotoNextPage();
    }, 3000);
  };

  const login = () => {
    console.debug("LOGGING IN");
    setTimeout(gotoNextPage, 3000);
  };

  useEffect(() => {
    const verify = async () => {
      await request({ oobCode });
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
