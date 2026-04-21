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
import {
  ConnectPartnerResult,
  StartImpactConnectionResult,
} from "../tax-and-cash/sqm-indirect-tax-form/useIndirectTaxForm";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../tax-and-cash/eventKeys";
import { VERIFICATION_PARENT_NAMESPACE } from "../sqm-widget-verification/keys";
import {
  GET_FINANCE_NETWORK_SETTINGS,
  FinanceNetworkSettingsQuery,
} from "../tax-and-cash/data";

// new field under impactConnection:{ resolvedByEmail: boolean } - determines if connection came from managed identity
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

export const CONNECT_PARTNER = gql`
  mutation createImpactConnection($vars: ImpactConnectionInput!) {
    createImpactConnection(impactConnectionInput: $vars) {
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

const GET_BRAND_NAME = gql`
  query getTenantSettings {
    tenantSettings {
      companyName
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

type TenantSettingsQuery = {
  tenantSettings: {
    companyName: string;
  };
};

export function usePartnerInfoModal(
  props: PartnerInfoModal,
): PartnerInfoModalViewProps {
  const locale = useLocale();

  const setVerificationContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

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

  const { data: tenantSettingsData } = useQuery<TenantSettingsQuery>(
    GET_BRAND_NAME,
    {},
  );

  const { data: financeNetworkData } = useQuery<FinanceNetworkSettingsQuery>(
    GET_FINANCE_NETWORK_SETTINGS,
    {
      variables: { filter: {} },
    },
  );

  const [
    startImpactConnection,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<StartImpactConnectionResult>(START_IMPACT_CONNECTION);

  // No pre-filled country, use locale to determine countryCode instead
  const [countryCode, setCountryCode] = useState(
    user?.impactConnection?.publisher?.countryCode ||
      locale.replace(/^.*_/, ""),
  );

  const [currency, setCurrency] = useState(
    user?.impactConnection?.publisher?.currency || "",
  );

  const countries = countriesData?.impactPayoutCountries?.data || [];

  // copied from useTaxAndCash for displaying currencies based on country - could be in helper?
  const currencies = useMemo(() => {
    const allValidCurrencies =
      financeNetworkData?.impactFinanceNetworkSettings?.data?.reduce(
        (agg, settings) => {
          const currency = currenciesData?.currencies?.data?.find(
            (c) => c.currencyCode === settings.currency,
          );
          if (!currency) return agg;
          if (agg.find((c) => c.currencyCode === settings.currency)) return agg;
          if (countryCode && settings.countryCode !== countryCode) return agg;
          return [...agg, currency];
        },
        [],
      );
    return (allValidCurrencies || []).sort((a, b) =>
      a.displayName.localeCompare(b.displayName),
    );
  }, [financeNetworkData, currenciesData, countryCode]);

  const [countrySearch, setCountrySearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(
    countriesData?.impactPayoutCountries?.data || [],
  );
  const [filteredCurrencies, setFilteredCurrencies] = useState(
    currencies || [],
  );

  console.log(userData, "userData partner info modal");

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

  async function onSubmit() {
    if (!countryCode || !currency) {
      setError(props.missingFieldsErrorText);
      return;
    }
    setError("");

    try {
      const vars = {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        firstName: user.firstName,
        lastName: user.lastName,
        // phoneNumber: null,
        // phoneNumberCountryCode: null,
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

      console.log(
        result,
        connectionResult,
        "result and connectionResult from creating partner from modal",
      );

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
      setSuccess(true);
      setVerificationContext(true);
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
      isExistingPartner: impactConnection?.publisher,
      countryCode,
      currency,
      error,
      success,
      brandName: tenantSettingsData?.tenantSettings?.companyName || "",
      filteredCountries: filteredCountries || [],
      filteredCurrencies: filteredCurrencies || [],
    },
    callbacks: {
      onCountryChange,
      onCurrencyChange,
      setCurrencySearch,
      setCountrySearch,
      onSubmit,
      onClose: () => setSuccess(true),
    },
    text: props.getTextProps(),
  };
}

export type PartnerInfoModalResult = ReturnType<typeof usePartnerInfoModal>;
