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
  mainCurrency: { currencyText: "USD", amountText: "100.00" },
  status: "upcoming",
  statusBadgeText: "Upcoming",
  detailedStatusText: "November 1, 2022",
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

export const NextPayout = () => {
  return (
    <DetailsCardView
      {...{
        ...defaultProps,
        status: "next payout",
        statusBadgeText: "Next Payout",
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
        statusBadgeText: "Pending",
        detailedStatusText: "Check rewards table for available date",
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
        statusBadgeText: "Pending",
        detailedStatusText: "Check rewards table for available date",
        w9Pending: currencyList,
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
        statusBadgeText: "Pending",
        detailedStatusText: "Check rewards table for available date",
        w9Pending: currencyList,
        otherCurrencies: currencyList,
      }}
    />
  );
};
