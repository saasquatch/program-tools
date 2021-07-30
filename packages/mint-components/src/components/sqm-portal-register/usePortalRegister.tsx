import jsonpointer from "jsonpointer";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { PortalRegister } from "./sqm-portal-register";

export function usePortalRegister(props: PortalRegister) {
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
      (props.confirmPassword || formData.confirmPassword) &&
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
    try {
      await request(variables);
    } catch (error) {
      setError("Network request failed.");
    }
  };

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword?.token) {
      navigation.push(props.nextPage);
    }
  }, [data?.registerManagedIdentityWithEmailAndPassword?.token]);

  useEffect(() => {
    if (errors?.message) {
      setError("Network request failed.");
    }
  }, [errors]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message || error,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
    },
    callbacks: {
      submit,
    },
  };
}
