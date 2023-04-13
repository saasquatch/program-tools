import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useDomContext, useEffect } from "@saasquatch/stencil-hooks";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { CopyTextViewProps } from "../views/copy-text-view";

interface CouponCodeProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
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

interface FuelTankRewardsQueryResult {
  fuelTankRewardsQuery: {
    user: {
      instantAccessRewards: {
        data: FuelTankReward[];
        totalCount: number;
        count: number;
      };
    };
  };
}

const FuelTankRewardsQuery = gql`
  query fuelTankRewardsQuery {
    user: viewer {
      ... on User {
        instantAccessRewards(filter: { type_eq: FUELTANK }) {
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

  const { data, loading, refetch, errors } =
    useQuery<FuelTankRewardsQueryResult>(FuelTankRewardsQuery, {}, !user?.jwt);

  const getStatus = (reward: FuelTankReward | undefined) => {
    const possibleStates = [
      "REDEEMED",
      "CANCELLED",
      "EXPIRED",
      "PENDING",
      "AVAILABLE",
    ];

    if (reward.statuses.length === 1) return reward.statuses[0];

    return possibleStates.find(
      (state) => reward.statuses.includes(state) && state
    );
  };

  const reward =
    data?.fuelTankRewardsQuery?.user?.instantAccessRewards?.data?.[0];

  const rewardStatus = getStatus(reward);
  const copyString = reward?.fuelTankCode || "...";

  const [open, setOpen] = useState(false);

  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
  }

  return { ...props, onClick, open, copyString, rewardStatus };
}
