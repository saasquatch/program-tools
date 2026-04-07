import {
  useLocale,
  useMutation,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { PartnerInfoModal } from "./sqm-partner-info-modal";
import { PartnerInfoModalViewProps } from "./sqm-partner-info-modal-view";
import { ConnectPartnerResult } from "../tax-and-cash/sqm-indirect-tax-form/useIndirectTaxForm";
import { validTaxDocument } from "../tax-and-cash/utils";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../tax-and-cash/eventKeys";

export const GET_USER_PARTNER_INFO = gql`
  query getUserPartnerInfo {
    user: viewer {
      ... on User {
        id
        firstName
        lastName
        email
        countryCode
        customFields
        impactConnection {
          connected
          publisher {
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
  const user = useUserIdentity();
  const locale = useLocale();

  const {
    data: userData,
    loading: userLoading,
    refetch,
  } = useQuery(GET_USER_PARTNER_INFO, {}, !user?.jwt);

  const { data: currenciesData } = useQuery(
    GET_CURRENCIES,
    { variables: { locale } },
    !user?.jwt,
  );

  const { data: countriesData } = useQuery(GET_COUNTRIES, {}, !user?.jwt);

  const { data: tenantSettingsData } = useQuery<TenantSettingsQuery>(
    GET_BRAND_NAME,
    {},
  );

  const [
    connectImpactPartner,
    { loading: connectLoading, errors: connectErrors },
  ] = useMutation<ConnectPartnerResult>(CONNECT_PARTNER);

  const [countryCode, setCountryCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  console.log(user, "user identity in create partner modal"); // TEMP
  console.log(userData, "user data from partner info query"); // TEMP

  const impactConnection = userData?.user?.impactConnection;

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

    // AL TODO: How to create impact connection if we dont have address, postalCode, and city?
    try {
      const vars = {
        user: {
          id: user.id,
          accountId: user.accountId,
        },
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
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

      // Success
      window.dispatchEvent(new Event(TAX_FORM_UPDATED_EVENT_KEY));

      await refetch();
      setSuccess(true);
    } catch (e) {
      console.error("Partner creation error:", e);
      setError(props.networkErrorText);
    }
  }

  const shouldShow = !success && !userLoading && !impactConnection?.connected;

  return {
    states: {
      open: shouldShow,
      loading: userLoading,
      submitting: connectLoading,
      isExistingPartner: !!impactConnection?.connected,
      countryCode,
      currency,
      error,
      success,
      brandName: tenantSettingsData?.tenantSettings?.companyName || "",
      filteredCountries: countriesData?.impactPayoutCountries?.data || [],
      filteredCurrencies: currenciesData?.currencies?.data || [],
    },
    callbacks: {
      onCountryChange,
      onCurrencyChange,
      onCountrySearch: () => {},
      onCurrencySearch: () => {},
      onSubmit,
      onClose: () => setSuccess(true),
    },
    text: props.getTextProps(),
  };
}
