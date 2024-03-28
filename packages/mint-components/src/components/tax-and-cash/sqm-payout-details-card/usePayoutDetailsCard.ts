import { useParentQueryValue } from "@saasquatch/component-boilerplate";
import { DateTime } from "luxon";
import { intl } from "../../../global/global";
import { USER_QUERY_NAMESPACE, UserQuery } from "../sqm-tax-and-cash/data";
import { PayoutDetailsCard } from "./sqm-payout-details-card";
import { PayoutDetailsCardViewProps } from "./sqm-payout-details-card-view";

export function usePayoutDetailsCard(
  props: PayoutDetailsCard
): PayoutDetailsCardViewProps {
  const { data, loading } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const publisher = data?.user?.impactConnection?.publisher;

  function getPayoutDetailedStatusText(paymentDay) {
    const currentDay = DateTime.now().day;
    if (paymentDay === "1") {
      return currentDay === 1
        ? DateTime.now().toFormat("LLL dd, yyyy")
        : DateTime.now()
            .plus({ month: 1 })
            .startOf("month")
            .toFormat("LLL dd, yyyy");
    } else if (paymentDay === "15") {
      return currentDay <= 15
        ? DateTime.now()
            .plus({ day: 15 - currentDay })
            .toFormat("LLL dd, yyyy")
        : DateTime.now()
            .plus({ month: 1 })
            .startOf("month")
            .plus({ day: 14 })
            .toFormat("LLL dd, yyyy");
    } else {
      intl.formatMessage(
        {
          id: `nextPayoutBalance`,
          defaultMessage: props.thresholdPayoutText,
        },
        {
          thresholdBalance: publisher?.withdrawalSettings?.paymentThreshold,
        }
      );
    }
  }

  const paymentDay = getPayoutDetailedStatusText(
    publisher?.withdrawalSettings?.paymentDay
  );

  const isPayoutToday = DateTime.now().toFormat("LLL dd, yyyy") === paymentDay;

  return {
    states: {
      loading,
      thresholdBalance: `${publisher?.currency}${publisher?.withdrawalSettings?.paymentThreshold}`,
      balance: publisher?.payoutsAccount?.balance,
      badgeStatus:
        publisher?.withdrawalSettings?.paymentSchedulingType !== "FIXED_DAY"
          ? "thresholdPayout"
          : isPayoutToday
          ? "payoutToday"
          : "nextPayout",
      payoutType: publisher?.withdrawalSettings?.paymentMethod,
      error: publisher?.payoutsAccount?.hold,
      paypalEmailAddress: publisher?.withdrawalSettings?.paypalEmailAddress,
      cardNumberPreview: publisher?.withdrawalSettings?.bankAccountNumber,
      nextPayoutDate: paymentDay,
    },
    text: props.getTextProps(),
  };
}

export type UsePayoutDetailsCardResult = ReturnType<
  typeof usePayoutDetailsCard
>;
