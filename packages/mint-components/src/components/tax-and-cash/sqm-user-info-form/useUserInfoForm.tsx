import { useEffect, useRef } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  USER_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/useTaxAndCash";
import { TaxForm } from "./sqm-user-info-form";
import { userInfoText } from "./defaultTextCopy";

// returns either error message if invalid or undefined if valid
export type ValidationErrorFunction = (input: {
  control;
  key: string;
  value;
}) => string | undefined;

export type FormState = {
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

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [formState, setFormState] = useParent<FormState>(USER_INFO_NAMESPACE);

  // TODO: user types
  const data = useParentValue<UserQuery>(USER_CONTEXT_NAMESPACE);

  useEffect(() => {
    console.log({ data });
    const user = data?.viewer;
    if (!user || step !== "/1") return;

    setFormState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      countryCode: user.countryCode,
      currency: user.customFields?.currency,
      participantType: user.customFields?.participantType,
      ...formState,
    });
  }, [data, step]);

  function onRadioClick(value: string) {
    setFormState({ ...formState, participantType: value });
  }

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let errors: Record<string, string> = {};

    try {
      formControls?.forEach((control) => {
        if (!control.name) return;

        const key = control.name;
        const value = control.value;

        if (control.name === "/participantType") {
          control.checked && jsonpointer.set(formData, key, value);
        } else {
          jsonpointer.set(formData, key, value);
        }

        // required validation
        if (control.required && !value) {
          jsonpointer.set(errors, key, props.allowBankingCollectionError);
        }

        // custom validation
        if (typeof control.validationError === "function") {
          const validate = control.validationError as ValidationErrorFunction;
          const validationError = validate({ control, key, value });
          if (validationError) jsonpointer.set(errors, key, validationError);
        }
      });

      // participant type validation
      if (!formData.participantType) {
        jsonpointer.set(errors, "/participantType", props.participantTypeError);
      }

      if (Object.keys(errors).length) {
        setFormState({ ...formState, error: "", errors });
        // early return for validation errors
        return;
      }

      const { allowBankingCollection, ...cleanData } = formData;

      setFormState(cleanData);

      console.log({ cleanData });

      setStep("/2");
    } catch {}
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    onRadioClick,
    text: {
      ...props,
      error: {
        firstName: props.firstNameError,
        lastName: props.lastNameError,
        email: props.emailError,
        countryCode: props.countryError,
        currency: props.currencyError,
        allowBankingCollection: props.allowBankingCollectionError,
        participantType: props.participantTypeError,
      },
    },
    refs: {
      formRef,
    },
    formState: { ...formState },
  };
}
