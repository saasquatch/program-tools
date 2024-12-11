import { h } from "@stencil/core";

export default {
  title: "Components/Payout Scroll Button",
};

const defaultProps = {
  payoutSettingsComplete: false,
};

export const Default = () => (
  <sqm-payout-button-scroll
    demoData={{ states: defaultProps }}
  ></sqm-payout-button-scroll>
);

export const CompletedTaxForm = () => (
  <sqm-payout-button-scroll
    demoData={{ states: { ...defaultProps, payoutSettingsComplete: true } }}
  ></sqm-payout-button-scroll>
);
