import { h } from "@stencil/core";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "../components/portal-verify-email/sqm-portal-verify-email-view";

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
    submit: async (e) => await e,
  },
};

const errorProps: PortalVerifyEmailViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    verified: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const loadingProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: true,
    verified: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const resendProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const verifiedProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: true,
  },
  callbacks: {
    submit: async (e) => await e,
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
