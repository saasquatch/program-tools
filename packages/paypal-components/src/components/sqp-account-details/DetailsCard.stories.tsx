import { h } from "@stencil/core";
import { P } from "../../global/mixins";
import { DetailsCardView, DetailsCardViewProps } from "./sqp-details-card-view";

export default {
  title: "Components/Detail Card",
  // parameters: {
  //   scenario,
  // },
};

const defaultProps: DetailsCardViewProps = {
  loading: false,
  empty: false,
  mainCurrency: { currencyText: "USD", amountText: "100.00" },
  status: "upcoming",
  pendingStatusBadgeText: "Pending",
  upcomingStatusBadgeText: "Upcoming",
  nextPayoutStatusBadgeText: "Next payout",
  pendingDetailedStatusText: "Check rewards table for available date",
  upcomingDetailedStatusText: "November 1, 2022",
  nextPayoutDetailedStatusText: "November 1, 2022",
  otherCurrenciesText: "other currencies",
  w9PendingText: "Awaiting W-9 tax form",
};

const currencyList = [
  { amountText: "15.92", currencyText: "CAD" },
  { amountText: "12.92", currencyText: "EUR" },
  { amountText: "10.92", currencyText: "GBP" },
  { amountText: "10.92", currencyText: "AED" },
];

export const Upcoming = () => {
  return <DetailsCardView {...defaultProps} />;
};

export const Loading = () => {
  return <DetailsCardView {...{ ...defaultProps, loading: true }} />;
};

export const Empty = () => {
  return <DetailsCardView {...{ ...defaultProps, empty: true }} />;
};

export const NextPayout = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "next payout",
      }}
    />
  );
};

export const Pending = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "pending",
      }}
    />
  );
};

export const OtherCurrencies = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        otherCurrencies: currencyList,
      }}
    />
  );
};

export const W9Pending = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "pending",
        w9Pending: { amountText: "15.92", currencyText: "USD" },
      }}
    />
  );
};

export const W9AndOtherCurrencies = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "pending",
        w9Pending: { amountText: "15.92", currencyText: "USD" },
        otherCurrencies: currencyList,
      }}
    />
  );
};

export const W9OnlyPending = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "pending",
        w9Pending: { amountText: "15.92", currencyText: "USD" },
      }}
    />
  );
};
