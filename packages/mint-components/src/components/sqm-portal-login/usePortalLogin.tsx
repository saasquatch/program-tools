import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useAuthenticateWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";

export function usePortalLogin(props) {
  const [request, { loading, errors, data }] =
    useAuthenticateWithEmailAndPasswordMutation();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const nextPageOverride = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };

    await request(variables);
  };

  useEffect(() => {
    if (data?.authenticateManagedIdentityWithEmailAndPassword?.token) {
      urlParams.delete("nextPage");
      const url = sanitizeUrlPath(nextPageOverride || props.nextPage);
      navigation.push(url.href);
    }
  }, [data?.authenticateManagedIdentityWithEmailAndPassword?.token]);

  useEffect(() => {
    if (errors?.message || errors?.response?.["error"]) {
      setError("Network request failed.");
    }
  }, [errors]);

  const errorMessage = errors?.response?.errors?.[0]?.message || error;

  return {
    states: {
      loading,
      error: errorMessage,
      registerPath: props.registerPath,
      forgotPasswordPath: props.forgotPasswordPath,
    },
    callbacks: {
      submit,
    },
  };
}
