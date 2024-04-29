import {
  getContextValueName,
  setUserIdentity,
  useHost,
  useLocale,
  useParentQuery,
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useMemo } from "@saasquatch/universal-hooks";
import { getCountryObj, validTaxDocument } from "../utils";
import {
  CountriesQuery,
  COUNTRIES_NAMESPACE,
  COUNTRIES_QUERY_NAMESPACE,
  Currencies,
  CurrenciesQuery,
  CURRENCIES_NAMESPACE,
  CURRENCIES_QUERY_NAMESPACE,
  FinanceNetworkSettingsQuery,
  FINANCE_NETWORK_SETTINGS_NAMESPACE,
  GET_COUNTRIES,
  GET_CURRENCIES,
  GET_FINANCE_NETWORK_SETTINGS,
  GET_USER,
  SORTED_COUNTRIES_NAMESPACE,
  TaxContext,
  TaxCountry,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  UserFormContext,
  UserQuery,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
} from "./data";

function getCurrentStep(user: UserQuery["user"]) {
  if (!user.impactConnection?.connected) {
    return "/1";
  }

  const {
    requiredTaxDocumentType,
    currentTaxDocument,
    withdrawalSettings,
    brandedSignup,
  } = user.impactConnection.publisher;

  // If they do have a required document, look at current document
  if (
    requiredTaxDocumentType &&
    !validTaxDocument(requiredTaxDocumentType, currentTaxDocument?.type)
  )
    return "/3";

  if (!withdrawalSettings && brandedSignup) return "/4";

  return "/dashboard";
}

export function useTaxAndCash() {
  const host = useHost();

  /*************************/
  // TODO: REMOVE THIS
  function DEMO_SETUP() {
    const idAndAccountId =
      "fc542c3c5cd0dee63c24956bd6eed72d63147fb333906515efb61cf2b1330e4c";
    const jwt =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiZmM1NDJjM2M1Y2QwZGVlNjNjMjQ5NTZiZDZlZWQ3MmQ2MzE0N2ZiMzMzOTA2NTE1ZWZiNjFjZjJiMTMzMGU0YyIsImFjY291bnRJZCI6ImZjNTQyYzNjNWNkMGRlZTYzYzI0OTU2YmQ2ZWVkNzJkNjMxNDdmYjMzMzkwNjUxNWVmYjYxY2YyYjEzMzBlNGMiLCJlbWFpbCI6ImNvbGV0b24uYW5uZXR0K3FhNHRlc3RAaW1wYWN0LmNvbSJ9fQ.qWNEurGZuYW3XVeYOQRSX1DukxJtNEU0evTmjBYpTm0";
    const programId = "24474";
    const tenantAlias = "aprh0cfq6y8tk";
    const appDomain = "https://staging.referralsaasquatch.com";

    // @ts-ignore
    window.widgetIdent = {
      tenantAlias,
      appDomain,
      programId,
    };

    useEffect(() => {
      setUserIdentity({
        accountId: idAndAccountId,
        id: idAndAccountId,
        jwt,
      });
    }, []);
  }
  // DEMO_SETUP();
  /********************/

  const user = useUserIdentity();
  const locale = useLocale();

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

    if (data) {
      const user = data?.user;

      if (!user || step !== "/loading") return;

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
