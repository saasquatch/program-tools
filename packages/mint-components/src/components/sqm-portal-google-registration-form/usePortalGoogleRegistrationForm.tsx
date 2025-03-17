import { useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useRegistrationForm } from "../sqm-portal-registration-form/useRegistrationFormState";
import { PortalGoogleRegistrationForm } from "./sqm-portal-google-registration-form";
import jwtDecode from "jwt-decode";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export function usePortalGoogleRegistrationForm(
  props: PortalGoogleRegistrationForm
) {
  const [emailValidationError, setEmailValidationError] = useState(null);
  const [registrationFormState, setRegistrationFormState] =
    useRegistrationForm();
  const [showRegistrationForm, setShowRegistrationForm] = useState({
    mode: "base",
  });

  const handleEmailSubmit = async (event: any) => {
    const formControls = event.target.getFormControls();
    let formData = {};
    let errorMessage: string = null;

    formControls.forEach((control) => {
      if (!control.name || control.name !== "/email") return;

      jsonpointer.set(formData, control.name, control.value);
      if (control.required && !control.value)
        errorMessage = props.requiredFieldErrorMessage;
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({
          control,
          key: "email",
          value: control.value,
        });
        if (validationError) errorMessage = validationError;
      }
    });

    if (errorMessage) {
      setEmailValidationError(errorMessage);
      return;
    }

    setRegistrationFormState({
      ...registrationFormState,
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
    showRegistrationForm,
    emailValidationError,
    handleGoogleInit,
    handleEmailSubmit,
  };
}
