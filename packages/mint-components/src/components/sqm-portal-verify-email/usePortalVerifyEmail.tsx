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
import { validate } from "graphql";

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
}) {
  const [submitted, setSubmitted] = useState(window[SUBMITTED_CONTEXT]);
  const [completed, setCompleted] = useState(window[COMPLETED_CONTEXT]);
  const userIdent = useUserIdentity();
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  const oobEmail = urlParams.get("email");
  const nextPageOverride = urlParams.get("nextPage");

  const syncSubmitted = (submitted: boolean) => {
    setSubmitted(submitted);
    syncContext(SUBMITTED_CONTEXT, submitted);
  };
  const syncCompleted = (completed: boolean) => {
    setCompleted(completed);
    syncContext(COMPLETED_CONTEXT, completed);
  };
  const syncSuccess = (completed: boolean) => {
    setCompleted(completed);
    syncContext(COMPLETED_CONTEXT, completed);
  };
  const syncError = (completed: boolean) => {
    setCompleted(completed);
    syncContext(COMPLETED_CONTEXT, completed);
  };

  // derived from useMutation in component boilerplate initialState
  const disableContinue =
    data === undefined && errors === undefined && !!oobCode;

  // if logged out, userIdent?.managedIdentity?.emailVerified will be falsey, even if verification was successful
  const verified = !!userIdent?.managedIdentity?.emailVerified;
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

  const submit = async () => {
    // If a user is already in context, clear context
    // Otherwise verification won't see a new user identity
    if (userIdent) setUserIdentity(undefined);

    syncSubmitted(true);
    const response = await request({ oobCode });
    syncCompleted(true);

    if (
      response instanceof Error ||
      !response?.verifyManagedIdentityEmail?.success
    ) {
      logout();
      return;
    }
  };

  useEffect(() => {
    if (!submitted) submit();
  }, [submitted]);

  useEffect(() => {
    if (completed) {
      if (verified && validEmail) login();

      // TODO: Add check here for userIdent to avoid multiple log outs
      if (!validEmail) logout();
    }
  }, [completed, verified, validEmail]);

  return {
    states: {
      loading: loading || !completed,
      disableContinue,
      success: completed && (verified || validEmail),
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        ((errors?.message || !validEmail) && networkErrorMessage),
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
