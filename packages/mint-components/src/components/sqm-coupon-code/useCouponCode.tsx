import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { intl } from "../../global/global";
import { CouponCodeViewProps } from "./sqm-coupon-code-view";

interface CouponCodeProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
  cancelledErrorText: string;
  expiredErrorText: string;
  fullfillmentErrorText: string;
  pendingErrorText: string;
  redeemedErrorText: string;
  genericErrorText: string;
  codeSyncErrorText: string;
  codeSyncErrorRetryText: string;
}

type PendingReasons =
  | "SCHEDULED"
  | "UNHANDLED_ERROR"
  | "US_TAX"
  | "SUSPECTED_FRAUD"
  | "MISSING_PAYOUT_CONFIGURATION"
  | "ERROR_SYNCING_FUEL_TANK_CODE";

type FuelTankReward = {
  fuelTankCode: string;
  fuelTankType: string;
  statuses: string;
  dateGiven: number;
  dateExpires: number;
  dateRedeemed: number;
  dateCancelled: number;
  dateScheduledFor: number;
  datePendingForUnhandledError: number;
  pendingReasons: PendingReasons[];
};

export type RewardStatusType =
  | "AVAILABLE"
  | "EXPIRED"
  | "REDEEMED"
  | "CANCELLED"
  | "PENDING"
  | "EMPTY_TANK"
  | "ERROR"
  | "ERROR_SYNCING_FUEL_TANK_CODE";

interface FuelTankRewardsQueryResult {
  user: {
    instantAccessRewards: {
      data: FuelTankReward[];
      totalCount: number;
      count: number;
    };
  };
}

const FuelTankRewardsQuery = gql`
  query fuelTankRewardsQuery($programId: ID!) {
    user: viewer {
      ... on User {
        instantAccessRewards(
          filter: { type_eq: FUELTANK, programId_eq: $programId }
        ) {
          data {
            fuelTankCode
            fuelTankType
            statuses
            dateGiven
            dateExpires
            dateRedeemed
            dateCancelled
            dateScheduledFor
            datePendingForUnhandledError
            pendingReasons
          }
          count
          totalCount
        }
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useCouponCode(props: CouponCodeProps): CouponCodeViewProps {
  const user = useUserIdentity();
  const programId = useProgramId();
  const engagementMedium = useEngagementMedium();

  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const [retried, setRetried] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const timerRef = useRef<NodeJS.Timer>(undefined);
  const countdownRef = useRef<NodeJS.Timer>(undefined);

  const { data, loading, refetch, errors } =
    useQuery<FuelTankRewardsQueryResult>(
      FuelTankRewardsQuery,
      { programId },
      !user?.jwt
    );

  async function checkReward() {
    const data = await refetch();
    setRetried(true);
    if (
      // @ts-ignore
      !data?.user?.instantAccessRewards?.data?.[0]?.pendingReasons?.includes(
        "ERROR_SYNCING_FUEL_TANK_CODE"
      )
    ) {
      return clearInterval(timerRef.current);
    }
  }

  const reward = data?.user?.instantAccessRewards?.data?.[0];

  const startTimer = (countdown: number = 61000) =>
    setInterval(checkReward, countdown);
  const startCountdown = (countdown: number) =>
    setInterval(() => setCountdown(countdown), 1000);

  // Refetch reward status timer
  useEffect(() => {
    if (
      !timerRef.current &&
      reward?.statuses?.includes("PENDING") &&
      reward?.pendingReasons?.includes("ERROR_SYNCING_FUEL_TANK_CODE")
    ) {
      timerRef.current = startTimer();
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (
      countdown > 0 &&
      reward?.statuses?.includes("PENDING") &&
      reward?.pendingReasons?.includes("ERROR_SYNCING_FUEL_TANK_CODE")
    ) {
      clearInterval(countdownRef.current);
      countdownRef.current = startCountdown(countdown - 1);
    }

    return () => {
      clearInterval(countdownRef.current);
    };
  }, [countdown, reward]);

  useEffect(() => {
    // Retry after a minute if the reward is pending and has an error syncing the fuel tank code
    if (
      reward?.statuses?.includes("PENDING") &&
      reward?.pendingReasons?.includes("ERROR_SYNCING_FUEL_TANK_CODE")
    ) {
      startTimer();
    }
  }, [reward]);

  const getStatus = (reward: FuelTankReward | undefined) => {
    if (!reward || !reward.statuses) return "ERROR";

    const state = reward.statuses[reward.statuses.length - 1];

    if (
      state === "PENDING" &&
      reward.pendingReasons.includes("ERROR_SYNCING_FUEL_TANK_CODE")
    )
      return "ERROR_SYNCING_FUEL_TANK_CODE";

    if (state === "PENDING" && reward.dateScheduledFor === null)
      return "EMPTY_TANK";

    return state;
  };

  const rewardStatus = getStatus(reward) as RewardStatusType;
  const dateAvailable =
    rewardStatus === "PENDING" && reward.dateScheduledFor
      ? new Date(reward.dateScheduledFor).toLocaleDateString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : undefined;

  const copyString = reward?.fuelTankCode || "...";

  const [open, setOpen] = useState(false);

  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium,
          shareMedium: "DIRECT",
        },
      },
    });
  }

  const getRewardStatusText = (status: RewardStatusType) => {
    switch (status) {
      case "CANCELLED":
        return props.cancelledErrorText;
      case "EXPIRED":
        return props.expiredErrorText;
      case "EMPTY_TANK":
        return props.fullfillmentErrorText;
      case "ERROR_SYNCING_FUEL_TANK_CODE":
        return retried
          ? intl.formatMessage(
              {
                id: "codeSyncErrorText",
                defaultMessage: props.codeSyncErrorText,
              },
              {
                supportEmail: "advocate-support@impact.com",
              }
            )
          : intl.formatMessage(
              {
                id: "codeSyncErrorText",
                defaultMessage: props.codeSyncErrorRetryText,
              },
              {
                supportEmail: "advocate-support@impact.com",
                timeRemaining: countdown,
              }
            );
      case "PENDING":
        return props.pendingErrorText.replace("{unpendDate}", dateAvailable);
      case "REDEEMED":
        return props.redeemedErrorText;
      case "AVAILABLE":
        return "";
      default:
        return props.genericErrorText;
    }
  };
  const getRewardStatusErrorType = (status: RewardStatusType) => {
    switch (status) {
      case "EXPIRED":
      case "EMPTY_TANK":
      case "CANCELLED":
      case "ERROR":
      case "ERROR_SYNCING_FUEL_TANK_CODE":
        return "warning";
      case "PENDING":
        return "info";
      case "REDEEMED":
        return "success";
      default:
        return;
    }
  };

  const errorText = getRewardStatusText(rewardStatus);
  const errorType = getRewardStatusErrorType(rewardStatus);
  const error = rewardStatus !== "AVAILABLE";

  return {
    ...props,
    onClick,
    open,
    copyString,
    error,
    errorText,
    dateAvailable,
    loading,
    errorType,
  };
}
