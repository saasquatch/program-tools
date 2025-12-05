import { useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { jwtDecode } from "jwt-decode";
import { useRegistrationForm } from "../sqm-portal-registration-form/useRegistrationFormState";
import { PortalGoogleRegistrationForm } from "./sqm-portal-google-registration-form";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export function usePortalGoogleRegistrationForm(
  props: PortalGoogleRegistrationForm
) {
  const [registrationFormState, setRegistrationFormState] =
    useRegistrationForm();
  const [showRegistrationForm, setShowRegistrationForm] = useState({
    mode: "base",
  });

  const handleEmailSubmit = async (event: any) => {
    const formControls = event.target.getFormControls();
    let formData = {};
    let validationErrors: Record<string, string> = {};

    formControls.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      jsonpointer.set(formData, key, value);

      if (control.required && !value) {
        jsonpointer.set(validationErrors, key, props.requiredFieldErrorMessage);
      }
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({
          control,
          key,
          value,
        });

        if (validationError)
          jsonpointer.set(validationErrors, key, validationError);
      }
    });

    if (Object.keys(validationErrors).length) {
      // early return for validation errors
      setRegistrationFormState({
        ...registrationFormState,
        loading: false,
        error: "",
        validationErrors,
      });
      return;
    }

    setRegistrationFormState({
      ...registrationFormState,
      validationErrors: {},
      initialData: {
        ...registrationFormState?.initialData,
        ...formData,
      },
    });
    setShowRegistrationForm({ mode: "manual" });
  };

  const handleGoogleInit = (event: CustomEvent<any>) => {
    if (!event.detail?.credential) return;

    try {
      const res = jwtDecode(event.detail.credential) as any;
      setRegistrationFormState({
        ...registrationFormState,
        _googleOAuthIdToken: event.detail.credential,
        initialData: {
          email: res.email,
          firstName: res.given_name,
          lastName: res.family_name,
        },
      });
      setShowRegistrationForm({ mode: "google" });
    } catch (e) {
      console.error("Failed to decode Google Sign In credential JWT:", e);
    }
  };

  return {
    registrationFormState,
    showRegistrationForm,
    validationErrors: registrationFormState.validationErrors,
    handleGoogleInit,
    handleEmailSubmit,
  };
}
