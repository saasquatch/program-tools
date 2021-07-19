import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";

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
  const [request, { loading, data, errors }] =
    useMutation<PortalEmailVerificationMutationResult>(
      PortalEmailVerificationMutation
    );

  const userIdent = useUserIdentity();
  const email = userIdent?.managedIdentity?.email;
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
