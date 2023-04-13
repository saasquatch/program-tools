import { useAuthenticateManagedIdentityWithInstantAccess } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";

export function useInstantAccessRegistration(options?: {
  includeCookies?: boolean;
}) {
  const cookie = new URLSearchParams(window.location.search);

  const cookies = cookie?.get("_saasquatch");

  const [request, { loading, errors, data }] =
    useAuthenticateManagedIdentityWithInstantAccess();
  const [error, setError] = useState("");

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
      ...(options?.includeCookies && cookies ? { cookies } : {}),
    };

    const result = await request(variables);
    if (result instanceof Error) {
      if (result?.message || result?.["response"]?.["error"])
        setError("Network request failed.");
      return;
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
    },
    callbacks: {
      submit,
    },
  };
}
