import { useAuthenticateManagedIdentityWithInstantAccess } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useRegistrationFormState } from "../sqm-portal-google-registration-form/useGoogleRegistrationFormState";
import { InstantAccessRegistration } from "./sqm-instant-access-registration";
import { ValidationErrorFunction } from "../sqm-portal-register/usePortalRegister";

export function useInstantAccessRegistration(props: InstantAccessRegistration) {
  const cookie = new URLSearchParams(window.location.search);

  const cookies = cookie?.get("_saasquatch");

  const { registrationFormState, setRegistrationFormState } =
    useRegistrationFormState();
  const [request, { loading, errors, data }] =
    useAuthenticateManagedIdentityWithInstantAccess();
  const [error, setError] = useState("");

  const submit = async (event: any) => {
    setError("");
    let formControls = event.target.getFormControls();
    let formData = event.detail.formData;
    let validationErrors: Record<string, string> = {};

    formControls?.map((control) => {
      if (!control.name) return;
      const key = control.name;
      const value = control.value;

      jsonpointer.set(formData, key, value);
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

    const variables = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      ...(props?.includeCookies && cookies ? { cookies } : {}),
    };

    try {
      const result = await request(variables);
      if (result instanceof Error) {
        throw result;
      }
      setRegistrationFormState({
        ...registrationFormState,
        loading: false,
        error: "",
        validationErrors: {},
      });
    } catch (error) {
      // check for invalid email
      if (error?.message?.includes("is not valid")) {
        setRegistrationFormState({
          ...registrationFormState,
          loading: false,
          error: "",
          validationErrors: { email: props.invalidEmailErrorMessage },
        });
      } else if (error?.name === "fraud_error") {
        setRegistrationFormState({
          ...registrationFormState,
          loading: false,
          error: "FRAUD",
        });
      } else {
        setRegistrationFormState({
          ...registrationFormState,
          loading: false,
          error: props.networkErrorMessage,
          validationErrors: {},
        });
      }
    }
  };

  return {
    states: {
      loading,
      error: registrationFormState?.error,
      registrationFormState,
    },
    callbacks: {
      submit,
    },
  };
}
