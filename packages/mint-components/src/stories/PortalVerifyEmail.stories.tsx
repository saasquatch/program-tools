import { h } from "@stencil/core";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "../components/sqm-portal-verify-email/sqm-portal-verify-email-view";

export default {
  title: "Portal Verify Email",
};

const defaultProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: false,
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const errorProps: PortalVerifyEmailViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    verified: false,
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const loadingProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: true,
    verified: false,
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const resendProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: false,
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const verifiedProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: true,
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

export const Default = () => <PortalVerifyEmailView {...defaultProps} />;

export const EmailVerificationWithError = () => (
  <PortalVerifyEmailView {...errorProps} />
);

export const EmailVerificationLoading = () => (
  <PortalVerifyEmailView {...loadingProps} />
);

export const EmailVerificationResent = () => (
  <PortalVerifyEmailView {...resendProps} />
);

// Currently does not show any success message to the user
export const EmailVerificationSuccess = () => (
  <PortalVerifyEmailView {...verifiedProps} />
);
