import jsonpointer from "jsonpointer";
import { useEffect } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { useValidationState } from "./useValidationState";
import { PortalRegister } from "./sqm-portal-register";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export function usePortalRegister(props: PortalRegister) {
  const { validationState, setValidationState } = useValidationState({});
  const [request, { loading, errors, data }] =
    useRegisterWithEmailAndPasswordMutation();

  const submit = async (event: any) => {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let validationErrors: Record<string, string> = {};
    formControls?.forEach((control) => {
      if (!control.name) return;
      const key = control.name;
      const value = control.value;
      jsonpointer.set(formData, key, value);
      // required validation
      if (control.required && !value) {
        jsonpointer.set(validationErrors, key, "Cannot be empty");
      }
      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError)
          jsonpointer.set(validationErrors, key, validationError);
      }
    });
    if (
      (props.confirmPassword || formData.confirmPassword) &&
      formData.password !== formData.confirmPassword
    ) {
      validationErrors = {
        ...validationErrors,
        confirmPassword: "Passwords do not match.",
      };
    }
    setValidationState({ error: "", validationErrors });
    if (Object.keys(validationErrors).length) {
      // early return for validation errors
      return;
    }
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
