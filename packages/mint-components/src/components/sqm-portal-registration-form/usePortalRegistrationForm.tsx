import jsonpointer from "jsonpointer";
import decode from "jwt-decode";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import {
  navigation,
  useLocale,
  useQuery,
  useRegisterViaRegistrationFormMutation,
} from "@saasquatch/component-boilerplate";
import { PortalRegistrationForm } from "./sqm-portal-registration-form";
import { AsYouType } from "libphonenumber-js";
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

  const locale = useLocale();

  const [googleCredentials, setGoogleCredentials] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const { registrationFormState, setRegistrationFormState } =
    useRegistrationFormState({});
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
      props.formDisabledErrorMessage;
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
      loading: true,
      error: "",
      validationErrors: {},
    });
    const { email, password } = formData;
    delete formData.email;
    delete formData.password;
    delete formData.confirmPassword;
    const redirectPath = props.redirectPath;
    const variables = {
      key: props.formKey,
      formData: {
        locale,
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
      setRegistrationFormState({
        ...registrationFormState,
        loading: false,
        error: "",
        validationErrors: {},
      });
      const managedIdentityResponse = result.submitForm?.results.find(
        (result) => result?.formHandler?.namespace === "identity"
      );
      if (
        managedIdentityResponse &&
        managedIdentityResponse.result.results.length &&
        managedIdentityResponse.result.results[0].success &&
        managedIdentityResponse.result.results[0].data.token
      ) {
        navigation.push(props.nextPage);
      } else if (
        // check for blocked email error response
        result.submitForm?.results.length === 1 &&
        result.submitForm?.results[0]?.result?.results?.length === 1 &&
        result.submitForm?.results[0]?.result?.results?.[0]?.success ===
          false &&
        result.submitForm?.results[0]?.result?.results?.[0]?.message?.startsWith(
          "Blocked email"
        )
      ) {
        setRegistrationFormState({
          ...registrationFormState,
          loading: false,
          error: "",
          validationErrors: {
            email: props.invalidEmailErrorMessage,
          },
        });
      }
    } catch (error) {
      // check for invalid email
      if (error?.message?.includes("is not a valid email address")) {
        setRegistrationFormState({
          ...registrationFormState,
          loading: false,
          error: "",
          validationErrors: { email: props.invalidEmailErrorMessage },
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
      props.formDisabledErrorMessage;
  } else if (errors?.response?.["error"]) {
    errorMessage = props.networkErrorMessage;
  } else if (errors?.message && !errors?.response?.errors.length) {
    errorMessage = props.networkErrorMessage;
  } else {
    errorMessage =
      formError ||
      queryResponse?.errors?.response?.errors?.[0]?.message ||
      registrationFormState?.error;
  }

  const handleGoogleInit = (credential: string) => {
    try {
      const res = decode(credential) as any;
      // TODO: Double check
      setGoogleCredentials({
        firstName: res.payload.given_name,
        lastName: res.payload.family_name,
        email: res.payload.email,
      });
      setShowRegistrationForm(true);
    } catch (e) {
      console.error("Failed to decode Google Sign In credential JWT:", e);
    }
  };

  return {
    states: {
      showRegistrationForm,
      loading: loading || queryResponse.loading,
      error: errorMessage,
      registrationFormState,
      confirmPassword: props.confirmPassword,
      hideInputs: props.hideInputs,
      loginPath: props.loginPath,
      enablePasswordValidation: !props.disablePasswordValidation,
      // AL: TODO google form state
      isGoogle: !!googleCredentials,
    },
    callbacks: {
      submit,
      inputFunction,
      handleGoogleInit,
      setShowRegistrationForm,
    },
    refs: {
      formRef,
    },
  };
}
