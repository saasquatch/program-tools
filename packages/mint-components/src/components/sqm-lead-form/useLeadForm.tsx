import { navigation, useMutation } from "@saasquatch/component-boilerplate";
import { useCallback, useEffect, useRef } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
import { AsYouType } from "libphonenumber-js";
import { LeadForm } from "./sqm-lead-form";
import { useLeadFormState } from "./useLeadFormState";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

const SUBMIT_LEAD = gql`
  mutation submitForm($formSubmissionInput: FormSubmissionInput!) {
    submitForm(formSubmissionInput: $formSubmissionInput) {
      success
    }
  }
`;

export function useLeadForm(props: LeadForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const { leadFormState, setLeadFormState } = useLeadFormState({});

  const [submitLead, { loading, errors, data }] = useMutation(SUBMIT_LEAD);

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

    if (Object.keys(validationErrors).length) {
      setLeadFormState({ loading: false, error: "", validationErrors });
      // early return for validation errors
      return;
    }

    setLeadFormState({
      loading: true,
      error: "",
      validationErrors: {},
    });

    formData = { ...formData };
    const redirectPath = props.nextPage;
    const variables = {
      key: props.formKey,
      formData,
    };
    try {
      const result = await submitLead({ formSubmissionInput: variables });
      if (result instanceof Error) {
        throw result;
      }
      setLeadFormState({
        loading: false,
        error: "",
        validationErrors: {},
      });
      if (result.success) {
        navigation.push(props.nextPage);
      }
    } catch (error) {
      setLeadFormState({
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
      leadFormState?.error;
  }
  return {
    states: {
      loading,
      error: errorMessage,
      // AL: Handle sucess boolean
      success: false,
      leadFormState,
      referralCode: "ABC123", // Example referral code, replace with actual logic if needed
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
