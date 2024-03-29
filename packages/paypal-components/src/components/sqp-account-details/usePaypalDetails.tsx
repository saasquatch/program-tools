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

export type CurrencyValue = {
  currencyText: string;
  amountText: string;
  value: number;
};

function getCurrencies(totals: Total[]) {
  const currencies = totals?.reduce(
    (totals, total, i) => {
      if (i === 0)
        return {
          ...totals,
          mainCurrency: {
            currencyText: total.currencyCode,
            amountText: total.prettyValue,
            value: total.value,
          },
        };
      return {
        ...totals,
        otherCurrencies: [
          ...totals.otherCurrencies,
          {
            currencyText: total.currencyCode,
            amountText: total.prettyValue,
            value: total.value,
          },
        ],
      };
    },
    {
      mainCurrency: {} as CurrencyValue,
      otherCurrencies: [] as CurrencyValue[],
    }
  );
  return currencies;
}

function getW9Data(w9Totals?: Total[]) {
  if (!w9Totals?.length) return {};
  return {
    w9Pending: w9Totals?.map((total) => ({
      currencyText: total?.currencyCode,
      amountText: total.prettyValue,
    })),
  };
}

function getPendingData(pendingTotals?: Total[]) {
  const totals: Total[] | undefined =
    pendingTotals && Array.from(pendingTotals);

  const totalsSorted = totals?.sort((a, b) => b.value - a.value);

  const currencies = getCurrencies(totalsSorted!);

  return {
    mainPendingCurrency: currencies?.mainCurrency,
    pendingOtherCurrencies: currencies?.otherCurrencies,
  };
}

function getDetailsCardData(nextPayout?: { details: Bucket }) {
  const totals: Total[] | undefined =
    nextPayout?.details?.totals && Array.from(nextPayout?.details?.totals);

  const totalsSorted = totals?.sort((a, b) => b.value - a.value);

  const currencies = getCurrencies(totalsSorted!);

  return {
    otherCurrencies: currencies?.otherCurrencies,
    mainCurrency: currencies?.mainCurrency,
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
  const { mainPendingCurrency, pendingOtherCurrencies } =
    getPendingData(pendingTotals);
  const { otherCurrencies, mainCurrency } = getDetailsCardData(nextPayout);

  const empty =
    !mainCurrency?.value &&
    !otherCurrencies?.reduce((agg, total) => agg + total.value, 0);

  const emptyPending =
    !mainPendingCurrency?.value &&
    !pendingOtherCurrencies?.reduce((agg, total) => agg + total.value, 0);

  const pendingProps = {
    active: selectedPayout === -1,
    loading,
    status: "pending" as const,
    statusText: props.pendingLabel,
    pendingStatusBadgeText: props.pendingLabel,
    upcomingStatusBadgeText: props.upcomingPaymentLabel,
    nextPayoutStatusBadgeText: props.nextPayoutLabel,
    pendingDetailedStatusText: props.pendingDetailedStatusText,
    upcomingDetailedStatusText: "",
    nextPayoutDetailedStatusText: "",
    otherCurrencies: pendingOtherCurrencies?.length
      ? pendingOtherCurrencies
      : false,
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
    additionalW9Text: props.additionalW9Text,
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
    otherCurrencies: otherCurrencies?.length ? otherCurrencies : false,
    w9PendingText: props.w9TaxLabel,
    additionalW9Text: props.additionalW9Text,
    w9Pending: undefined,
    empty,
  };

  const upcomingContent =
    buckets?.map((bucket, i) => {
      const totals: Total[] | undefined =
        bucket?.details?.totals && Array.from(bucket?.details?.totals);

      const totalsSorted = totals?.sort((a, b) => b.value - a.value);
      const currencies = getCurrencies(totalsSorted!);

      const mainCurrency = currencies?.mainCurrency;
      const otherCurrencies = currencies?.otherCurrencies;

      const hasOtherCurrencies = otherCurrencies.length > 0;

      const viewProps = {
        active: i === selectedPayout,
        otherCurrencies: hasOtherCurrencies,
        additionalW9Text: props.additionalW9Text,
        loading,
        status:
          selectedPayout === 0
            ? ("next payout" as const)
            : ("upcoming" as const),
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
          !mainCurrency?.value &&
          !otherCurrencies?.reduce((agg, total) => agg + total.value, 0),
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
