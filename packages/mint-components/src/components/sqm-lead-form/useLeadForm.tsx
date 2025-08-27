import {
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
import { AsYouType } from "libphonenumber-js";
import { LeadForm } from "./sqm-lead-form";
import { useLeadFormState } from "./useLeadFormState";
import { useReferralIframe } from "../sqm-referral-iframe/useReferralIframe";

export type LeadFormState = {
  [key: string]: any;
};

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

const GET_USER_DETAILS = gql`
  query getUser($programId: ID) {
    viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;

export function useLeadForm(props: LeadForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const { leadFormState, setLeadFormState } = useLeadFormState({});

  const programId = useProgramId();
  const user = useUserIdentity();

  const { data: userDetails } = useQuery(
    GET_USER_DETAILS,
    { programId },
    !user?.jwt || !programId
  );

  const [submitLead, { loading, errors, data }] = useMutation(SUBMIT_LEAD);

  const [success, setSuccess] = useState(false);

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

      if (result?.submitForm?.success) {
        setSuccess(true);
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

  function resetForm() {
    setLeadFormState({
      loading: false,
      error: "",
      validationErrors: {},
    });
    formRef.current?.getFormControls()?.forEach((c) => {
      c.value = "";
    });
    setSuccess(false);
  }

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
      success,
      leadFormState,
      referralCode: userDetails?.viewer?.referralCode || "",
    },
    callbacks: {
      submit,
      inputFunction,
      resetForm,
    },
    refs: {
      formRef,
    },
  };
}
