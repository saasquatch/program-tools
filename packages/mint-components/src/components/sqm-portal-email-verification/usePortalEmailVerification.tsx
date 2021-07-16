import gql from "graphql-tag";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../sqm-portal/usePortalQuery";
import { useUserIdentity } from "@saasquatch/component-boilerplate";

const PortalEmailVerificationMutation = gql`
  mutation PortalEmailVerification($email: String!, $urlParams: JSONObject) {
    requestVerificationEmail(input: { email: $email, urlParams: $urlParams }) {
      success
    }
  }
`;

export function usePortalEmailVerification({ nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
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
    if (data?.requestVerificationEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestVerificationEmail?.success]);

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
