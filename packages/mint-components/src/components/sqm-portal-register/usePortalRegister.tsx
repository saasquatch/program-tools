import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { useValidationState } from "./useValidationState";
import { PortalRegister } from "./sqm-portal-register";

export function usePortalRegister(props: PortalRegister) {
  const { validationState, setValidationState } = useValidationState({});
  const [request, { loading, errors, data }] =
    useRegisterWithEmailAndPasswordMutation();

  console.log({ validationState });
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
      setValidationState({
        error: "",
        validationErrors: { confirmPassword: "Passwords do not match." },
      });
      return;
    }
    setValidationState({ error: "" });
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
      setValidationState({ error: "Network request failed." });
    }
  };

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword?.token) {
      navigation.push(props.nextPage);
    }
  }, [data?.registerManagedIdentityWithEmailAndPassword?.token]);

  // useEffect(() => {
  //   if (errors?.message) {
  //     setValidationState({ error: "Network request failed." });
  //   }
  // }, [errors]);

  return {
    states: {
      loading,
      error: errors?.response?.errors?.[0]?.message || validationState?.error,
      validationState,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
    },
    callbacks: {
      submit,
    },
  };
}
