import gql from "graphql-tag";
import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { useMutation } from "@saasquatch/component-boilerplate";

const PortalForgotPasswordMutation = gql`
  mutation PortalForgotPassword($email: String!, $urlParams: RSJsonNode) {
    requestManagedIdentityPasswordResetEmail(
      requestManagedIdentityPasswordResetEmailInput: {
        email: $email
        urlParams: $urlParams
      }
    ) {
      success
    }
  }
`;

interface PortalForgotPasswordMutationResult {
  requestManagedIdentityPasswordResetEmail: {
    success: boolean;
  };
}

export function usePortalForgotPassword({ nextPageUrlParameter }) {
  const [request, { loading, data, errors }] =
    useMutation<PortalForgotPasswordMutationResult>(
      PortalForgotPasswordMutation
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
    if (data?.requestManagedIdentityPasswordResetEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestManagedIdentityPasswordResetEmail?.success]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message,
      success,
    },
    callbacks: {
      submit,
    },
  };
}
