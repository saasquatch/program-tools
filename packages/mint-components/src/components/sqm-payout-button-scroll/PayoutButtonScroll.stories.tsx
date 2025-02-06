import { h } from "@stencil/core";

export default {
  title: "Components/Payout Scroll Button",
};

const defaultProps = {
  payoutSettingsComplete: true,
};

export const CompletedTaxForm = () => (
  <sqm-payout-button-scroll
    demoData={{ states: { ...defaultProps, payoutSettingsComplete: true } }}
  ></sqm-payout-button-scroll>
);

export const CompletedTaxFormWithStatsContainer = () => (
  <sqm-portal-container
    display="flex"
    maxWidth="100%"
    minWidth="100%"
    justify-content="space-between"
    flexWrap="nowrap"
  >
    <sqm-portal-container display="flex" max-width="fit-content">
      <sqm-big-stat
        flex-reverse="true"
        alignment="left"
        stat-type="/referralsCount"
      >
        <p>Referrals</p>
      </sqm-big-stat>
      <sqm-big-stat
        flex-reverse="true"
        alignment="left"
        stat-type="/payoutBalance"
      >
        <p>Cash Balance</p>
      </sqm-big-stat>
    </sqm-portal-container>

    <sqm-payout-button-scroll
      demoData={{ states: { ...defaultProps, payoutSettingsComplete: true } }}
    ></sqm-payout-button-scroll>
  </sqm-portal-container>
);
