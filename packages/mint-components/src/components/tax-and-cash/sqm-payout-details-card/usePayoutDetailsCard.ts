import { useEffect } from "@saasquatch/universal-hooks";
import { DateTime } from "luxon";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useSetParent } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { useLocale } from "@saasquatch/component-boilerplate";
import { PayoutDetailsCard } from "./sqm-payout-details-card";
import { PayoutDetailsCardViewProps } from "./sqm-payout-details-card-view";

function getExpiresSoon(submissionDate: number, expiryDate: number) {
  if (!submissionDate || !expiryDate) return false;
  return (
    DateTime.fromMillis(expiryDate).diff(
      DateTime.fromMillis(submissionDate),
      "days"
    )?.days <= 30
  );
}

export function usePayoutDetailsCard(
  props: PayoutDetailsCard
): PayoutDetailsCardViewProps {
  const setStep = useSetParent(TAX_CONTEXT_NAMESPACE);
  const [context, setContext] = useParent<TaxContext>(
    TAX_FORM_CONTEXT_NAMESPACE
  );

  const locale = useLocale();

  useEffect(() => {
    // Clear override context once on submitted
    setContext({});
  }, []);

  const { data, loading } =
    useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);

  const publisher = data?.user?.impactConnection?.publisher;
  const documentType = publisher?.currentTaxDocument?.type;
  const submissionDate = publisher?.currentTaxDocument?.dateCreated;

  console.log({ publisher });

  const dateSubmitted = submissionDate
    ? DateTime.fromMillis(submissionDate).toFormat("LLL dd, yyyy")
    : undefined;

  const expiryDate = DateTime.now().plus({ days: 30 }).toMillis();
  const dateExpired = DateTime.fromMillis(expiryDate).toFormat("LLL dd, yyyy");

  const expiresSoon = getExpiresSoon(expiryDate, submissionDate);

  function getPaymentDay(paymentDay) {
    if (paymentDay === "1") {
      return DateTime.now()
        .plus({ month: 1 })
        .startOf("month")
        .toFormat("LLL dd, yyyy");
    } else if (paymentDay === "15") {
      return DateTime.now()
        .plus({ month: 1 })
        .startOf("month")
        .toFormat("LLL dd, yyyy");
    }
  }

  const paymentDay = getPaymentDay(publisher?.withdrawalSettings?.paymentDay);
  //   publisher?.withdrawalSettings?.paymentDay;

  console.log({ paymentDay });

  function getStatus(publisher): "next payout" | "pending" | "upcoming" {
    return "next payout";
  }

  const status = getStatus(publisher);

  return {
    states: {
      loading: false,

      mainCurrency: {
        currencyText: publisher?.currency,
        amountText: publisher?.withdrawalSettings?.paymentThreshold,
      },
      status,
      payoutType: publisher?.withdrawalSettings?.paymentMethod,
      otherCurrencies: [],
      w9Pending: [],
      empty: false,
      hasW9Pending: false,
      hasDatePending: false,
      paypalEmailAddress: publisher?.withdrawalSettings?.paypalEmailAddress,
    },
    text: {
      ...props.getTextProps(),
      nextPayoutDetailedStatusText: paymentDay,
    },
  };
}

export type UsePayoutDetailsCardResult = ReturnType<
  typeof usePayoutDetailsCard
>;
