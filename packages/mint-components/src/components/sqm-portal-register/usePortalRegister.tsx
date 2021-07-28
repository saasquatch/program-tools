import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";

export function usePortalRegister({ nextPage, confirmPassword }) {
  const [error, setError] = useState("");
  const [request, { loading, errors, data }] =
    useRegisterWithEmailAndPasswordMutation();

  const submit = async (event: any) => {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    formControls?.forEach((control) => {
      if (!control.name) return;
      const key = control.name;
      const value = control.value;
      jsonpointer.set(formData, key, value);
    });
    if (
      (confirmPassword || formData.confirmPassword) &&
      formData.password !== formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const { email, password } = formData;
    delete formData.email;
    delete formData.password;
    delete formData.confirmPassword;
    formData = { ...formData };
    const variables = {
      email,
      password,
      formData,
    };
    await request(variables);
  };

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword?.token) {
      navigation.push(nextPage);
    }
  }, [data?.registerManagedIdentityWithEmailAndPassword?.token]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message || error,
    },
    callbacks: {
      submit,
    },
  };
}
