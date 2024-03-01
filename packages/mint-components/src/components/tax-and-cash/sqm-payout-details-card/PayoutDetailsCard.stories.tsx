import { h } from "@stencil/core";

export default {
  title: "Components/Payout Details Card",
};

const currencyList = [
  { amountText: "15.92", currencyText: "CAD" },
  { amountText: "12.92", currencyText: "EUR" },
  { amountText: "10.92", currencyText: "GBP" },
  { amountText: "10.92", currencyText: "AED" },
];

export const Upcoming = () => {
  return <sqm-payout-details-card></sqm-payout-details-card>;
};

export const Loading = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          loading: true,
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const Empty = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          empty: true,
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const NextPayout = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "next payout",
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const Pending = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "pending",
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const OtherCurrencies = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          otherCurrencies: currencyList,
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const W9OnlyPending = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "pending",
          hasDatePending: false,
          hasW9Pending: true,
          w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const DateOnlyPending = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "pending",
          hasDatePending: true,
          hasW9Pending: false,
          otherCurrencies: currencyList,
          w9Pending: undefined,
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const CombinedPending = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "pending",
          hasDatePending: true,
          hasW9Pending: true,
          w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const PaypalPayout = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "next payout",
          payoutType: "PAYPAL",
        },
      }}
    ></sqm-payout-details-card>
  );
};
