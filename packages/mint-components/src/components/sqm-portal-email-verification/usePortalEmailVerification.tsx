import {
  navigation,
  useManagedIdentitySessionQuery,
  useRequestVerificationEmailMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
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
  const timerRef = useRef<NodeJS.Timer>(undefined);
  const countdownRef = useRef<NodeJS.Timer>(undefined);

  const submit = async () => {
    if (!email) return;
    setError("");
    setSuccess(false);
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email, urlParams, redirectPath };
    const result = await request(variables);
    if (result instanceof Error) {
      if (result.message) setError(props.networkErrorMessage);
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
    resyncTimers(10);
  }

  const startTimer = (countdown: number = 10000) =>
    setInterval(checkVerification, countdown);
  const startCountdown = (countdown: number) =>
    setInterval(() => setCountdown(countdown), 1000);

  function resyncTimers(restartCountdown?: number) {
    // Clear existing timers
    clearInterval(countdownRef.current);
    clearInterval(timerRef.current);

    // Do nothing if the tab is currently hidden
    if (document.visibilityState === "hidden") return;

    // Restart the timer if verification has just been checked
    if (restartCountdown) setCountdown(restartCountdown);

    // Default back to 10 if the countdown got to zero
    let newCountdown = countdown || 10;

    // Start timers from either the beginning or based on the previous value
    countdownRef.current = startCountdown(
      restartCountdown - 1 || newCountdown - 1
    );
    timerRef.current = startTimer(
      restartCountdown * 1000 || newCountdown * 1000
    );
  }

  const resyncTimersCallback = useCallback(() => resyncTimers(), [countdown]);

  // Refetch validation status timer
  useEffect(() => {
    if (!timerRef.current) {
      checkVerification();
      timerRef.current = startTimer();
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      clearInterval(countdownRef.current);
      countdownRef.current = startCountdown(countdown - 1);
    }
    // Re-sync the timers if tab visibility has changed
    document.addEventListener("visibilitychange", resyncTimersCallback);
    return () => {
      clearInterval(countdownRef.current);
      document.removeEventListener("visibilitychange", resyncTimersCallback);
    };
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
      verificationResentMessage: props.verificationResentMessage,
      networkErrorMessage: props.networkErrorMessage,
    },
  };
}
