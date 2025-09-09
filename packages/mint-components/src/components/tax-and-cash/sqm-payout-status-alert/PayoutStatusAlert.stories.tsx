import { h } from "@stencil/core";

export default {
  title: "Components/Payout Status Alert",
};

const defaultProps = {
  error: false,
  status: "INFORMATION_REQUIRED" as const,
  loading: false,
  veriffLoading: false,
};

export const InformationRequired = () => (
  <sqm-payout-status-alert
    demoData={{ states: defaultProps }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentity = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "VERIFICATION:REQUIRED" } }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentityRequiredInternal = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "VERIFICATION:INTERNAL" } }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentityReviewInternal = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "VERIFICATION:REVIEW" } }}
  ></sqm-payout-status-alert>
);

export const VerifyIdentityFailedInternal = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "VERIFICATION:FAILED" } }}
  ></sqm-payout-status-alert>
);

export const W9ThresholdReached = () => (
  <sqm-payout-status-alert
    demoData={{ states: { ...defaultProps, status: "OVER_W9_THRESHOLD" } }}
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
