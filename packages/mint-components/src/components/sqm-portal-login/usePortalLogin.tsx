import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useAuthenticateWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";
import { PortalLogin } from "./sqm-portal-login";

export function usePortalLogin(props: PortalLogin) {
  const [request, { loading, errors, data }] =
    useAuthenticateWithEmailAndPasswordMutation();
  const [error, setError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState({
    mode: "manual",
  });
  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPageOverride = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    const result = await request(variables);
    if (result instanceof Error) {
      if (result?.message || result?.["response"]?.["error"])
        setError(props.networkErrorMessage);
      return;
    }
    if (result.authenticateManagedIdentityWithEmailAndPassword?.token) {
      urlParams.delete("nextPage");
      const url = sanitizeUrlPath(nextPageOverride || props.nextPage);
      navigation.push(url.href);
    }
  };

  const errorMessage =
    errors?.response?.errors?.[0]?.extensions?.message ||
    errors?.response?.errors?.[0]?.message ||
    error;

  return {
    states: {
      loading,
      error: errorMessage,
      registerPath: props.registerPath,
      forgotPasswordPath: props.forgotPasswordPath,
      showLoginForm,
    },
    callbacks: {
      submit,
    },
  };
}
