import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  useUserIdentity,
  useRequestVerificationEmailMutation,
} from "@saasquatch/component-boilerplate";
import { PortalEmailVerification } from "./sqm-portal-email-verification";

export function usePortalEmailVerification(props: PortalEmailVerification) {
  const [request, { loading, data, errors }] =
    useRequestVerificationEmailMutation();

  const userIdent = useUserIdentity();
  const email = userIdent?.managedIdentity?.email;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get("nextPage");

  const submit = async () => {
    if (!email) return;
    setError("");
    const urlParams = nextPage ? { nextPage } : null;
    const variables = { email, urlParams };

    await request(variables);
  };

  useEffect(() => {
    if (data?.requestManagedIdentityVerificationEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestManagedIdentityVerificationEmail?.success]);

  useEffect(() => {
    if (errors?.message) {
      setError("Network request failed.");
    }
  }, [errors]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message || error,
      success,
    },
    callbacks: {
      submit,
    },
    content: {
      email,
      verifyMessage: props.verifyMessage,
    },
  };
}
