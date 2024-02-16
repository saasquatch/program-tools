import { useUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import jsonpointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CountriesQuery,
  CurrenciesQuery,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { TaxForm } from "./sqm-user-info-form";

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

const UPSERT_USER = gql`
  mutation ($userInput: UserInput!) {
    upsertUser(userInput: $userInput) {
      firstName
      lastName
    }
  }
`;

export function useUserInfoForm(props: TaxForm) {
  const user = useUserIdentity();

  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setErrors] = useState({});

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const [userFormContext, setUserFormContext] = useParent<UserFormContext>(
    USER_FORM_CONTEXT_NAMESPACE
  );

  const { data, loading } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: _countries, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_NAMESPACE);
  const { data: currenciesRes, loading: loadingCurrencies } =
    useParentQueryValue<CurrenciesQuery>(CURRENCIES_NAMESPACE);

  useEffect(() => {
    const user = data?.user;
    if (!user || step !== "/1") return;

    if (user.impactPartner) {
      // Initialise with partner information
      setUserFormContext({
        firstName: user.impactPartner.firstName,
        lastName: user.impactPartner.lastName,
        email: user.impactPartner.email,
        countryCode: user.impactPartner.country,
        currency: user.impactPartner.currency,
        participantType: undefined, // TODO: Fill in when able
      });
    } else {
      // Initialise with user information
      setUserFormContext({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        countryCode: user.countryCode,
        currency: user.customFields?.currency,
        participantType: undefined,
      });
    }
  }, [data, step]);

  function onRadioClick(value: string) {
    setUserFormContext({ ...userFormContext, participantType: value });
  }

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let errors: Record<string, string> = {};

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
      setErrors(errors);
      // early return for validation errors
      return;
    }

    const { allowBankingCollection, ...userData } = formData;

    try {
      setUserFormContext({
        ...userFormContext,
        countryCode: userData.countryCode,
        currency: userData.currency,
        participantType: userData.participantType,
      });

      const nextStep = context.overrideNextStep || "/2";
      setStep(nextStep);
    } catch (e) {
      setErrors({ general: true });
    }
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    onRadioClick,
    text: props.getTextProps(),
    refs: {
      formRef,
    },
    data: {
      currencies: currenciesRes?.currencies?.data,
      countries: _countries?.impactPartnerCountries?.data,
    },
    states: {
      hideSteps: context.hideSteps,
      disabled: false,
      loading: loading,
      isPartner: !!data?.user?.impactPartner,
      formState: {
        ...userFormContext,
        errors: formErrors,
      },
    },
  };
}

export type UseUserInfoFormResult = ReturnType<typeof useUserInfoForm>;
