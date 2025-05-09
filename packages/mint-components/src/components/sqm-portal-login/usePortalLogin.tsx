import { useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import {
  navigation,
  useAuthenticateWithGoogle,
  useAuthenticateWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";
import { PortalLogin } from "./sqm-portal-login";
import { PortalGoogleLogin } from "../sqm-portal-google-login/sqm-portal-google-login";

export function usePortalLogin(props: PortalLogin | PortalGoogleLogin) {
  const [request, { loading, errors, data }] =
    useAuthenticateWithEmailAndPasswordMutation();

  const [loginWithGoogle, { loading: gLoading, errors: gErrors }] =
    useAuthenticateWithGoogle();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPageOverride = urlParams.get("nextPage");

  const googleSubmit = async (e: CustomEvent<any>) => {
    if (!e.detail?.credential) return;

    const result = await loginWithGoogle({ idToken: e.detail.credential });
    if (result instanceof Error) {
      if (result?.message || result?.["response"]?.["error"])
        if (
          result?.["response"]?.["errors"].some(
            (error) =>
              error?.["extensions"]?.["message"] === "Invalid Credentials."
          )
        ) {
          setError((props as PortalGoogleLogin).googleUserNotRegisteredError);
        } else {
          setError(props.networkErrorMessage);
        }
      return;
    }
    if (result.authenticateManagedIdentityWithGoogle?.token) {
      urlParams.delete("nextPage");
      const url = sanitizeUrlPath(nextPageOverride || props.nextPage);
      navigation.push(url.href);
    }
  };

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

  const googleErrorMessage =
    gErrors?.response?.errors?.[0]?.extensions?.message ||
    gErrors?.response?.errors?.[0]?.message ||
    error;

  return {
    states: {
      loading: loading || gLoading,
      error: errorMessage || googleErrorMessage,
      registerPath: props.registerPath,
      forgotPasswordPath: props.forgotPasswordPath,
    },
    callbacks: {
      googleSubmit,
      submit,
    },
  };
}
