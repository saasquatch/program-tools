import { useQuery } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { DateTime } from "luxon";
import { intl } from "../../global/global";
import { DetailsCardViewProps } from "./sqp-details-card-view";
import { PaypalAccountDetails } from "./sqp-paypal-details";
import { ScheduleCardView } from "./sqp-schedule-card-view";
const NEXT_PAYOUT_QUERY = gql`
  query userPaymentPreview {
    tenantConfig {
      paused
      baseUnits
    }
    userPaymentPreview {
      pending {
        totals {
          currencyCode
          value
          prettyValue
        }
        baseUnitBalances {
          baseUnit
          balances {
            currencyCode
            value
            prettyValue
          }
        }
      }
      W9 {
        totals {
          currencyCode
          value
          prettyValue
        }
        baseUnitBalances {
          baseUnit
          balances {
            currencyCode
            value
            prettyValue
          }
        }
      }
      buckets {
        date
        details {
          totals {
            currencyCode
            value
            prettyValue
          }
          baseUnitBalances {
            baseUnit
            balances {
              currencyCode
              value
              prettyValue
            }
          }
        }
      }
    }
  }
`;

function getW9Data(w9Totals) {
  if (!w9Totals?.length) return {};
  return {
    w9Pending: w9Totals?.map((total) => ({
      currencyText: total?.currencyCode,
      amountText: total.prettyValue,
    })),
  };
}

function getPendingData(pendingTotals) {
  const mainPendingCurrencyTotal = pendingTotals?.find(
    (total) => total.currencyCode === "USD"
  );
  const mainPendingCurrency = {
    currencyText: mainPendingCurrencyTotal?.currencyCode,
    amountText: mainPendingCurrencyTotal?.prettyValue,
  };

  const pendingOtherCurrencies = pendingTotals
    ?.filter((total) => total.currencyCode !== "USD")
    .map((total) => ({
      currencyText: total?.currencyCode,
      amountText: total?.prettyValue,
    }));

  return {
    mainPendingCurrencyTotal,
    mainPendingCurrency,
    pendingOtherCurrencies,
  };
}

function getDetailsCardData(nextPayout) {
  const otherCurrencyTotals = nextPayout?.details?.totals?.filter(
    (total) => total.currencyCode !== "USD"
  );

  const otherCurrencies = otherCurrencyTotals?.map((total) => {
    return {
      currencyText: total?.currencyCode,
      amountText: total.prettyValue,
    };
  });

  const mainCurrencyBucket = nextPayout?.details?.totals?.find(
    (total) => total.currencyCode === "USD"
  );

  const mainCurrency = {
    currencyText: mainCurrencyBucket?.currencyCode,
    amountText: mainCurrencyBucket?.prettyValue,
  };

  return {
    otherCurrencyTotals,
    otherCurrencies,
    mainCurrencyBucket,
    mainCurrency,
  };
}

type Total = {
  currencyCode: string;
  value: number;
  prettyValue: string;
};

type Bucket = {
  date: number;
  totals: Total[];
  baseUnitBalances: {
    baseUnit: string;
    balances: Total[];
  };
};
//
type PayoutData = {
  tenantConfig: {
    paused: boolean;
  };
  userPaymentPreview: {
    buckets: { date: number; details: Bucket }[];
    W9: Bucket;
    pending: Bucket;
  };
};

export function usePayPalDetails(props: PaypalAccountDetails) {
  const {
    data: nextPayoutData,
    loading,
    errors,
  } = useQuery<PayoutData>(NEXT_PAYOUT_QUERY, {});

  const [selectedPayout, setSelectedPayout] = useState(0);

  const buckets = nextPayoutData?.userPaymentPreview?.buckets;
  const pendingTotals = nextPayoutData?.userPaymentPreview?.pending?.totals;
  const w9Totals = nextPayoutData?.userPaymentPreview?.W9?.totals;
  const nextPayout = buckets?.[selectedPayout];

  const { w9Pending } = getW9Data(w9Totals);
  const {
    mainPendingCurrency,
    pendingOtherCurrencies,
    mainPendingCurrencyTotal,
  } = getPendingData(pendingTotals);
  const {
    otherCurrencyTotals,
    otherCurrencies,
    mainCurrencyBucket,
    mainCurrency,
  } = getDetailsCardData(nextPayout);

  const empty =
    !mainCurrencyBucket?.value &&
    !otherCurrencyTotals?.reduce((agg, total) => agg + total.value, 0);

  const emptyPending =
    !mainPendingCurrencyTotal?.value &&
    !pendingOtherCurrencies?.reduce((agg, total) => agg + total.value, 0);

  const pendingProps = {
    active: selectedPayout === -1,
    loading,
    status: "pending" as "pending",
    statusText: props.pendingLabel,
    pendingStatusBadgeText: props.pendingLabel,
    upcomingStatusBadgeText: props.upcomingPaymentLabel,
    nextPayoutStatusBadgeText: props.nextPayoutLabel,
    pendingDetailedStatusText: props.pendingDetailedStatusText,
    upcomingDetailedStatusText: "",
    nextPayoutDetailedStatusText: "",
    otherCurrencies: pendingOtherCurrencies?.length
      ? pendingOtherCurrencies
      : undefined,
    otherCurrenciesText: intl.formatMessage(
      {
        id: "otherCurrencies",
        defaultMessage: props.otherCurrenciesLabel,
      },
      {
        amount: pendingOtherCurrencies?.length,
      }
    ),
    mainCurrency: mainPendingCurrency,
    setActivePayout: () => setSelectedPayout(-1),
    w9PendingText: props.w9TaxLabel,
    w9Pending,
    hasDatePending: !emptyPending,
    hasW9Pending: !!w9Pending,
    empty: emptyPending && !w9Pending,
  };

  const detailsProps: DetailsCardViewProps = {
    loading,
    mainCurrency,
    status: selectedPayout === 0 ? "next payout" : "upcoming",
    pendingStatusBadgeText: props.pendingLabel,
    upcomingStatusBadgeText: props.upcomingPaymentLabel,
    nextPayoutStatusBadgeText: props.nextPayoutLabel,
    pendingDetailedStatusText: props.pendingDetailedStatusText,
    nextPayoutDetailedStatusText: nextPayout?.date
      ? DateTime.fromMillis(nextPayout?.date).toFormat("LLL dd, yyyy")
      : "-",
    upcomingDetailedStatusText: nextPayout?.date
      ? DateTime.fromMillis(nextPayout?.date).toFormat("LLL dd, yyyy")
      : "-",
    otherCurrenciesText: intl.formatMessage(
      {
        id: "otherCurrencies",
        defaultMessage: props.otherCurrenciesLabel,
      },
      {
        amount: otherCurrencies?.length,
      }
    ),
    otherCurrencies: otherCurrencies?.length ? otherCurrencies : undefined,
    w9PendingText: props.w9TaxLabel,
    w9Pending: undefined,
    empty,
  };

  const upcomingContent =
    buckets?.map((bucket, i) => {
      const mainCurrencyTotal = bucket.details?.totals?.find(
        (total) => total.currencyCode === "USD"
      );

      const mainCurrency = {
        currencyText: mainCurrencyTotal?.currencyCode,
        amountText: mainCurrencyTotal?.prettyValue,
      };

      const otherCurrenciesTotals = bucket?.details?.totals?.filter(
        (total) => total.currencyCode !== "USD"
      );

      const otherCurrencies = otherCurrenciesTotals.map((total) => ({
        currencyText: total?.currencyCode,
        amountText: total.prettyValue,
      }));

      const hasOtherCurrencies = otherCurrencies.length > 0;

      const viewProps = {
        active: i === selectedPayout,
        otherCurrencies: hasOtherCurrencies,
        loading,
        statusText: DateTime.fromMillis(bucket?.date).toFormat("LLL dd, yyyy"),
        otherCurrenciesText: hasOtherCurrencies
          ? intl.formatMessage(
              {
                id: "otherCurrencies",
                defaultMessage: props.otherCurrenciesLabel,
              },
              {
                amount: otherCurrencies?.length,
              }
            )
          : "",
        mainCurrency,
        setActivePayout: () => setSelectedPayout(i),
        w9Pending,
        hasDatePending: !emptyPending,
        hasW9Pending: !!w9Pending,
        empty:
          !mainCurrencyTotal?.value &&
          !otherCurrenciesTotals?.reduce((agg, total) => agg + total.value, 0),
      };
      return <ScheduleCardView {...viewProps} />;
    }) || [];

  const pendingContent = <ScheduleCardView {...pendingProps} />;

  const integrationDisabled = !!errors;
  const integrationPaused = nextPayoutData?.tenantConfig?.paused;

  return {
    loading,
    detailsProps: selectedPayout === -1 ? pendingProps : detailsProps,
    integrationDisabled,
    integrationPaused,
    ScheduleContent: [upcomingContent, pendingContent],
  };
}
