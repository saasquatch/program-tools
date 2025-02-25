import jsonpointer from "jsonpointer";
import { useCallback, useEffect, useRef } from "@saasquatch/universal-hooks";
import {
  navigation,
  useRegisterWithEmailAndPasswordMutation,
} from "@saasquatch/component-boilerplate";
import { PortalRegister } from "./sqm-portal-register";
import { AsYouType } from "libphonenumber-js";
import { useRegistrationFormState } from "../sqm-portal-google-registration-form/useGoogleRegistrationFormState";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export function usePortalRegister(props: PortalRegister) {
  const formRef = useRef<HTMLFormElement>(null);
  const { registrationFormState, setRegistrationFormState } =
    useRegistrationFormState({});
  const [request, { loading, errors, data }] =
    useRegisterWithEmailAndPasswordMutation();

  useEffect(() => {
    if (!formRef.current) return;
    const form = formRef.current;
    form.addEventListener("sl-input", inputFunction);
    return () => {
      form.removeEventListener("sl-input", inputFunction);
    };
  }, [formRef.current]);

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
        jsonpointer.set(validationErrors, key, props.requiredFieldErrorMessage);
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
        confirmPassword: props.passwordMismatchErrorMessage,
      };
    }

    if (Object.keys(validationErrors).length) {
      setRegistrationFormState({ loading: false, error: "", validationErrors });
      // early return for validation errors
      return;
    }

    setRegistrationFormState({
      loading: true,
      error: "",
      validationErrors: {},
    });
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
      const result = await request(variables);
      if (result instanceof Error) {
        throw result;
      }
      setRegistrationFormState({
        loading: false,
        error: "",
        validationErrors: {},
      });
      if (result.registerManagedIdentityWithEmailAndPassword?.token) {
        navigation.push(props.nextPage);
      }
    } catch (error) {
      setRegistrationFormState({
        loading: false,
        error: props.networkErrorMessage,
        validationErrors: {},
      });
    }
  };

  const inputFunction = useCallback((e) => {
    const name = e.target?.type?.toLowerCase();
    if (name !== "tel") return;
    const asYouType = new AsYouType("US");
    e.target.value = asYouType.input(e.target.value);
  }, []);

  let errorMessage = "";
  if (errors?.response?.["error"]) {
    errorMessage = props.networkErrorMessage;
  } else if (errors?.message && !errors?.response?.errors.length) {
    errorMessage = props.networkErrorMessage;
  } else {
    errorMessage =
      errors?.response?.errors?.[0]?.extensions?.message ||
      errors?.response?.errors?.[0]?.message ||
      registrationFormState?.error;
  }
  return {
    states: {
      loading,
      error: errorMessage,
      registrationFormState,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
      loginPath: props.loginPath,
      disablePasswordValidation: props.disablePasswordValidation,
      // AL: TODO isGoogle state
      isGoogle: false,
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
