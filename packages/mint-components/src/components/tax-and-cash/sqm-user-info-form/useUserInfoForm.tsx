import { useUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  COUNTRIES_QUERY_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CountriesQuery,
  Currencies,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { objectIsFull } from "../utils";
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

export function useUserInfoForm(props: TaxForm) {
  const user = useUserIdentity();

  const currencyRef = useRef<HTMLSelectElement>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [userFormContext, setUserFormContext] = useParent<UserFormContext>(
    USER_FORM_CONTEXT_NAMESPACE
  );

  const {
    data,
    loading,
    errors: userError,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: countriesRes, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_QUERY_NAMESPACE);

  const currencies = useParentValue<Currencies>(CURRENCIES_NAMESPACE);

  const countries = countriesRes?.impactPayoutCountries?.data;

  const [countrySearch, setCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries || []);

  const [currencySearch, setCurrencySearch] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] = useState(
    currencies || []
  );
  const [formErrors, setErrors] = useState({});

  useEffect(() => {
    const user = data?.user;
    if (!user || step !== "/1") return;

    // If form already filled out, skip initialising it
    if (objectIsFull(userFormContext)) return;

    if (user.impactConnection?.publisher && user.impactConnection?.user) {
      // Initialise with partner information
      setUserFormContext({
        email: user.email,
        firstName: user.impactConnection.user.firstName,
        lastName: user.impactConnection.user.lastName,
        countryCode: user.impactConnection.publisher.countryCode,
        currency: user.impactConnection.publisher.currency,
      });
    } else if (!userFormContext?.email) {
      // Initialise with user information
      setUserFormContext({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        countryCode: user.countryCode || "US",
        currency: user.customFields?.currency,
      });
    }
  }, [data, step, userFormContext]);

  const onFormChange = (field: string, e: CustomEvent) => {
    const value = e.detail?.item?.__value;
    if (!value) console.error("Could not detect select change");

    setUserFormContext({
      ...userFormContext,
      [field]: value,
    });
    if (field === "countryCode") currencyRef.current.value = "";
  };

  useEffect(() => {
    if (!countries?.length) return;
    if (countrySearch.trim() === "") {
      setFilteredCountries(countries || []);
    } else {
      setFilteredCountries(
        countries.filter((c) =>
          c.displayName.toLowerCase().includes(countrySearch.toLowerCase())
        ) || []
      );
    }
  }, [countrySearch, countries]);

  useEffect(() => {
    if (!currencies?.length) return;
    if (currencySearch.trim() === "") {
      setFilteredCurrencies(currencies || []);
    } else {
      setFilteredCurrencies(
        currencies.filter((c) =>
          c.currencyCode.toLowerCase().includes(currencySearch.toLowerCase())
        ) || []
      );
    }
  }, [currencySearch, currencies]);

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let errors: Record<string, string> = {};

    formControls?.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      // required validation
      if (control.required && !value) {
        jsonpointer.set(errors, key, props.fieldRequiredError);
      }

      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError) jsonpointer.set(errors, key, validationError);
      }

      jsonpointer.set(formData, key, value);
    });

    if (Object.keys(errors).length) {
      setErrors(errors);
      // early return for validation errors
      return;
    }

    const { allowBankingCollection, ...userData } = formData;

    setUserFormContext({
      ...userFormContext,
      countryCode: userData.countryCode,
      currency: userData.currency,
    });

    const nextStep = context.overrideNextStep || "/2";
    setStep(nextStep);
  }

  return {
    step: step,
    setStep: setStep,
    onSubmit,
    text: props.getTextProps(),
    callbacks: {
      setCurrencySearch,
      setCountrySearch,
      onFormChange,
    },
    refs: {
      formRef,
      currencyRef,
    },
    data: {
      currencies: filteredCurrencies,
      countries: filteredCountries,
    },
    states: {
      hideSteps: context.hideSteps,
      disabled: loading,
      loadingError: !!userError?.message,
      loading: loading,
      isPartner: !!data?.user?.impactConnection?.publisher,
      isUser: !!data?.user?.impactConnection?.user,
      formState: {
        ...userFormContext,
        errors: formErrors,
      },
    },
  };
}

export type UseUserInfoFormResult = ReturnType<typeof useUserInfoForm>;
