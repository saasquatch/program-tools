import { h } from "@stencil/core";
import {
  PortalEmailVerificationView,
  PortalEmailVerificationViewProps,
} from "../components/sqm-portal-email-verification/sqm-portal-email-verification-view";
import scenario from "../components/sqm-portal-email-verification/sqm-portal-email-verification.feature";

export default {
  title: "Portal Email Verification",
  parameters: {
    scenario,
  },
};

const defaultProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { email: "email@example.com" },
};

const errorProps: PortalEmailVerificationViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { email: "email@example.com" },
};

const loadingProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: true,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { email: "email@example.com" },
};

const successProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: false,
    success: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { email: "email@example.com" },
};

export const Default = () => <PortalEmailVerificationView {...defaultProps} />;

export const EmailVerificationWithError = () => (
  <PortalEmailVerificationView {...errorProps} />
);

export const EmailVerificationLoading = () => (
  <PortalEmailVerificationView {...loadingProps} />
);

export const EmailVerificationSuccess = () => (
  <PortalEmailVerificationView {...successProps} />
);
