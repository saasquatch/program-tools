import {
  navigation,
  useManagedIdentitySessionQuery,
  useRequestVerificationEmailMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { PortalEmailVerification } from "./sqm-portal-email-verification";

interface ManagedIdentitySessionResult {
  managedIdentitySession: {
    email: string;
    emailVerified: boolean;
    sessionData: Record<string, any>;
  };
}

// var refreshTimer;
export function usePortalEmailVerification(props: PortalEmailVerification) {
  const [request, { loading, data, errors }] =
    useRequestVerificationEmailMutation();

  const [getVerificationStatus, { data: user, loading: loadingVerification }] =
    useManagedIdentitySessionQuery();

  const userIdent = useUserIdentity();
  const email = userIdent?.managedIdentity?.email;
  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPage = urlParams.get("nextPage");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(10);
  const timerRef = useRef<any>(undefined);

  const submit = async () => {
    if (!email) return;
    setError("");
    setSuccess(false);
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email, urlParams, redirectPath };
    const result = await request(variables);
    if (result instanceof Error) {
      if (result.message) setError("Network request failed.");
      return;
    }
    if (result.requestManagedIdentityVerificationEmail?.success)
      setSuccess(true);
  };

  async function checkVerification() {
    setCountdown(10);
    const data =
      (await getVerificationStatus()) as ManagedIdentitySessionResult;

    if (data?.managedIdentitySession?.emailVerified) {
      clearInterval(timerRef.current);
      return navigation.push({
        pathname: props.redirectPath,
        search: urlParams.toString() && "?" + urlParams.toString(),
      });
    }
  }

  // Refetch timer
  useEffect(() => {
    if (!timerRef.current) {
      checkVerification();
      timerRef.current = setInterval(checkVerification, 10000);
    }
    return () => clearInterval(timerRef.current);
  }, []);

  // Countdown timer
  useEffect(() => {
    const countdownTimer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown === 0) clearInterval(countdownTimer);
    return () => clearInterval(countdownTimer);
  }, [countdown]);

  return {
    states: {
      loading,
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        error,
      success,
      loadingVerification,
      isVerified: !!user?.managedIdentitySession?.emailVerified,
      countdown,
    },
    callbacks: {
      submit,
    },
    content: {
      email,
      verifyMessage: props.verifyMessage,
      emailVerificationHeader: props.emailVerificationHeader,
      resendEmailButtonText: props.resendEmailButtonText,
      verificationLoadingMessage: props.verificationLoadingMessage,
      verificationStatusMessage: props.verificationStatusMessage,
    },
  };
}
