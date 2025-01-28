import {
  getEnvironmentSDK,
  useMutation,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState, useEffect } from "@saasquatch/stencil-hooks";
import { UserQuery, GET_USER } from "../sqm-tax-and-cash/data";
import { PayoutStatusAlert } from "./sqm-payout-status-alert";
import { gql } from "graphql-request";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { useVeriffApp } from "../useVeriffApp";

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
  const { id, accountId } = useUserIdentity();
  const { type } = getEnvironmentSDK();
  const { loading, data, errors, refetch } = useQuery<UserQuery>(
    GET_USER_STATUS,
    {}
  );
  const {
    render,
    loading: veriffLoading,
    errors: veriffErrors,
  } = useVeriffApp({ onComplete: refetch });
  const [status, setStatus] = useState<PayoutStatus | undefined>(undefined);
  const [dialog, setDialog] = useState({ open: false, sessionUrl: null });

  useEffect(() => {
    if (!data) return;

    const s = getStatus(data);
    setStatus(s);
  }, [data]);

  useEffect(() => {
    const cb = () => refetch();
    window.addEventListener("sqm:tax-form-updated", cb);
    return () => window.removeEventListener("sqm:tax-form-updated", cb);
  }, []);

  return {
    states: {
      loading,
      veriffLoading,
      status,
      showVerifyIdentity: dialog.open,
      sessionUrl: dialog.sessionUrl,
      error: !!errors,
    },
    data: { type },
    text: props.getTextProps(),
    callbacks: {
      onTermsClick: () => window.open(props.termsUrl, "_blank").focus(),
      onClick: render,
      onCancel: () => setDialog({ open: false, sessionUrl: null }),
    },
  };
}
