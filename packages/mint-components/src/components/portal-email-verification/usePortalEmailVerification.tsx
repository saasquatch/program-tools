import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalEmailVerificationMutation = gql`
  mutation PortalEmailVerification($email: String!, $nextPage: String) {
    requestVerificationEmail(input: { email: $email, nextPage: $nextPage }) {
      success
    }
  }
`;

export function usePortalEmailVerification({ nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalEmailVerificationMutation,
    { loading: false }
  );

  const [success, setSuccess] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get(nextPageUrlParameter);

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, nextPage };

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
  };
}
