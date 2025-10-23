import {
  getEnvironmentSDK,
  useParent,
  useQuery,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  UserQuery,
} from "../data";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../eventKeys";
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
  | "NEW_PAYEE_REVIEW"
  | "PAYMENT_HOLD_ON_CHANGE"
  | "BENEFICIARY_NAME_INVALID"
  | "BENEFICIARY_NAME_MISMATCH"
  | "BANK_TAX_NAME_MISMATCH"
  | "WITHDRAWAL_SETTINGS_INVALID"
  | "PAYMENT_RETURNED"
  | "HOLD"
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
        rewards(limit: 1000) {
          data {
            statuses
            partnerFundsTransfer {
              id
              status
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

  const hasTransferredReward = data?.user?.rewards?.data?.find(
    (reward) =>
      reward.statuses.includes("REDEEMED") &&
      reward.partnerFundsTransfer.status === "TRANSFERRED"
  );

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
  if (account.holdReasons?.includes("NEW_PAYEE_REVIEW") && hasTransferredReward)
    return "NEW_PAYEE_REVIEW";
  if (account.holdReasons?.includes("PAYMENT_HOLD_ON_CHANGE"))
    return "PAYMENT_HOLD_ON_CHANGE";
  if (account.holdReasons?.includes("BENEFICIARY_NAME_INVALID"))
    return "BENEFICIARY_NAME_INVALID";
  if (account.holdReasons?.includes("BENEFICIARY_NAME_MISMATCH"))
    return "BENEFICIARY_NAME_MISMATCH";
  if (account.holdReasons?.includes("BANK_TAX_NAME_MISMATCH"))
    return "BANK_TAX_NAME_MISMATCH";
  if (account.holdReasons?.includes("WITHDRAWAL_SETTINGS_INVALID"))
    return "WITHDRAWAL_SETTINGS_INVALID";
  if (account.holdReasons?.includes("PAYMENT_RETURNED"))
    return "PAYMENT_RETURNED";
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

  const setContext = useSetParent<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const setStep = useSetParent<string>(TAX_CONTEXT_NAMESPACE);

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

    if (url.includes("#")) url = url.split("#")[0];

    if (status === "INFORMATION_REQUIRED") url += "#1";
    else if (
      status === "OVER_W9_THRESHOLD" &&
      enforceUsTaxComplianceOption === "CASH_ONLY_DEFER_W9"
    )
      url += "#3";

    window.history.pushState(null, "", url);
  };

  const onPaymentInfoClick = () => {
    let url = props.cashPayoutsPageUrl;

    url += "#4";

    window.history.pushState(null, "", url);
  };

  const onNewFormClick = () => {
    let url = props.cashPayoutsPageUrl;

    url += "#3";

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
      onPaymentInfoClick,
      onNewFormClick,
    },
  };
}
