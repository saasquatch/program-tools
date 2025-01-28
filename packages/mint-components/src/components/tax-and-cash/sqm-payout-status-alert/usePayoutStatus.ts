import { getEnvironmentSDK, useQuery } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/stencil-hooks";
import { gql } from "graphql-request";
import { TAX_FORM_UPDATED_EVENT_KEY } from "../eventKeys";
import { UserQuery } from "../sqm-tax-and-cash/data";
import { useVeriffApp, VERIFF_COMPLETE_EVENT_KEY } from "../useVeriffApp";
import { PayoutStatusAlert } from "./sqm-payout-status-alert";

export type PayoutStatus =
  | "INFORMATION_REQUIRED"
  | "VERIFICATION:REQUIRED"
  | "VERIFICATION:INTERNAL"
  | "VERIFICATION:REVIEW"
  | "VERIFICATION:FAILED"
  | "HOLD"
  | "DONE";

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

export function getStatus(data: UserQuery): PayoutStatus {
  const account = data.user.impactConnection?.publisher?.payoutsAccount;

  if (!data.user?.impactConnection?.connected || !account)
    return "INFORMATION_REQUIRED";
  if (account.holdReasons?.includes("IDV_CHECK_REQUIRED"))
    return "VERIFICATION:REQUIRED";
  if (account.holdReasons?.includes("IDV_CHECK_REQUIRED_INTERNAL"))
    return "VERIFICATION:INTERNAL";
  if (account.holdReasons?.includes("IDV_CHECK_REVIEW_INTERNAL"))
    return "VERIFICATION:REVIEW";
  if (account.holdReasons?.includes("IDV_CHECK_FAILED_INTERNAL"))
    return "VERIFICATION:FAILED";
  if (account.hold) return "HOLD";
  return "DONE";
}

export function usePayoutStatus(props: PayoutStatusAlert) {
  const { type } = getEnvironmentSDK();
  const { loading, data, errors, refetch } = useQuery<UserQuery>(
    GET_USER_STATUS,
    {}
  );
  const {
    render,
    loading: veriffLoading,
    errors: veriffErrors,
  } = useVeriffApp();
  const [status, setStatus] = useState<PayoutStatus | undefined>(undefined);

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

  return {
    states: {
      loading,
      veriffLoading,
      status,
      error: !!errors,
    },
    data: { type },
    text: props.getTextProps(),
    callbacks: {
      onTermsClick: () => window.open(props.termsUrl, "_blank").focus(),
      onClick: render,
    },
  };
}
