import { h } from "@stencil/core";

export default {
  title: "Components/Payout Status Alert",
};

const defaultProps = {
  error: false,
  status: "INFORMATION_REQUIRED" as const,
  loading: false,
  showVerifyIdentity: false,
};

export const InformationRequired = () => (
  <sqm-payout-status-alert
    demoData={{ states: defaultProps }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentity = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "VERIFICATION_NEEDED" } }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentityOpen = () => (
  <sqm-payout-status-alert
    demoData={{
      states: {
        ...defaultProps,
        status: "VERIFICATION_NEEDED",
        showVerifyIdentity: true,
      },
    }}
  ></sqm-payout-status-alert>
);

export const Hold = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "HOLD" } }}
  ></sqm-payout-status-alert>
);

export const Loading = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, loading: true } }}
  ></sqm-payout-status-alert>
);

export const Error = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, error: true } }}
  ></sqm-payout-status-alert>
);
