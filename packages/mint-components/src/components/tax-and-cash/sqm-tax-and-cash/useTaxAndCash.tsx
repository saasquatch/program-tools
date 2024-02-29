import {
  setUserIdentity,
  useHost,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useMemo } from "@saasquatch/universal-hooks";
import { useParentQuery } from "../../../utils/useParentQuery";
import {
  getContextValueName,
  useParentState,
} from "../../../utils/useParentState";
import {
  COUNTRIES_NAMESPACE,
  COUNTRIES_QUERY_NAMESPACE,
  CURRENCIES_NAMESPACE,
  CURRENCIES_QUERY_NAMESPACE,
  CountriesQuery,
  Currencies,
  CurrenciesQuery,
  FINANCE_NETWORK_SETTINGS_NAMESPACE,
  FinanceNetworkSettingsQuery,
  GET_COUNTRIES,
  GET_CURRENCIES,
  GET_FINANCE_NETWORK_SETTINGS,
  GET_USER,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxCountry,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "./data";

function getCurrentStep(user: UserQuery["user"]) {
  // TODO: include banking form step as a case

  if (!user.impactConnection?.publisher || !user.impactConnection?.connected) {
    return "/1";
  }

  const { requiredTaxDocumentType, currentTaxDocument, withdrawalSettings } =
    user.impactConnection.publisher;

  // If they do have a required document, look at current document
  if (
    requiredTaxDocumentType &&
    (!currentTaxDocument ||
      currentTaxDocument?.status === "INACTIVE" ||
      currentTaxDocument?.status === "NEW")
  ) {
    return "/3";
  }

  if (!withdrawalSettings) return "/4";

  return "/submitted";
}

export function useTaxAndCash() {
  const host = useHost();

  function setupDemo() {
    // coleton
    const id =
      "01e869a67428264712034a69222c709820c308c21ef4fb338bac0af445ab3a64";
    const accountId =
      "01e869a67428264712034a69222c709820c308c21ef4fb338bac0af445ab3a64";

    // // andy
    // const id =
    //   "64fdeb7347c94ab69bb5ff4c788ca78c0ba127cdc374a8300157250b1643767b";
    // const accountId =
    //   "64fdeb7347c94ab69bb5ff4c788ca78c0ba127cdc374a8300157250b1643767b";

    // sam
    // const id =
    //   "ea9c677dda4e031bcb559541007ff61179fbe8bf8f6c32e478d97f09d069fd5b";
    // const accountId =
    //   "ea9c677dda4e031bcb559541007ff61179fbe8bf8f6c32e478d97f09d069fd5b";
    const programId = "22514";

    //@ts-ignore
    window.widgetIdent = {
      tenantAlias: "aprh0cfq6y8tk",
      appDomain: "https://staging.referralsaasquatch.com",
      programId,
    };

    // coleton
    useEffect(() => {
      setUserIdentity({
        accountId,
        id,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiMDFlODY5YTY3NDI4MjY0NzEyMDM0YTY5MjIyYzcwOTgyMGMzMDhjMjFlZjRmYjMzOGJhYzBhZjQ0NWFiM2E2NCIsImFjY291bnRJZCI6IjAxZTg2OWE2NzQyODI2NDcxMjAzNGE2OTIyMmM3MDk4MjBjMzA4YzIxZWY0ZmIzMzhiYWMwYWY0NDVhYjNhNjQifX0.kvXteiTOW1vfXtT30NbyCkacbBPtFZqEf990SFkHiA4",
      });
    }, []);

    // andy
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNjRmZGViNzM0N2M5NGFiNjliYjVmZjRjNzg4Y2E3OGMwYmExMjdjZGMzNzRhODMwMDE1NzI1MGIxNjQzNzY3YiIsImFjY291bnRJZCI6IjY0ZmRlYjczNDdjOTRhYjY5YmI1ZmY0Yzc4OGNhNzhjMGJhMTI3Y2RjMzc0YTgzMDAxNTcyNTBiMTY0Mzc2N2IifX0.rSeFVjrPvRlO_m4skwgnvJNbWfnIM7f_q2tfqo4R0pU",
    //   });
    // }, []);

    // sam
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJraWQiOiJJUk1Yc1l5NllZcXE0Njk0MzdtRzhFUlF0OFFvS0ZCYUcxIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2NWRkMjE3YjVhYmE1MjI2MDAxMDhmZTciLCJpYXQiOjE3MDg5OTA4NDMsImV4cCI6MTcwOTA3NzI0Mywic3ViIjoiWldFNVl6WTNOMlJrWVRSbE1ETXhZbU5pTlRVNU5UUXhNREEzWm1ZMk1URTNPV1ppWlRoaVpqaG1ObU16TW1VME56aGtPVGRtTURsa01EWTVabVExWWc9PTpaV0U1WXpZM04yUmtZVFJsTURNeFltTmlOVFU1TlRReE1EQTNabVkyTVRFM09XWmlaVGhpWmpobU5tTXpNbVUwTnpoa09UZG1NRGxrTURZNVptUTFZZz09QGFwcmgwY2ZxNnk4dGs6dXNlcnMiLCJ1c2VyIjp7ImlkIjoiZWE5YzY3N2RkYTRlMDMxYmNiNTU5NTQxMDA3ZmY2MTE3OWZiZThiZjhmNmMzMmU0NzhkOTdmMDlkMDY5ZmQ1YiIsImFjY291bnRJZCI6ImVhOWM2NzdkZGE0ZTAzMWJjYjU1OTU0MTAwN2ZmNjExNzlmYmU4YmY4ZjZjMzJlNDc4ZDk3ZjA5ZDA2OWZkNWIiLCJkYXRlQmxvY2tlZCI6bnVsbH19.4d48e9AT21uCR-yA7rkn1TuBpHz8a56vI0pHpRtio0M",
    //   });
    // }, []);
  }

  setupDemo();

  /** END DEMO DATA */

  const user = useUserIdentity();

  // State for current step of form
  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/loading",
  });

  // State for when to hide steps, or override certain actions
  const [context, setContext] = useParentState<TaxContext>({
    namespace: TAX_FORM_CONTEXT_NAMESPACE,
    initialValue: {} as TaxContext,
  });

  // State to carry user form information into step 2
  const [userFormContext, setUserFormContext] = useParentState<UserFormContext>(
    {
      namespace: USER_FORM_CONTEXT_NAMESPACE,
      initialValue: {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        countryCode: undefined,
        currency: undefined,
      } as UserFormContext,
    }
  );

  const [_currenciesContext, setCurrenciesContext] = useParentState<Currencies>(
    {
      namespace: CURRENCIES_NAMESPACE,
      initialValue: [],
    }
  );

  const [_countriesContext, setCountriesContext] = useParentState<TaxCountry[]>(
    {
      namespace: COUNTRIES_NAMESPACE,
      initialValue: [],
    }
  );

  const { data } = useParentQuery<UserQuery>({
    namespace: USER_QUERY_NAMESPACE,
    query: GET_USER,
    skip: !user,
  });

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
        filter: {
          countryCode_eq: userFormContext.countryCode,
          ...(data?.user?.impactConnection?.publisher?.currency
            ? { currency_eq: data?.user?.impactConnection?.publisher?.currency }
            : {}),
        },
      },
    });

  const { data: currenciesData } = useParentQuery<CurrenciesQuery>({
    namespace: CURRENCIES_QUERY_NAMESPACE,
    query: GET_CURRENCIES,
    skip: !user,
  });

  const countryCode =
    data?.user?.impactConnection?.publisher?.countryCode ||
    userFormContext.countryCode;

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

  useEffect(() => {
    if (supportedCurrencies) setCurrenciesContext(supportedCurrencies);
  }, [supportedCurrencies]);

  useEffect(() => {
    if (!host || !user) return;

    if (data) {
      const user = data?.user;
      if (!user || step !== "/loading") return;

      const currentStep = getCurrentStep(user);
      setStep(currentStep);
    }
  }, [host, user, data?.user?.email]);

  return {
    step,
    setStep,
    context,
    namespace: getContextValueName(TAX_CONTEXT_NAMESPACE),
    loading: step === "/loading",
  };
}

export type UseTaxAndCashResultType = ReturnType<typeof useTaxAndCash>;
