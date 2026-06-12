import {
  getContextValueName,
  useHost,
  useLocale,
  useMutation,
  useParentQuery,
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useMemo } from "@saasquatch/universal-hooks";
import { getCountryObj, isValidI18nPhoneNumber } from "../utils";
import {
  COUNTRIES_NAMESPACE,
  COUNTRIES_QUERY_NAMESPACE,
  CountriesQuery,
  Currencies,
  CURRENCIES_NAMESPACE,
  CURRENCIES_QUERY_NAMESPACE,
  CurrenciesQuery,
  FINANCE_NETWORK_SETTINGS_NAMESPACE,
  FinanceNetworkSettingsQuery,
  GET_COUNTRIES,
  GET_CURRENCIES,
  GET_FINANCE_NETWORK_SETTINGS,
  GET_USER,
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
import { ImpactConnection } from "../../../saasquatch";
import {
  COMPLETE_PARTNER,
  CompletePartnerResult,
} from "../sqm-indirect-tax-form/useIndirectTaxForm";

function getCurrentStep(user: UserQuery["user"]) {
  if (!user.impactConnection?.connected || !user.impactConnection?.publisher) {
    return "/1";
  }

  const {
    requiredTaxDocumentType,
    currentTaxDocument,
    withdrawalSettings,
    brandedSignup,
    payoutsAccount,
    billingAddress,
    billingCity,
    billingCountryCode,
    billingPostalCode,
    phoneNumber,
    phoneNumberCountryCode,
  } = user.impactConnection.publisher;

  const isCompleted = user.impactConnection.connectionStatus === "COMPLETED";

  if (!isCompleted) {
    const hasBillingInfo =
      billingAddress &&
      billingCity &&
      billingCountryCode &&
      billingPostalCode &&
      phoneNumberCountryCode &&
      phoneNumber &&
      isValidI18nPhoneNumber(phoneNumberCountryCode, phoneNumber);

    if (!hasBillingInfo) {
      return "/1";
    }
  }

  // If they do have a required document, look at current document
  if (requiredTaxDocumentType && !currentTaxDocument) {
    // Specific to custom CASH setting,
    if (
      payoutsAccount.hold &&
      payoutsAccount.holdReasons.includes("NO_W9_DOCUMENT")
    )
      return "/dashboard";

    return "/3";
  }

  if (!withdrawalSettings && brandedSignup) return "/4";

  return "/dashboard";
}

export function useTaxAndCash() {
  const host = useHost();
  const user = useUserIdentity();
  const locale = useLocale();

  const [completeImpactPartner, { loading: completeLoading }] =
    useMutation<CompletePartnerResult>(COMPLETE_PARTNER);

  // State for current step of form
  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/loading",
  });

  // State for when to hide steps, or override certain actions
  const [context, _setContext] = useParentState<TaxContext>({
    namespace: TAX_FORM_CONTEXT_NAMESPACE,
    initialValue: {} as TaxContext,
  });

  // State to carry user form information into step 2
  const [userFormContext, _setUserFormContext] =
    useParentState<UserFormContext>({
      namespace: USER_FORM_CONTEXT_NAMESPACE,
      initialValue: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        countryCode: undefined,
        currency: undefined,
      } as UserFormContext,
    });

  const [_currenciesContext, setCurrenciesContext] = useParentState<Currencies>(
    {
      namespace: CURRENCIES_NAMESPACE,
      initialValue: [],
    }
  );

  const [_countriesContext, _setCountriesContext] = useParentState<
    TaxCountry[]
  >({
    namespace: COUNTRIES_NAMESPACE,
    initialValue: [],
  });

  const [_sortedCountriesContext, setSortedCountriesContext] = useParentState<
    TaxCountry[]
  >({
    namespace: SORTED_COUNTRIES_NAMESPACE,
    initialValue: [],
  });

  const { data, errors } = useParentQuery<UserQuery>({
    namespace: USER_QUERY_NAMESPACE,
    query: GET_USER,
    skip: !user,
    options: {
      batch: false,
    },
  });

  const countryCode =
    data?.user?.impactConnection?.publisher?.countryCode ||
    userFormContext.countryCode;

  useParentQuery<CountriesQuery>({
    namespace: COUNTRIES_QUERY_NAMESPACE,
    query: GET_COUNTRIES,
    skip: !user,
  });

  const { data: financeNetworkData, refetch } =
    useParentQuery<FinanceNetworkSettingsQuery>({
      namespace: FINANCE_NETWORK_SETTINGS_NAMESPACE,
      query: GET_FINANCE_NETWORK_SETTINGS,
      skip: !user,
      variables: {
        filter: getFinanceNetworkFilter(),
      },
    });

  const { data: currenciesData } = useParentQuery<CurrenciesQuery>({
    namespace: CURRENCIES_QUERY_NAMESPACE,
    query: GET_CURRENCIES,
    skip: !user,
    variables: {
      locale,
    },
  });

  const supportedCurrencies = useMemo(() => {
    // Filter out any currencies not supported by finance network settings
    const allValidCurrencies =
      financeNetworkData?.impactFinanceNetworkSettings?.data?.reduce(
        (agg, settings) => {
          const currency = currenciesData?.currencies?.data?.find(
            (currency) => currency.currencyCode === settings.currency
          );
          // Currency not in supported list
          if (!currency) return agg;
          // Currency already added to list
          if (
            agg.find((currency) => currency.currencyCode === settings.currency)
          )
            return agg;
          // Currency not supported by selected country
          if (
            userFormContext.countryCode &&
            settings.countryCode !== countryCode
          )
            return agg;

          return [...agg, currency];
        },
        []
      );
    return allValidCurrencies;
  }, [financeNetworkData, countryCode]);

  const intlLocale = locale?.replace("_", "-") || "en";

  const sortByName = (a: TaxCountry, b: TaxCountry) =>
    a.displayName < b.displayName ? -1 : 1;

  const paymentOptions = financeNetworkData?.impactFinanceNetworkSettings?.data;

  // filter out any duplicate countries and null countryCode
  const availableCountries = useMemo(
    () =>
      new Set(
        paymentOptions
          ?.map((option) => option.countryCode)
          .filter((value) => value)
      ),
    [paymentOptions]
  );

  const _topCountries = ["CA", "GB", "US"];

  const sortedCountries = useMemo(
    () =>
      Array.from(availableCountries)
        .map((countryCode) =>
          getCountryObj({ countryCode, locale: intlLocale })
        )
        .sort(sortByName)
        .reduce((prev, countryObj) => {
          if (_topCountries.includes(countryObj.countryCode))
            return [countryObj, ...prev];
          return [...prev, countryObj];
        }, []),
    [availableCountries]
  );

  useEffect(() => {
    if (sortedCountries) setSortedCountriesContext(sortedCountries);
  }, [sortedCountries]);

  useEffect(() => {
    if (supportedCurrencies) setCurrenciesContext(supportedCurrencies);
  }, [supportedCurrencies]);

  useEffect(() => {
    if (errors) {
      setStep("/error");
      return;
    }
    if (!host || !user) return;

    async function completeConnection(user: UserQuery["user"]) {
      const publisher = user?.impactConnection?.publisher;

      const hasBillingInfo =
        publisher.billingAddress &&
        publisher.billingCity &&
        publisher.billingCountryCode &&
        publisher.billingPostalCode &&
        publisher.phoneNumberCountryCode &&
        publisher.phoneNumber &&
        isValidI18nPhoneNumber(
          publisher.phoneNumberCountryCode,
          publisher.phoneNumber
        );

      if (
        hasBillingInfo &&
        user?.impactConnection?.connectionStatus === "STARTED"
      ) {
        const vars = {
          user: {
            id: data?.user?.id,
            accountId: data?.user?.accountId,
          },
          firstName: data?.user?.firstName,
          lastName: data?.user?.lastName,
          countryCode: publisher.billingCountryCode,
          currency: publisher.currency,
          address: publisher.billingAddress,
          city: publisher.billingCity,
          state: publisher.billingState,
          postalCode: publisher.billingPostalCode,
          phoneNumber: publisher.phoneNumber,
          phoneNumberCountryCode: publisher.phoneNumberCountryCode,
        } as Partial<ImpactConnection>;
        await completeImpactPartner({
          vars,
        });
      }
    }

    if (data) {
      const user = data?.user;

      if (!user || step !== "/loading") return;

      if (
        user?.impactConnection?.publisher &&
        user?.impactConnection.connectionStatus === "STARTED"
      ) {
        completeConnection(user);
        refetch();
      }
      const currentStep = getCurrentStep(user);
      setStep(currentStep);
    }
  }, [host, user, data?.user?.email, errors]);

  function getFinanceNetworkFilter() {
    if (step === "/1") return {};
    if (step === "/4")
      return { currency_eq: data?.user?.impactConnection?.publisher?.currency };

    if (countryCode)
      return {
        countryCode_eq: countryCode,
      };
    return {};
  }

  return {
    step,
    setStep,
    context,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading: step === "/loading",
  };
}

export type UseTaxAndCashResultType = ReturnType<typeof useTaxAndCash>;
