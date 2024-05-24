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

function setWindowSubmitted(submitted: boolean) {
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
  const [submitted, setSubmitted] = useState(window[SUBMITTED_CONTEXT]);
  const userIdent = useUserIdentity();
  const [request, { loading, data, errors }] = useVerifyEmailMutation();
  const urlParams = new URLSearchParams(navigation.location.search);
  const oobCode = urlParams.get("oobCode");
  const oobEmail = urlParams.get("email");
  const nextPageOverride = urlParams.get("nextPage");

  const syncSubmitted = (submitted: boolean) => {
    setSubmitted(submitted);
    setWindowSubmitted(submitted);
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
    setTimeout(() => {
      setUserIdentity(undefined);
      gotoNextPage();
    }, 3000);
  };

  const login = () => {
    setTimeout(gotoNextPage, 3000);
  };

  const submit = async () => {
    syncSubmitted(true);
    const response = await request({ oobCode });

    if (
      response instanceof Error ||
      !response?.verifyManagedIdentityEmail?.success
    ) {
      logout();
      return;
    }
  };

  useEffect(() => {
    if (verified && validEmail) login();
    if (!validEmail) logout();

    if (!submitted) submit();
  }, [submitted, verified, validEmail]);

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
