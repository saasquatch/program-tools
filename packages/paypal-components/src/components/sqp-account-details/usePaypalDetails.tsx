import { useQuery } from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import accounting from "accounting";
import { gql } from "graphql-request";
import { DateTime } from "luxon";
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
        }
        baseUnitBalances {
          baseUnit
          balances {
            currencyCode
            value
          }
        }
      }
      W9 {
        totals {
          currencyCode
          value
        }
        baseUnitBalances {
          baseUnit
          balances {
            currencyCode
            value
          }
        }
      }
      buckets {
        date
        details {
          totals {
            currencyCode
            value
          }
          baseUnitBalances {
            baseUnit
            balances {
              currencyCode
              value
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
      amountText: accounting.formatMoney(total?.value),
    })),
  };
}

function getPendingData(pendingTotals) {
  const mainPendingCurrencyTotal = pendingTotals?.find(
    (total) => total.currencyCode === "USD"
  );
  const mainPendingCurrency = {
    currencyText: mainPendingCurrencyTotal?.currencyCode,
    amountText: accounting.formatMoney(mainPendingCurrencyTotal?.value),
  };

  const pendingOtherCurrencies = pendingTotals
    ?.filter((total) => total.currencyCode !== "USD")
    .map((total) => ({
      currencyText: total?.currencyCode,
      amountText: accounting.formatMoney(total?.value),
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
    const symbol = (0)
      .toLocaleString("en", {
        style: "currency",
        currency: total?.currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
    return {
      currencyText: total?.currencyCode,
      amountText: accounting.formatMoney(total?.value, {
        symbol,
      }),
    };
  });

  const mainCurrencyBucket = nextPayout?.details?.totals?.find(
    (total) => total.currencyCode === "USD"
  );

  const mainCurrency = {
    currencyText: mainCurrencyBucket?.currencyCode,
    amountText: accounting.formatMoney(mainCurrencyBucket?.value),
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

  const pendingProps = {
    empty:
      !mainPendingCurrencyTotal?.value &&
      !pendingOtherCurrencies?.reduce((agg, total) => agg + total.value, 0),
    active: selectedPayout === -1,
    loading,
    status: "pending" as "pending",
    statusText: "Pending",
    statusBadgeText: "Pending",
    detailedStatusText: "Pending",
    otherCurrencies: pendingOtherCurrencies?.length
      ? pendingOtherCurrencies
      : undefined,
    otherCurrenciesText: props.otherCurrenciesLabel,
    mainCurrency: mainPendingCurrency,
    setActivePayout: () => setSelectedPayout(-1),
    w9PendingText: props.w9TaxLabel,
    w9Pending,
  };

  const detailsProps: DetailsCardViewProps = {
    loading,
    mainCurrency,
    status: selectedPayout === 0 ? "next payout" : "upcoming",
    statusBadgeText:
      selectedPayout === 0 ? props.nextPayoutLabel : props.upcomingPaymentLabel,
    detailedStatusText: nextPayout?.date
      ? DateTime.fromMillis(nextPayout?.date).toFormat("LLL dd, yyyy")
      : "-",
    otherCurrenciesText: props.otherCurrenciesLabel,
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
        amountText: accounting.formatMoney(mainCurrencyTotal?.value),
      };

      const otherCurrencies = bucket?.details?.totals
        ?.filter((total) => total.currencyCode !== "USD")
        .map((total) => ({
          currencyText: total?.currencyCode,
          amountText: accounting.formatMoney(total?.value),
        }));

      const hasOtherCurrencies = otherCurrencies.length > 0;

      const viewProps = {
        active: i === selectedPayout,
        otherCurrencies: hasOtherCurrencies,
        loading,
        statusText: DateTime.fromMillis(bucket?.date).toFormat("LLL dd, yyyy"),
        otherCurrenciesText: hasOtherCurrencies
          ? `${otherCurrencies.length} ${props.otherCurrenciesLabel}`
          : "",
        mainCurrency,
        setActivePayout: () => setSelectedPayout(i),
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
