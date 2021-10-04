import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useAuthenticateWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";

export function usePortalLogin({ nextPage }) {
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
      navigation.push({
        pathname: nextPageOverride || nextPage,
        search: urlParams.toString() && "?" + urlParams.toString(),
      });
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
    },
    callbacks: {
      submit,
    },
  };
}
