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
  if (!user.impactConnection?.connected) {
    return "/1";
  }

  const { requiredTaxDocumentType, currentTaxDocument, withdrawalSettings } =
    user.impactConnection.publisher;

  // If they do have a required document, look at current document
  if (requiredTaxDocumentType && !currentTaxDocument) {
    return "/3";
  }

  if (!withdrawalSettings) return "/4";

  return "/dashboard";
}

export function useTaxAndCash() {
  const host = useHost();

  function setupDemo() {
    // coleton
    const id =
      "4c794ebe367f7021e3ce543542e27389d76394571b1bb8e7ebfbbd33ae4214d1";
    const accountId =
      "4c794ebe367f7021e3ce543542e27389d76394571b1bb8e7ebfbbd33ae4214d1";

    // // andy
    // const id = "12345";
    // const accountId = "12345";

    // andy2
    // const id =
    //   "80d24e8d6133bdcf859844ca1fc7552c57d5d0661a7f46f791ea0785827a70ed";
    // const accountId =
    //   "80d24e8d6133bdcf859844ca1fc7552c57d5d0661a7f46f791ea0785827a70ed";

    // sam
    // const id =
    //   "3e0fab4f3e7c7cd3ee971b0c0e9a4ece4061349c837f24c71582330842fc8462";
    // const accountId =
    //   "3e0fab4f3e7c7cd3ee971b0c0e9a4ece4061349c837f24c71582330842fc8462";
    const programId = "22514";
    // const programId = "22999";

    //@ts-ignore
    window.widgetIdent = {
      tenantAlias: "aprh0cfq6y8tk",
      // tenantAlias: "aswi7zpxl6rjp",
      appDomain: "https://staging.referralsaasquatch.com",
      programId,
    };

    // coleton
    useEffect(() => {
      setUserIdentity({
        accountId,
        id,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNGM3OTRlYmUzNjdmNzAyMWUzY2U1NDM1NDJlMjczODlkNzYzOTQ1NzFiMWJiOGU3ZWJmYmJkMzNhZTQyMTRkMSIsImFjY291bnRJZCI6IjRjNzk0ZWJlMzY3ZjcwMjFlM2NlNTQzNTQyZTI3Mzg5ZDc2Mzk0NTcxYjFiYjhlN2ViZmJiZDMzYWU0MjE0ZDEiLCJlbWFpbCI6ImNvbGV0b24uYW5uZXR0K3c5bmV3QGltcGFjdC5jb20ifX0.CYQ2Z7QrE304gZsrPANxizOVm7TmC3gp3WJUmCl7TUQ",
      });
    }, []);

    // andy
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiMGExZTFmYTE3OGQ1MmRlZDAzZTg2YjZiZDAxYThhMDIwNDZkOGJlZjMzNjc2MzRlMTkyNzQ2ZTcxMTljNDFlMyIsImFjY291bnRJZCI6IjBhMWUxZmExNzhkNTJkZWQwM2U4NmI2YmQwMWE4YTAyMDQ2ZDhiZWYzMzY3NjM0ZTE5Mjc0NmU3MTE5YzQxZTMifX0.OO18YDc8LG3XeKJAug1oahqapmHY61RncrbRiK7Yer4",
    //   });
    // }, []);

    // andy
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSZkFUVEdOZXRqUDUwNzYxMDNERjVub0d0TDRnQ0hjYjEifQ.eyJ1c2VyIjp7ImlkIjoiODBkMjRlOGQ2MTMzYmRjZjg1OTg0NGNhMWZjNzU1MmM1N2Q1ZDA2NjFhN2Y0NmY3OTFlYTA3ODU4MjdhNzBlZCIsImFjY291bnRJZCI6IjgwZDI0ZThkNjEzM2JkY2Y4NTk4NDRjYTFmYzc1NTJjNTdkNWQwNjYxYTdmNDZmNzkxZWEwNzg1ODI3YTcwZWQifX0.8VWa3R_pSeRJeNw07AZPjCdTuTiwBYXOAc-ouVItuYs",
    //   });
    // }, []);

    // sam
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJraWQiOiJJUk1Yc1l5NllZcXE0Njk0MzdtRzhFUlF0OFFvS0ZCYUcxIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2NWVhNDMxOTQ3NGJjZTBkMGE4ZDkwZGYiLCJpYXQiOjE3MDk4NTE0MTcsImV4cCI6MTcwOTkzNzgxNywic3ViIjoiTTJVd1ptRmlOR1l6WlRkak4yTmtNMlZsT1RjeFlqQmpNR1U1WVRSbFkyVTBNRFl4TXpRNVl6Z3pOMll5TkdNM01UVTRNak16TURnME1tWmpPRFEyTWc9PTpNMlV3Wm1GaU5HWXpaVGRqTjJOa00yVmxPVGN4WWpCak1HVTVZVFJsWTJVME1EWXhNelE1WXpnek4yWXlOR00zTVRVNE1qTXpNRGcwTW1aak9EUTJNZz09QGFwcmgwY2ZxNnk4dGs6dXNlcnMiLCJ1c2VyIjp7ImlkIjoiM2UwZmFiNGYzZTdjN2NkM2VlOTcxYjBjMGU5YTRlY2U0MDYxMzQ5YzgzN2YyNGM3MTU4MjMzMDg0MmZjODQ2MiIsImFjY291bnRJZCI6IjNlMGZhYjRmM2U3YzdjZDNlZTk3MWIwYzBlOWE0ZWNlNDA2MTM0OWM4MzdmMjRjNzE1ODIzMzA4NDJmYzg0NjIiLCJkYXRlQmxvY2tlZCI6bnVsbH19.1pFVd0Z-46-k0bPXe2lnrX8A8YFIyJzKAcvlhV0lk7Q",
    //   });
    // }, []);
  }

  // setupDemo();

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

  useEffect(() => {
    if (supportedCurrencies) setCurrenciesContext(supportedCurrencies);
  }, [supportedCurrencies]);

  // console.log({ errors });

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
