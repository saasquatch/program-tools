import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_CONTEXT_NAMESPACE,
} from "../sqm-tax-and-cash/useTaxAndCash";
import { TaxForm } from "./sqm-user-info-form";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export type FormState = {
  loading?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  currency?: string;
  participantType?: string;
  allowBankingCollection?: boolean;
  errors?: any;
  error?: string;
};

export type ValidationErrors = {
  [key: string]: string;
};

export type InitialData = {
  [key: string]: string;
};

export function useTaxForm(props: TaxForm) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>({});

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  // TODO: user types
  const data = useParentValue<any>(USER_CONTEXT_NAMESPACE);

  useEffect(() => {
    console.log({ data });
    const user = data?.viewer;
    if (!user) return;

    setFormState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      countryCode: user.countryCode,
      currency: user.customFields?.currency,
    });
  }, [data]);

  function onRadioClick(value: string) {
    setFormState({ ...formState, participantType: value });
  }

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let errors: Record<string, string> = {};

    console.log({ formControls });
    formControls?.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      console.log({ control });

      if (control.name === "/participantType") {
        control.checked && jsonpointer.set(formData, key, value);
      } else {
        jsonpointer.set(formData, key, value);
      }
      console.log({ formData });
      // required validation
      if (control.required && !value) {
        jsonpointer.set(errors, key, props.requiredFieldErrorMessage);
      }
      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError) jsonpointer.set(errors, key, validationError);
      }
    });

    if (Object.keys(errors).length) {
      setFormState({ ...formState, loading: false, error: "", errors });
      // early return for validation errors
      return;
    }

    setFormState({
      ...formState,
      loading: true,
      error: "",
    });

    formData = { ...formData };

    console.log({ formData });

    // try {
    //   const result = await request(variables);
    //   if (result instanceof Error) {
    //     throw result;
    //   }
    //   setFormState({
    //     loading: false,
    //     error: "",
    //     validationErrors: {},
    //   });
    // } catch (error) {
    //   setFormState({
    //     loading: false,
    //     error: props.networkErrorMessage,
    //     validationErrors: {},
    //   });
    // }

    setStep("/2");
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    onRadioClick,
    text: {
      ...props,
    },
    refs: {
      formRef,
    },
    formState: { ...formState },
  };
}
