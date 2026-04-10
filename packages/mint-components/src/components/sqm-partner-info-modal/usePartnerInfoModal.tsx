import {
  useLocale,
  useMutation,
  useQuery,
  useSetParent,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { PartnerInfoModal } from "./sqm-partner-info-modal";
import { PartnerInfoModalViewProps } from "./sqm-partner-info-modal-view";
import { ConnectPartnerResult } from "../tax-and-cash/sqm-indirect-tax-form/useIndirectTaxForm";
import { validTaxDocument } from "../tax-and-cash/utils";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../tax-and-cash/eventKeys";
import { VERIFICATION_PARENT_NAMESPACE } from "../sqm-widget-verification/keys";

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
          publisher {
            phoneNumber
            phoneNumberCountryCode
            countryCode
            currency
            requiredTaxDocumentType
            currentTaxDocument {
              type
              status
            }
            withdrawalSettings {
              paymentMethod
            }
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

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);

  const [countryCode, setCountryCode] = useState(
    user?.impactConnection?.publisher?.countryCode || "",
  );
  const [currency, setCurrency] = useState(
    user?.impactConnection?.publisher?.currency || "",
  );

  console.log(countryCode, currency, "initial country and currency state"); // TEMP
  const [countrySearch, setCountrySearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(
    countriesData?.impactPayoutCountries?.data || [],
  );
  const [filteredCurrencies, setFilteredCurrencies] = useState(
    currenciesData?.currencies?.data || [],
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const countries = countriesData?.impactPayoutCountries?.data || [];
  const currencies = currenciesData?.currencies?.data || [];

  console.log(user, "user data from partner info query"); // TEMP

  useEffect(() => {
    if (userData && user.impactConnection?.publisher) {
      setCountryCode(user.impactConnection.publisher.countryCode);
      setCurrency(user.impactConnection.publisher.currency);
    }
  }, [userData]);

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

      const result = await connectImpactPartner({ vars });

      if (!result || (result as Error)?.message) {
        setError(props.networkErrorText);
        return;
      }

      const connectionResult = (result as ConnectPartnerResult)
        .createImpactConnection;

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

  console.log(success, "success state in partner info modal");

  const showModal =
    !success &&
    !userLoading &&
    (!impactConnection?.connected || !impactConnection?.publisher);

  console.log(showModal, "showModal condition in partner info modal"); // TEMP

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
