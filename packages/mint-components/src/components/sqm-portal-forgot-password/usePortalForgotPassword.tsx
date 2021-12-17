import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { useRequestPasswordResetEmailMutation } from "@saasquatch/component-boilerplate";
import { PortalForgotPassword } from "./sqm-portal-forgot-password";

export function usePortalForgotPassword(props: PortalForgotPassword) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [request, { loading, data, errors }] =
    useRequestPasswordResetEmailMutation();

  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email: formData.email, urlParams, redirectPath };

    await request(variables);
  };

  useEffect(() => {
    if (data?.requestManagedIdentityPasswordResetEmail?.success) {
      setSuccess(true);
    }
  }, [data?.requestManagedIdentityPasswordResetEmail?.success]);

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
      loginPath: props.loginPath,
    },
    callbacks: {
      submit,
    },
  };
}
