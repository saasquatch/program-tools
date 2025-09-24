import { getEnvironmentSDK, useQuery } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../eventKeys";
import { UserQuery } from "../sqm-tax-and-cash/data";
import { useVeriffApp, VERIFF_COMPLETE_EVENT_KEY } from "../useVeriffApp";
import { PayoutStatusAlert } from "./sqm-payout-status-alert";

export type EnforceUsTaxComplianceOption =
  | "NONE"
  | "EXPLICIT_COUNTRY_CODE"
  | "IMPLIED_COUNTRY_CODE"
  | "ALL"
  | "CASH_ONLY"
  | "CASH_ONLY_DEFER_W9";

export type PayoutStatus =
  | "OVER_W9_THRESHOLD"
  | "INFORMATION_REQUIRED"
  | "VERIFICATION:REQUIRED"
  | "VERIFICATION:INTERNAL"
  | "VERIFICATION:REVIEW"
  | "VERIFICATION:FAILED"
  | "HOLD"
  | "ACCOUNT_REVIEW"
  | "DONE";

export type TenantSettingsQuery = {
  tenantSettings: {
    enforceUsTaxCompliance: EnforceUsTaxComplianceOption;
  };
};

const GET_USER_STATUS = gql`
  query getUserStatus {
    user: viewer {
      ... on User {
        id
        impactConnection {
          connected
          publisher {
            id
            payoutsAccount {
              hold
              holdReasons
            }
          }
        }
      }
    }
  }
`;

const GET_TAX_SETTING = gql`
  query getTenantSettings {
    tenantSettings {
      enforceUsTaxCompliance
    }
  }
`;

export function getStatus(data: UserQuery): PayoutStatus {
  const account = data.user.impactConnection?.publisher?.payoutsAccount;

  if (!data.user?.impactConnection?.connected || !account)
    return "INFORMATION_REQUIRED";

  const currentTaxDocument =
    data.user.impactConnection?.publisher?.currentTaxDocument;
  if (account.holdReasons?.includes("NO_W9_DOCUMENT") && !currentTaxDocument)
    return "OVER_W9_THRESHOLD";
  if (account.holdReasons?.includes("IDV_CHECK_REQUIRED"))
    return "VERIFICATION:REQUIRED";
  if (account.holdReasons?.includes("IDV_CHECK_REQUIRED_INTERNAL"))
    return "VERIFICATION:INTERNAL";
  if (account.holdReasons?.includes("IDV_CHECK_REVIEW_INTERNAL"))
    return "VERIFICATION:REVIEW";
  if (account.holdReasons?.includes("IDV_CHECK_FAILED_INTERNAL"))
    return "VERIFICATION:FAILED";
  if (account.holdReasons?.includes("NEW_PAYEE_REVIEW"))
    return "ACCOUNT_REVIEW";
  if (account.hold) return "HOLD";
  return "DONE";
}

export function usePayoutStatus(props: PayoutStatusAlert) {
  const { type } = getEnvironmentSDK();
  const { loading, data, errors, refetch } = useQuery<UserQuery>(
    GET_USER_STATUS,
    {}
  );
  const { data: taxSettingRes } = useQuery<TenantSettingsQuery>(
    GET_TAX_SETTING,
    {}
  );
  const {
    render,
    loading: veriffLoading,
    errors: veriffErrors,
  } = useVeriffApp();
  const [status, setStatus] = useState<PayoutStatus | undefined>(undefined);

  const enforceUsTaxComplianceOption =
    taxSettingRes?.tenantSettings?.enforceUsTaxCompliance;

  useEffect(() => {
    if (!data) return;

    const s = getStatus(data);
    setStatus(s);
  }, [data]);

  useEffect(() => {
    const cb = () => refetch();
    window.addEventListener(TAX_FORM_UPDATED_EVENT_KEY, cb);
    window.addEventListener(VERIFF_COMPLETE_EVENT_KEY, cb);
    return () => {
      window.removeEventListener(TAX_FORM_UPDATED_EVENT_KEY, cb);
      window.removeEventListener(VERIFF_COMPLETE_EVENT_KEY, cb);
    };
  }, []);

  const onTermsClick = () => {
    let url = props.cashPayoutsPageUrl;
    if (status === "INFORMATION_REQUIRED") url += "#1";
    else if (status === "OVER_W9_THRESHOLD") url += "#3";

    window.history.pushState(null, "", url);
  };

  return {
    states: {
      loading,
      veriffLoading,
      status,
      error: !!errors,
      enforceUsTaxComplianceOption,
    },
    data: { type },
    text: props.getTextProps(),
    callbacks: {
      onTermsClick,
      onClick: render,
    },
  };
}
