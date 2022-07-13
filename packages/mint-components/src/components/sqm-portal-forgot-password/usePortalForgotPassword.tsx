import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRequestPasswordResetEmailMutation,
} from "@saasquatch/component-boilerplate";
import { PortalForgotPassword } from "./sqm-portal-forgot-password";

export function usePortalForgotPassword(props: PortalForgotPassword) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [request, { loading, data, errors }] =
    useRequestPasswordResetEmailMutation();

  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPage = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    setSuccess(false);
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email: formData.email, urlParams, redirectPath };

    const result = await request(variables);
    if (result instanceof Error) {
      if (result.message) setError("Network request failed.");
      return;
    }
    if (result.requestManagedIdentityPasswordResetEmail?.success) {
      setSuccess(true);
    }
  };

  return {
    states: {
      loading,
      error:
        errors?.response?.errors?.[0]?.extensions?.message ||
        errors?.response?.errors?.[0]?.message ||
        error,
      success,
      loginPath: props.loginPath,
      headerText: props.headerText,
      loginText: props.loginText,
    },
    callbacks: {
      submit,
    },
  };
}
