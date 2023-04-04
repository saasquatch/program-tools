import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUpsertPasswordlessUserMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";

export function usePasswordlessRegistration(props) {
  const [request, { loading, errors, data }] =
    useUpsertPasswordlessUserMutation();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(navigation.location.search);
  const nextPageOverride = urlParams.get("nextPage");

  const submit = async (event: any) => {
    setError("");
    let formData = event.detail.formData;

    formData?.forEach((value: any, key: string) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    const result = await request(variables);
    if (result instanceof Error) {
      if (result?.message || result?.["response"]?.["error"])
        setError("Network request failed.");
      return;
    }
    if (result.authenticateManagedIdentityWithPasswordless?.token) {
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
    },
    callbacks: {
      submit,
    },
  };
}
