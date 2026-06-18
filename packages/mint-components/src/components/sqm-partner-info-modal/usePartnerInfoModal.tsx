import {
  useLocale,
  useMutation,
  useQuery,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { useEffect, useMemo, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { PartnerInfoModal } from "./sqm-partner-info-modal";
import { PartnerInfoModalViewProps } from "./sqm-partner-info-modal-view";
import { StartImpactConnectionResult } from "../tax-and-cash/sqm-indirect-tax-form/useIndirectTaxForm";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../tax-and-cash/eventKeys";
import { PARTNER_CREATED_NAMESPACE } from "../sqm-widget-verification/keys";
import {
  GET_FINANCE_NETWORK_SETTINGS,
  FinanceNetworkSettingsQuery,
} from "../tax-and-cash/data";

export const GET_USER_PARTNER_INFO = gql`
  query getUserPartnerInfo {
    user: viewer {
      ... on User {
        id
        accountId
        firstName
        lastName
        email
        countryCode
        customFields
        impactConnection {
          connected
          connectionStatus
          publisher {
            id
            countryCode
            currency
          }
        }
      }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query getCountries {
    impactPayoutCountries(limit: 1000) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query currencies($locale: RSLocale) {
    currencies(limit: 300) {
      data {
        displayName(locale: $locale)
        currencyCode
      }
    }
  }
`;

const START_IMPACT_CONNECTION = gql`
  mutation startImpactConnection($vars: ImpactConnectionInput!) {
    startImpactConnection(impactConnectionInput: $vars) {
      success
      validationErrors {
        field
        message
      }
      user {
        id
        accountId
        impactConnection {
          connected
          publisher {
            brandedSignup
            requiredTaxDocumentType
            currentTaxDocument {
              type
              status
            }
          }
        }
      }
    }
  }
`;

export type TaxCountry = {
  countryCode: string;
  displayName: string;
};

export type CountriesQuery = {
  impactPayoutCountries: {
    data: TaxCountry[];
  };
};

export function usePartnerInfoModal(
  props: PartnerInfoModal,
): PartnerInfoModalViewProps {
  const locale = useLocale();

  const setPartnerCreated = useSetParent(PARTNER_CREATED_NAMESPACE);

  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useQuery(GET_USER_PARTNER_INFO, {});

  const user = userData?.user;

  const { data: currenciesData, loading: currenciesLoading } = useQuery(
    GET_CURRENCIES,
    { variables: { locale } },
  );

  const { data: countriesData, loading: countriesLoading } = useQuery(
    GET_COUNTRIES,
    {},
  );

  // No pre-filled country, use locale to determine countryCode instead
  const [countryCode, setCountryCode] = useState(
    user?.impactConnection?.publisher?.countryCode ||
      locale.replace(/^.*_/, ""),
  );

  const [currency, setCurrency] = useState(
    user?.impactConnection?.publisher?.currency || "",
  );

  const { data: financeNetworkData } = useQuery<FinanceNetworkSettingsQuery>(
    GET_FINANCE_NETWORK_SETTINGS,
    {
      variables: { filter: countryCode ? { countryCode_eq: countryCode } : {} },
    },
  );

  const [startImpactConnection, { loading: connectLoading }] =
    useMutation<StartImpactConnectionResult>(START_IMPACT_CONNECTION);

  const [allowBankingCollection, setAllowBankingCollection] = useState(false);

  const countries = useMemo(() => {
    const data = countriesData?.impactPayoutCountries?.data;
    if (!data) return [];
    return [...data].sort((a: TaxCountry, b: TaxCountry) => {
      if (a.countryCode === "US") return -1;
      if (b.countryCode === "US") return 1;
      return a.displayName.localeCompare(b.displayName);
    });
  }, [countriesData]);

  const isExistingPartner = !!user?.impactConnection?.publisher;

  const _currencies = useMemo(() => {
    // if isExistingPartner, grab all currencies since select is disabled anyways
    if (isExistingPartner) {
      return currenciesData?.currencies?.data || [];
    }

    const allValidCurrencies =
      financeNetworkData?.impactFinanceNetworkSettings?.data?.reduce(
        (agg, settings) => {
          if (countryCode && settings.countryCode !== countryCode) return agg;
          const c = currenciesData?.currencies?.data?.find(
            (cur) => cur.currencyCode === settings.currency,
          );
          if (!c) return agg;
          if (agg.find((cur) => cur.currencyCode === settings.currency))
            return agg;
          return [...agg, c];
        },
        [],
      );
    return allValidCurrencies || [];
  }, [financeNetworkData, currenciesData, countryCode, isExistingPartner]);

  const currencies = useMemo(
    () =>
      [..._currencies].sort((a, b) =>
        a.displayName.localeCompare(b.displayName),
      ),
    [_currencies],
  );

  const [countrySearch, setCountrySearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries || []);
  const [filteredCurrencies, setFilteredCurrencies] = useState(
    currencies || [],
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const publisher = user?.impactConnection?.publisher;
    if (!userData || !publisher) return;
    setCountryCode(publisher.countryCode);
    setCurrency(publisher.currency);
  }, [userData, user]);

  useEffect(() => {
    if (!countries?.length) return;
    if (countrySearch.trim() === "") {
      setFilteredCountries(countries || []);
    } else {
      setFilteredCountries(
        countries.filter((c) =>
          c.displayName.toLowerCase().includes(countrySearch.toLowerCase()),
        ) || [],
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
          c.currencyCode.toLowerCase().includes(currencySearch.toLowerCase()),
        ) || [],
      );
    }
  }, [currencySearch, currencies]);

  const impactConnection = user?.impactConnection;

  function onCountryChange(e: any) {
    const value = e.detail?.item?.__value;
    if (!value) return;
    setCountryCode(value);
    setCurrency("");
    setError("");
  }

  function onCurrencyChange(e: any) {
    const value = e.detail?.item?.__value;
    if (!value) return;
    setCurrency(value);
    setError("");
  }

  function onCheckboxChange(e: any) {
    const checked = e.target.checked;
    setAllowBankingCollection(checked);
  }

  async function onSubmit() {
    if (!allowBankingCollection || !countryCode || !currency) {
      setError(props.missingFieldsErrorText);
      return;
    }
    setError("");

    if (!user) {
      setError(props.networkErrorText);
      return;
    }

    try {
      const vars = {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        firstName: user.firstName,
        lastName: user.lastName,
        countryCode,
        currency,
      };

      const result = await startImpactConnection({ vars });

      if (!result || (result as Error)?.message) {
        setError(props.networkErrorText);
        return;
      }

      const connectionResult = (result as StartImpactConnectionResult)
        .startImpactConnection;

      if (!connectionResult?.success) {
        const validationMsg = connectionResult?.validationErrors
          ?.map((e) => e.message)
          .join(". ");
        setError(validationMsg || props.networkErrorText);
        console.error(
          "Failed to create Impact connection:",
          connectionResult?.validationErrors,
        );
        return;
      }

      window.dispatchEvent(new Event(TAX_FORM_UPDATED_EVENT_KEY));

      await refetch();
      setPartnerCreated?.(true);
      setSuccess(true);
    } catch (e) {
      console.error("Partner creation error:", e);
      setError(props.networkErrorText);
    }
  }

  const showModal =
    !success &&
    !userLoading &&
    impactConnection?.connectionStatus === "NOT_STARTED";

  return {
    states: {
      open: showModal,
      loading: userLoading || countriesLoading || currenciesLoading,
      submitting: connectLoading,
      isExistingPartner,
      countryCode,
      currency,
      error,
      success,
      filteredCountries: filteredCountries || [],
      filteredCurrencies: filteredCurrencies || [],
      allowBankingCollection,
      disabled: userLoading || connectLoading,
    },
    callbacks: {
      onCountryChange,
      onCurrencyChange,
      onCheckboxChange,
      setCurrencySearch,
      setCountrySearch,
      onSubmit,
      onClose: () => setSuccess(true),
    },
    text: props.getTextProps(),
  };
}

export type PartnerInfoModalResult = ReturnType<typeof usePartnerInfoModal>;
