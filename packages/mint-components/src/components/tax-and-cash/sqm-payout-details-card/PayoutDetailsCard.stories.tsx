import { h } from "@stencil/core";
import { PayoutDetailsCardView, PayoutDetailsCardViewProps } from "./sqm-payout-details-card";

export default {
    title: "Components/Payout Details Card",
  };
  
  const defaultProps: PayoutDetailsCardViewProps = {
    loading: false,
    empty: false,
    otherCurrencies: false,
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
    w9Pending: undefined,
    hasDatePending: true,
    hasW9Pending: false,
  };
  
  const currencyList = [
    { amountText: "15.92", currencyText: "CAD" },
    { amountText: "12.92", currencyText: "EUR" },
    { amountText: "10.92", currencyText: "GBP" },
    { amountText: "10.92", currencyText: "AED" },
  ];
  
  export const Upcoming = () => {
    return <PayoutDetailsCardView {...defaultProps} />;
  };

  export const Loading = () => {
    return <PayoutDetailsCardView {...{ ...defaultProps, loading: true }} />;
  };
  
  export const Empty = () => {
    return <PayoutDetailsCardView {...{ ...defaultProps, empty: true }} />;
  };
  
  export const NextPayout = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          status: "next payout",
        }}
      />
    );
  };
  
  export const Pending = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          status: "pending",
        }}
      />
    );
  };
  
  export const OtherCurrencies = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          otherCurrencies: currencyList,
        }}
      />
    );
  };
  
  export const W9OnlyPending = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          status: "pending",
          hasDatePending: false,
          hasW9Pending: true,
          w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
        }}
      />
    );
  };
  
  export const DateOnlyPending = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          status: "pending",
          hasDatePending: true,
          hasW9Pending: false,
          otherCurrencies: currencyList,
          w9Pending: undefined,
        }}
      />
    );
  };
  
  export const CombinedPending = () => {
    return (
      <PayoutDetailsCardView
        {...{
          ...defaultProps,
          status: "pending",
          hasDatePending: true,
          hasW9Pending: true,
          w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
        }}
      />
    );
  };
  