import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { useRequestPasswordResetEmailMutation } from "@saasquatch/component-boilerplate";

export function usePortalForgotPassword({ nextPageUrlParameter }) {
  const [success, setSuccess] = useState(false);
  const [request, { loading, data, errors }] =
    useRequestPasswordResetEmailMutation();

  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get(nextPageUrlParameter);

  const submit = async (event: any) => {
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
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
