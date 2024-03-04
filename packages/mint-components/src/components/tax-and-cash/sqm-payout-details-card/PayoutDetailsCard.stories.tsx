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

// ZH: Will most likeley not need these states anymore.

// const currencyList = [
//   { amountText: "15.92", currencyText: "CAD" },
//   { amountText: "12.92", currencyText: "EUR" },
//   { amountText: "10.92", currencyText: "GBP" },
//   { amountText: "10.92", currencyText: "AED" },
// ];

// export const Pending = () => {
//   return (
//     <sqm-payout-details-card
//       demoData={{
//         states: {
//           status: "pending",
//         },
//       }}
//     ></sqm-payout-details-card>
//   );
// };

// export const W9OnlyPending = () => {
//   return (
//     <sqm-payout-details-card
//       demoData={{
//         states: {
//           status: "pending",
//           hasDatePending: false,
//           hasW9Pending: true,
//           w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
//         },
//       }}
//     ></sqm-payout-details-card>
//   );
// };

// export const OtherCurrencies = () => {
//   return (
//     <sqm-payout-details-card
//       demoData={{
//         states: {
//           otherCurrencies: currencyList,
//         },
//       }}
//     ></sqm-payout-details-card>
//   );
// };

// export const DateOnlyPending = () => {
//   return (
//     <sqm-payout-details-card
//       demoData={{
//         states: {
//           status: "pending",
//           hasDatePending: true,
//           hasW9Pending: false,
//           otherCurrencies: currencyList,
//           w9Pending: undefined,
//         },
//       }}
//     ></sqm-payout-details-card>
//   );
// };

// export const CombinedPending = () => {
//   return (
//     <sqm-payout-details-card
//       demoData={{
//         states: {
//           status: "pending",
//           hasDatePending: true,
//           hasW9Pending: true,
//           w9Pending: [{ amountText: "15.92", currencyText: "USD" }],
//         },
//       }}
//     ></sqm-payout-details-card>
//   );
// };
