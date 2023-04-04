import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useUpsertPasswordlessUserMutation,
} from "@saasquatch/component-boilerplate";
import { sanitizeUrlPath } from "../../utils/utils";

export function usePasswordlessRegistration() {
  const [request, { loading, errors, data }] =
    useUpsertPasswordlessUserMutation();
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
