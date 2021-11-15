import { h } from "@stencil/core";
import {
  PortalEmailVerificationView,
  PortalEmailVerificationViewProps,
} from "./sqm-portal-email-verification-view";
import scenario from "./sqm-portal-email-verification.feature";

export default {
  title: "Components/Portal Email Verification",
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
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
  },
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
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
  },
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
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
  },
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
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
  },
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
