import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  useUserIdentity,
  useRequestVerificationEmailMutation,
  navigation,
} from "@saasquatch/component-boilerplate";
import { PortalEmailVerification } from "./sqm-portal-email-verification";

export function usePortalEmailVerification(props: PortalEmailVerification) {
  const [request, { loading, data, errors }] =
    useRequestVerificationEmailMutation();

  const userIdent = useUserIdentity();
  const email = userIdent?.managedIdentity?.email;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPage = urlParams.get("nextPage");

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

  return {
    states: {
      loading,
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        error,
      success,
    },
    callbacks: {
      submit,
    },
    content: {
      email,
      verifyMessage: props.verifyMessage,
      emailVerificationHeader: props.emailVerificationHeader,
      resendEmailButtonText: props.resendEmailButtonText,
    },
  };
}
