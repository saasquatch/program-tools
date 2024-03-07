import { h } from "@stencil/core";

export default {
  title: "Components/Payout Details Card",
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

export const Error = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          error: true,
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const NextPayout = () => {
  return <sqm-payout-details-card></sqm-payout-details-card>;
};

export const PayoutToday = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          status: "payoutToday",
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const ThresholdPayout = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          thresholdBalance: "50 USD",
          status: "thresholdPayout",
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
          payoutType: "PAYPAL",
        },
      }}
    ></sqm-payout-details-card>
  );
};
