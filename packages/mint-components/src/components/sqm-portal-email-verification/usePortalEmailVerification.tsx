import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  useUserIdentity,
  useRequestVerificationEmailMutation,
} from "@saasquatch/component-boilerplate";

export function usePortalEmailVerification() {
  const [request, { loading, data, errors }] =
    useRequestVerificationEmailMutation();

  const userIdent = useUserIdentity();
  const email = userIdent?.managedIdentity?.email;
  const [success, setSuccess] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get("nextPage");

  const submit = async () => {
    if (!email) return;

    const urlParams = nextPage ? { nextPage } : null;
    const variables = { email, urlParams };

    await request(variables);
  };

  useEffect(() => {
    if (data?.requestManagedIdentityVerificationEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestManagedIdentityVerificationEmail?.success]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message,
      success,
    },
    callbacks: {
      submit,
    },
    content: {
      email,
    },
  };
}
