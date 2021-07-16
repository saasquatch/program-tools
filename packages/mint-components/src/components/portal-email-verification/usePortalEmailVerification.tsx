import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";
import { useUserIdentity } from "@saasquatch/component-boilerplate";

const PortalEmailVerificationMutation = gql`
  mutation PortalEmailVerification($email: String!, $urlParams: RSJsonNode) {
    requestManagedIdentityVerificationEmail(
      requestManagedIdentityVerificationEmailInput: {
        email: $email
        urlParams: $urlParams
      }
    ) {
      success
    }
  }
`;

interface PortalEmailVerificationMutationResult {
  requestManagedIdentityVerificationEmail: {
    success: boolean;
  };
}

export function usePortalEmailVerification({ nextPageUrlParameter }) {
  const [{ loading, data, error }, request] =
    usePortalQuery<PortalEmailVerificationMutationResult>(
      PortalEmailVerificationMutation,
      { loading: false }
    );

  const userIdent = useUserIdentity();
  const email = userIdent?.sessionData?.email;
  const [success, setSuccess] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get(nextPageUrlParameter);

  const submit = async () => {
    if (!email) return;

    const urlParams = nextPage ? { [nextPageUrlParameter]: nextPage } : null;
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
      error,
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
