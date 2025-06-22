import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
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
  buttonType?: "primary" | "secondary" | "tertiary";
}

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
};

export type RewardStatusType =
  | "AVAILABLE"
  | "EXPIRED"
  | "REDEEMED"
  | "CANCELLED"
  | "PENDING"
  | "EMPTY_TANK"
  | "ERROR";

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

  const { data, loading, refetch, errors } =
    useQuery<FuelTankRewardsQueryResult>(
      FuelTankRewardsQuery,
      { programId },
      !user?.jwt
    );

  const getStatus = (reward: FuelTankReward | undefined) => {
    if (!reward || !reward.statuses) return "ERROR";

    const state = reward.statuses[reward.statuses.length - 1];

    if (state === "PENDING" && reward.dateScheduledFor === null)
      return "EMPTY_TANK";

    return state;
  };

  const reward = data?.user?.instantAccessRewards?.data?.[0];

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
    buttonType: props.buttonType || "primary",
  };
}
