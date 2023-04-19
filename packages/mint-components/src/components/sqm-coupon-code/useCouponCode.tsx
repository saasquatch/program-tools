import {
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { CopyTextViewProps } from "../views/copy-text-view";

interface CouponCodeProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
  cancelledErrorText: string;
  pendingErrorText: string;
  expiredErrorText: string;
  redeemedErrorText: string;
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

export function useCouponCode(props: CouponCodeProps): CopyTextViewProps {
  const user = useUserIdentity();
  const programId = useProgramId();

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
  }

  const getRewardStatusText = (status: RewardStatusType) => {
    switch (status) {
      case "CANCELLED":
        return props.cancelledErrorText;
      case "PENDING":
        return `${props.pendingErrorText}${dateAvailable}`;
      case "EXPIRED":
        return props.expiredErrorText;
      case "REDEEMED":
        return props.redeemedErrorText;
      case "AVAILABLE":
        return "";
      case "EMPTY_TANK":
        // TODO: Replace
        return "An error happened, please contact customer support or try again later.";
      default:
        // TODO: Replace
        return "An error occurred, please contact customer support.";
    }
  };

  const errorText = getRewardStatusText(rewardStatus);
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
  };
}
