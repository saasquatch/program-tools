import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent } from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CountriesQuery,
  CurrenciesQuery,
  TAX_CONTEXT_NAMESPACE,
  USER_INFO_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { TaxForm } from "./sqm-user-info-form";
import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { HasFirstNameLastName } from "../../views/EmailRegistration.stories";

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

  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [formState, setFormState] = useParent<FormState>(USER_INFO_NAMESPACE);
  const [mutationLoading, setMutationLoading] = useState(false);

  const [upsertUser] = useMutation(UPSERT_USER);
  const { data, loading, refetch } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const { data: _countries, loading: countriesLoading } =
    useParentQueryValue<CountriesQuery>(COUNTRIES_NAMESPACE);
  const { data: currenciesRes, loading: loadingCurrencies } =
    useParentQueryValue<CurrenciesQuery>(CURRENCIES_NAMESPACE);

  useEffect(() => {
    const user = data?.user;
    if (!user || step !== "/1") return;
  }, [data, step]);

  function onRadioClick(value: string) {
    setFormState({ ...formState, participantType: value });
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
      setFormState({ ...formState, error: "", errors });
      // early return for validation errors
      return;
    }

    const { allowBankingCollection, ...userData } = formData;

    try {
      setMutationLoading(true);

      await upsertUser({
        userInput: {
          id: user.id,
          accountId: user.accountId,
          countryCode: userData.countryCode,
          customFields: {
            currency: userData.currency,
            participantType: userData.participantType,
          },
        },
      });
      await refetch();

      setStep("/2");
    } catch (e) {
      // TODO: Double check
      setFormState({ ...formState, errors: { general: true } });
    } finally {
      setMutationLoading(false);
    }
  }

  console.log({ _countries });

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
    data: {
      currencies: currenciesRes?.currencies?.data,
      countries: _countries?.countries?.data,
    },
    states: {
      disabled: loading,
      loading: loading || mutationLoading,
      formState: { ...formState },
    },
  };
}
