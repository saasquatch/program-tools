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

export const NextPayout = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          badgeStatus: "nextPayout",
        },
      }}
    ></sqm-payout-details-card>
  );
};

export const PayoutToday = () => {
  return (
    <sqm-payout-details-card
      demoData={{
        states: {
          badgeStatus: "payoutToday",
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
          badgeStatus: "thresholdPayout",
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

export const BadgeTextICUParsing = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <sqm-payout-details-card
        status-badge-text="{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} other {Failed} }"
        demoData={{ states: { badgeStatus: "nextPayout" } }}
      ></sqm-payout-details-card>
      <sqm-payout-details-card
        status-badge-text="{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} other {Failed} }"
        demoData={{ states: { badgeStatus: "payoutToday" } }}
      ></sqm-payout-details-card>
      <sqm-payout-details-card
        status-badge-text="{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} other {Failed} }"
        demoData={{ states: { badgeStatus: "error" } }}
      ></sqm-payout-details-card>
    </div>
  );
};