import { useQuery } from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";
import accounting from "accounting";
import { gql } from "graphql-request";
import { DateTime } from "luxon";
import { DetailsCardViewProps } from "./sqp-details-card-view";
import { PaypalAccountDetails } from "./sqp-paypal-details";
import { ScheduleCardView } from "./sqp-schedule-card-view";
const NEXT_PAYOUT_QUERY = gql`
  query userPaymentPreview {
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

export function usePayPalDetails(props: PaypalAccountDetails) {
  const { data: nextPayoutData, loading } = useQuery(NEXT_PAYOUT_QUERY, {});

  console.log({ nextPayoutData });

  const buckets = nextPayoutData?.userPaymentPreview?.buckets;

  const nextPayout = buckets?.[0];

  const mainCurrencyBucket = nextPayout?.details?.totals?.find(
    (total) => total.currencyCode === "USD"
  );

  const mainCurrency = {
    currencyText: mainCurrencyBucket?.currencyCode,
    amountText: accounting.formatMoney(mainCurrencyBucket?.value),
  };

  const otherCurrencies = nextPayout?.details?.totals
    ?.filter((total) => total.currencyCode !== "USD")
    .map((total) => ({
      currencyText: total?.currencyCode,
      amountText: accounting.formatMoney(total?.value),
    }));

  console.log({ nextPayout, otherCurrencies });

  const w9Pending = nextPayoutData?.userPaymentPreview?.W9?.totals?.map(
    (total) => ({
      currencyText: total?.currencyCode,
      amountText: accounting.formatMoney(total?.value),
    })
  );

  const detailsProps: DetailsCardViewProps = {
    loading,
    mainCurrency,
    // TODO: figure out where this comes from
    status: "upcoming",

    statusBadgeText: props.overviewContent.upcomingPaymentLabel,
    detailedStatusText: nextPayout?.date
      ? DateTime.fromMillis(nextPayout?.date).toFormat("LLL dd, yyyy")
      : "-",
    otherCurrenciesText: props.overviewContent.otherCurrenciesLabel,
    w9PendingText: props.overviewContent.w9TaxLabel,
    otherCurrencies,
    w9Pending,
  };

  return {
    loading,
    detailsProps,
    ScheduleContent: buckets?.map((bucket, i) => {
      console.log({ bucket });
      const mainCurrencyTotal = bucket.details?.totals?.find(
        (total) => total.currencyCode === "USD"
      );

      const mainCurrency = {
        currencyText: mainCurrencyTotal?.currencyCode,
        amountText: accounting.formatMoney(mainCurrencyTotal?.value),
      };

      console.log({ bucket, mainCurrencyTotal });

      const otherCurrencies = bucket?.details?.totals
        ?.filter((total) => total.currencyCode !== "USD")
        .map((total) => ({
          currencyText: total?.currencyCode,
          amountText: accounting.formatMoney(total?.value),
        }));

      const hasOtherCurrencies = otherCurrencies.length > 0;

      const viewProps = {
        active: i === 0,
        otherCurrencies: hasOtherCurrencies,
        loading,
        statusText: DateTime.fromMillis(bucket?.date).toFormat("LLL dd, yyyy"),
        otherCurrenciesText: hasOtherCurrencies
          ? `${otherCurrencies.length} ${props.overviewContent.otherCurrenciesLabel}`
          : "",
        mainCurrency,
      };
      return <ScheduleCardView {...viewProps} />;
    }),
  };
}
