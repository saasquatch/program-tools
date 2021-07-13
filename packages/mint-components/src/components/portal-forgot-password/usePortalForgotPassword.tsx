import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { usePortalQuery } from "../portal/usePortalQuery";

const PortalForgotPasswordMutation = gql`
  mutation PortalForgotPassword($email: String!, $urlParams: JSONObject) {
    requestPasswordResetEmail(input: { email: $email, urlParams: $urlParams }) {
      success
    }
  }
`;

export function usePortalForgotPassword({ nextPageUrlParameter }) {
  const [{ loading, data, error }, request] = usePortalQuery(
    PortalForgotPasswordMutation,
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
    const urlParams = nextPage ? { [nextPageUrlParameter]: nextPage } : null;
    const variables = { email: formData.email, urlParams };

    await request(variables);
  };

  useEffect(() => {
    if (data?.requestPasswordResetEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestPasswordResetEmail?.success]);

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
