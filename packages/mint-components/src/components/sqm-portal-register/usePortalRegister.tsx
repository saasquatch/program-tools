import jsonpointer from "jsonpointer";
import { useCallback, useEffect, useRef } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { useValidationState } from "./useValidationState";
import { PortalRegister } from "./sqm-portal-register";
import { AsYouType } from "libphonenumber-js";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export function usePortalRegister(props: PortalRegister) {
  const formRef = useRef<HTMLFormElement>(null);
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

    console.log({ formData });
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
    const redirectPath = props.redirectPath;
    const variables = {
      email,
      password,
      formData,
      redirectPath,
    };
    try {
      await request(variables);
    } catch (error) {
      setValidationState({ error: "Network request failed." });
    }
  };

  const inputFunction = useCallback((e) => {
    const name = e.target?.type?.toLowerCase();
    if (name !== "tel") return;
    const asYouType = new AsYouType("US");
    e.target.value = asYouType.input(e.target.value);
  }, []);

  useEffect(() => {
    if (data?.registerManagedIdentityWithEmailAndPassword?.token) {
      navigation.push(props.nextPage);
    }
  }, [data?.registerManagedIdentityWithEmailAndPassword?.token]);

  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;
    form.addEventListener("sl-input", inputFunction);
    return () => {
      form.removeEventListener("sl-input", inputFunction);
    };
  }, [formRef.current]);

  let errorMessage = "";
  if (errors?.response?.["error"]) {
    errorMessage = "Network request failed";
  } else if (errors?.message && !errors?.response?.errors.length) {
    errorMessage = "Network request failed";
  } else {
    errorMessage =
      errors?.response?.errors?.[0]?.message || validationState?.error;
  }
  return {
    states: {
      loading,
      error: errorMessage,
      validationState,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
      loginPath: props.loginPath,
    },
    callbacks: {
      submit,
      inputFunction,
    },
    refs: {
      formRef,
    },
  };
}
