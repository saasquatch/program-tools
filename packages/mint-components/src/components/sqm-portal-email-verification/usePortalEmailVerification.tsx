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
  const countdownRef = useRef<any>(undefined);

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
    const data =
      (await getVerificationStatus()) as ManagedIdentitySessionResult;
    if (data?.managedIdentitySession?.emailVerified) {
      clearInterval(timerRef.current);
      return navigation.push({
        pathname: props.redirectPath,
        search: urlParams.toString() && "?" + urlParams.toString(),
      });
    }
    resyncTimers();
  }

  const startTimer = () => setInterval(checkVerification, 10000);
  const startCountdown = (countdown: number) =>
    setInterval(() => setCountdown(countdown), 1000);

  function resyncTimers() {
    clearInterval(countdownRef.current);
    clearInterval(timerRef.current);

    setCountdown(10);
    countdownRef.current = startCountdown(9);
    timerRef.current = startTimer();
  }

  // Refetch validation status timer
  useEffect(() => {
    if (!timerRef.current) {
      checkVerification();
      timerRef.current = startTimer();
    }
    // Re-sync the timers if tab visibility has changed
    document.addEventListener("visibilitychange", () => resyncTimers());
    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", () => resyncTimers());
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) countdownRef.current = startCountdown(countdown - 1);
    return () => clearInterval(countdownRef.current);
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
