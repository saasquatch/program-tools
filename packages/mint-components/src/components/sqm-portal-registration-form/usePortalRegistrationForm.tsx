import jsonpointer from "jsonpointer";
import { useCallback, useEffect, useRef } from "@saasquatch/universal-hooks";
import {
  navigation,
  useQuery,
  useRegisterViaRegistrationFormMutation,
} from "@saasquatch/component-boilerplate";
import { PortalRegistrationForm } from "./sqm-portal-registration-form";
import { AsYouType } from "libphonenumber-js";
import { useValidationState } from "../sqm-portal-register/useValidationState";
import { gql } from "graphql-request";
import {
  RegistrationFormState,
  useRegistrationFormState,
} from "./useRegistrationFormState";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

const RegistrationFormQuery = gql`
  query RegistrationFormQuery($key: String!) {
    form(key: $key) {
      key
      type
      initialData {
        initialData
        isEnabled
        isEnabledErrorMessage
      }
    }
  }
`;

interface RegistrationFormQueryData {
  form: {
    key: string;
    type: "REGISTRATION" | "CUSTOM";
    initialData: {
      initialData: Record<string, string> | null;
      isEnabled: boolean;
      isEnabledErrorMessage: string | null;
    };
  };
}

export function usePortalRegistrationForm(props: PortalRegistrationForm) {
  const formRef = useRef<HTMLFormElement>(null);

  const { registrationFormState, setRegistrationFormState } =
    useRegistrationFormState({});
  const { validationState, setValidationState } = useValidationState({});
  const [request, { loading, errors, data, formError }] =
    useRegisterViaRegistrationFormMutation();

  const queryResponse = useQuery<RegistrationFormQueryData>(
    RegistrationFormQuery,
    { key: props.formKey }
  );
  const formLoading = loading || queryResponse.loading;
  useEffect(() => {
    const initialData = queryResponse?.data?.form.initialData.initialData;
    const disabled = queryResponse?.data?.form.initialData.isEnabled === false;
    const disabledMessage =
      queryResponse?.data?.form.initialData.isEnabledErrorMessage ||
      "The registration form is currently disabled.";
    const formState: RegistrationFormState = {
      loading: formLoading,
      disabled,
      disabledMessage,
      initialData,
    };
    setRegistrationFormState(formState);
  }, [queryResponse?.data?.form.initialData]);

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
      // control.value = initialData[key] || control.value;

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
    const redirectPath = props.redirectPath;
    const variables = {
      key: props.formKey,
      formData: {
        email,
        password,
        redirectPath,
        ...formData,
      },
    };
    try {
      const result = await request(variables);
      if (result instanceof Error) {
        throw result;
      }
      const managedIdentityResponse = result.submitForm?.results.find(
        (result) => result.formHandler.namespace === "identity"
      );
      if (
        managedIdentityResponse &&
        managedIdentityResponse.result.results.length &&
        managedIdentityResponse.result.results[0].success &&
        managedIdentityResponse.result.results[0].data.token
      ) {
        navigation.push(props.nextPage);
      }
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

  let errorMessage = "";
  if (queryResponse?.data?.form.initialData.isEnabled === false) {
    errorMessage =
      queryResponse?.data?.form.initialData.isEnabledErrorMessage ||
      "The registration form is disabled";
  } else if (errors?.response?.["error"]) {
    errorMessage = "Network request failed";
  } else if (errors?.message && !errors?.response?.errors.length) {
    errorMessage = "Network request failed";
  } else {
    errorMessage =
      formError ||
      queryResponse?.errors?.response?.errors?.[0]?.message ||
      errors?.response?.errors?.[0]?.extensions?.message ||
      errors?.response?.errors?.[0]?.message ||
      validationState?.error;
  }
  return {
    states: {
      loading: loading || queryResponse.loading,
      error: errorMessage,
      validationState,
      registrationFormState,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
      loginPath: props.loginPath,
      enablePasswordValidation: !props.disablePasswordValidation,
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
