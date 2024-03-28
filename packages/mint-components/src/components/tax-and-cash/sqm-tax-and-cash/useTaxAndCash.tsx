import {
  setUserIdentity,
  useHost,
  useLocale,
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
  SORTED_COUNTRIES_NAMESPACE,
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  TaxCountry,
  USER_FORM_CONTEXT_NAMESPACE,
  USER_QUERY_NAMESPACE,
  UserFormContext,
  UserQuery,
} from "./data";
import { getContextValueName } from "@saasquatch/component-boilerplate/dist/hooks/useParentState";

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
      "5bd061e1c73e02a1e726ab7db2b4b4648e83eff10e66bccc8d1937c40c1b49a1";
    const accountId =
      "5bd061e1c73e02a1e726ab7db2b4b4648e83eff10e66bccc8d1937c40c1b49a1";

    // andy3
    // const id =
    //   "e061ee21b45eff8ada22845d441c6a2cd7190af1718a55452ad2d44b020915a7";
    // const accountId =
    //   "e061ee21b45eff8ada22845d441c6a2cd7190af1718a55452ad2d44b020915a7";

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
      // tenantAlias: "aprh0cfq6y8tk",
      tenantAlias: "aprh0cfq6y8tk",
      appDomain: "https://staging.referralsaasquatch.com",
      programId,
    };

    // coleton
    useEffect(() => {
      setUserIdentity({
        accountId,
        id,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNWJkMDYxZTFjNzNlMDJhMWU3MjZhYjdkYjJiNGI0NjQ4ZTgzZWZmMTBlNjZiY2NjOGQxOTM3YzQwYzFiNDlhMSIsImFjY291bnRJZCI6IjViZDA2MWUxYzczZTAyYTFlNzI2YWI3ZGIyYjRiNDY0OGU4M2VmZjEwZTY2YmNjYzhkMTkzN2M0MGMxYjQ5YTEiLCJlbWFpbCI6ImFuZHkubHVvK3RocmVzaG9sZEBpbXBhY3QuY29tIn19.NTdsIu4p8qNJGuOTCvGwNPZI_4V7HwNNhQLavO1jPds",
      });
    }, []);

    // andy3
    // useEffect(() => {
    //   setUserIdentity({
    //     accountId,
    //     id,
    //     jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiZTA2MWVlMjFiNDVlZmY4YWRhMjI4NDVkNDQxYzZhMmNkNzE5MGFmMTcxOGE1NTQ1MmFkMmQ0NGIwMjA5MTVhNyIsImFjY291bnRJZCI6ImUwNjFlZTIxYjQ1ZWZmOGFkYTIyODQ1ZDQ0MWM2YTJjZDcxOTBhZjE3MThhNTU0NTJhZDJkNDRiMDIwOTE1YTciLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIn19.92Dtz49tnl8ZL9oDAkNeND8SX5OSFlt5Y7FXP92sGiA",
    //   });
    // }, []);

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

export function getCountryObj({
  countryCode,
  locale,
}: {
  countryCode: string;
  locale: string;
}) {
  // @ts-ignore DisplayNames not in Intl type
  const displayName = new Intl.DisplayNames([locale], {
    type: "region",
  }).of(countryCode);

  return {
    countryCode,
    displayName,
  };
}
