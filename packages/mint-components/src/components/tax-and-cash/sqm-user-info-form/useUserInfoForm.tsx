import {
  useMutation,
  useParent,
  useParentQueryValue,
  useParentValue,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "@saasquatch/universal-hooks";
import jsonpointer from "jsonpointer";
import {
  CURRENCIES_NAMESPACE,
  Currencies,
  SORTED_COUNTRIES_NAMESPACE,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxCountry,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "../data";
import { ADDRESS_REGIONS, AddressRegions } from "../subregions";
import { objectIsFull, validTaxDocument } from "../utils";
import { TaxForm } from "./sqm-user-info-form";
import { ImpactConnection } from "../../../saasquatch";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../eventKeys";
import {
  ConnectPartnerResult,
  CONNECT_PARTNER,
} from "../sqm-indirect-tax-form/useIndirectTaxForm";
import { gql } from "graphql-request";

const GET_INDIRECT_TAX_COUNTRY_CODE = gql`
  query getIndirectTaxCountryCode {
    tenantSettings {
      impactBrandCountryCode
      impactBrandIndirectTaxCountryCode
    }
  }
`;

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
  phoneCountry?: string;
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
  const currencyRef = useRef<HTMLSelectElement>(undefined);
  const phoneCountryRef = useRef<HTMLSelectElement>(undefined);
  const formRef = useRef<HTMLFormElement>(null);

  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);

  const countries = useParentValue<TaxCountry[]>(SORTED_COUNTRIES_NAMESPACE);
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const [userFormContext, setUserFormContext] = useParent<UserFormContext>(
    USER_FORM_CONTEXT_NAMESPACE
  );

  const user = useUserIdentity();

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);

  const { data: tenantData } = useQuery(GET_INDIRECT_TAX_COUNTRY_CODE, {});

  const {
    data,
    loading,
    refetch,
    errors: userError,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const _currencies = useParentValue<Currencies>(CURRENCIES_NAMESPACE);
  const currencies = useMemo(
    () =>
      [...(_currencies || [])].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      ),
    [_currencies]
  );

  const [countrySearch, setCountrySearch] = useState("");
  const [phoneCountrySearch, setPhoneCountrySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries || []);
  const [filteredPhoneCountries, setFilteredPhoneCountries] = useState(
    countries || []
  );
  const [currencySearch, setCurrencySearch] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] = useState(
    currencies || []
  );
  const [formErrors, setErrors] = useState({});

  useEffect(() => {
    // reset redirect hash
    window.location.hash = "";
  }, []);

  useEffect(() => {
    const user = data?.user;
    if (!user || step !== "/1") return;

    // If form already filled out, skip initialising it
    if (objectIsFull(userFormContext)) return;

    // Prefer MI email if it was verified before this
    const email = user.managedIdentity?.emailVerified
      ? user.managedIdentity.email
      : user.email;

    if (user.impactConnection?.publisher && user.impactConnection?.user) {
      // Initialise with partner information
      setUserFormContext({
        email,
        firstName: user.impactConnection.user.firstName,
        lastName: user.impactConnection.user.lastName,
        countryCode: user.impactConnection.publisher.countryCode,
        currency: user.impactConnection.publisher.currency,
        phoneNumberCountryCode:
          user.impactConnection.publisher.phoneNumberCountryCode,
        phoneNumber: user.impactConnection.publisher.phoneNumber,
        address: user.impactConnection.publisher.billingAddress,
        city: user.impactConnection.publisher.billingCity,
        state: user.impactConnection.publisher.billingState,
        postalCode: user.impactConnection.publisher.billingPostalCode,
      });
    } else if (!userFormContext?.email) {
      // Initialise with user information
      setUserFormContext({
        email,
        firstName: user.impactConnection.user.firstName || user.firstName,
        lastName: user.impactConnection.user.lastName || user.lastName,
        countryCode: user.countryCode || "US",
        currency: user.customFields?.currency,
        phoneNumberCountryCode:
          user.customFields?.phoneNumberCountryCode || "US",
        phoneNumber: user.customFields?.phoneNumber,
        address: user.customFields?.address,
        city: user.customFields?.city,
        state: user.customFields?.state,
        postalCode: user.customFields?.postalCode,
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
    if (field === "countryCode") {
      phoneCountryRef.current.value = value;
      currencyRef.current.value = "";
    }
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
    if (!countries?.length) return;
    if (phoneCountrySearch.trim() === "") {
      setFilteredPhoneCountries(countries || []);
    } else {
      setFilteredPhoneCountries(
        countries.filter((c) =>
          c.displayName.toLowerCase().includes(phoneCountrySearch.toLowerCase())
        ) || []
      );
    }
  }, [phoneCountrySearch, countries]);

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

  async function connectPartner(formData) {
    const vars = {
      user: {
        id: user.id,
        accountId: user.accountId,
      },
      firstName: formData.firstName,
      lastName: formData.lastName,
      countryCode: formData.countryCode,
      currency: formData.currency,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      phoneNumber: formData.phoneNumber,
      phoneNumberCountryCode: formData.phoneNumberCountryCode,
    } as Partial<ImpactConnection>;

    const result = await connectImpactPartner({
      vars,
    });

    if (!result || (result as Error)?.message) throw new Error();
    if (!(result as ConnectPartnerResult).createImpactConnection?.success) {
      // Output backend errors to console for now
      console.error(
        "Failed to create Impact connection: ",
        (result as ConnectPartnerResult).createImpactConnection.validationErrors
      );

      throw new Error();
    }

    await refetch();

    const resultPublisher = (result as ConnectPartnerResult)
      .createImpactConnection?.user?.impactConnection?.publisher;

    const hasValidCurrentDocument =
      validTaxDocument(resultPublisher?.requiredTaxDocumentType) &&
      resultPublisher?.currentTaxDocument;

    // Fire form change event
    window.dispatchEvent(new Event(TAX_FORM_UPDATED_EVENT_KEY));

    return {
      resultPublisher,
      hasValidCurrentDocument,
    };
  }

  async function onSubmit(event: any) {
    let formControls = event.target.getFormControls();

    let formData: Record<string, any> = {};
    let errors: Record<string, string> = {};

    formControls?.forEach((control) => {
      if (!control.name) return;

      const key = control.name;
      const value = control.value;

      // custom validation
      if (typeof control.validationError === "function") {
        const validate = control.validationError as ValidationErrorFunction;
        const validationError = validate({ control, key, value });
        if (validationError) jsonpointer.set(errors, key, validationError);
      }

      // required validation
      if (control.required) {
        if (!value || (typeof value === "string" && value.trim() === ""))
          jsonpointer.set(errors, key, props.fieldRequiredError);
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
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumberCountryCode: userData.phoneNumberCountryCode,
      phoneNumber: userData.phoneNumber,
      countryCode: userData.countryCode,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      currency: userData.currency,
    });

    const skipNextStep = getSkipNextStep(userData);

    if (skipNextStep) {
      try {
        const { resultPublisher, hasValidCurrentDocument } =
          await connectPartner(formData);

        if (
          resultPublisher?.requiredTaxDocumentType &&
          !hasValidCurrentDocument
        ) {
          // Go to docusign form
          setStep("/3");
        } else {
          if (resultPublisher?.brandedSignup) {
            // Go to banking information form
            setStep("/4");
          } else {
            // Go right to the dashboard
            setStep("/dashboard");
          }
        }
        return;
      } catch (e) {
        setErrors({ general: true });
        return;
      }
    }

    const nextStep = context.overrideNextStep || skipNextStep ? "/3" : "/2";
    setStep(nextStep);
  }

  const indirectTaxCountry =
    tenantData?.tenantSettings?.impactBrandIndirectTaxCountryCode;
  const hasIndirectTax = !!indirectTaxCountry;

  function getSkipNextStep(userData) {
    if (!hasIndirectTax) return true;
    if (userData.countryCode === "US") return true;
    if (hasIndirectTax && userData.countryCode !== indirectTaxCountry)
      return true;
    return false;
  }

  const hasStates = ["ES", "AU", "US", "CA"].includes(
    userFormContext.countryCode
  );
  const regionObj = hasStates
    ? ADDRESS_REGIONS[userFormContext?.countryCode]
    : ({} as AddressRegions[string]);

  return {
    setStep: setStep,
    onSubmit,
    text: props.getTextProps(),
    callbacks: {
      setCurrencySearch,
      setCountrySearch,
      setPhoneCountrySearch,
      onFormChange,
    },
    refs: {
      formRef,
      currencyRef,
      phoneCountryRef,
    },
    data: {
      currencies: filteredCurrencies,
      countries: filteredCountries,
      phoneCountries: filteredPhoneCountries,
      allCurrencies: currencies,
      allCountries: countries,
      regionLabelEnum: regionObj?.labelEnum,
      regions: regionObj?.regions || [],
      partnerData: data?.user?.impactConnection?.publisher,
      userData: data?.user?.impactConnection?.user,
    },
    states: {
      step: step?.replace("/", ""),
      hideState: !hasStates,
      hideSteps: !!context.hideSteps,
      disabled: loading || connectLoading,
      loadingError: !!userError?.message,
      loading: loading || connectLoading,
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
