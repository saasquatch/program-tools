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
    isVerified: false,
    loadingVerification: false,
    countdown: 10,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
    verificationStatusMessage: "{countdown} seconds till verification refresh",
    verificationLoadingMessage: "Checking verification",
  },
};

const errorProps: PortalEmailVerificationViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
    isVerified: false,
    loadingVerification: false,
    countdown: 10,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
    verificationStatusMessage: "{countdown} seconds till verification refresh",
    verificationLoadingMessage: "Checking verification",
  },
};

const loadingProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: true,
    success: false,
    isVerified: false,
    loadingVerification: false,
    countdown: 10,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
    verificationStatusMessage: "{countdown} seconds till verification refresh",
    verificationLoadingMessage: "Checking verification",
  },
};

const successProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: false,
    success: true,
    isVerified: true,
    loadingVerification: false,
    countdown: 10,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
    verificationStatusMessage: "{countdown} seconds till verification refresh",
    verificationLoadingMessage: "Checking verification",
  },
};

const loadingVerificationProps: PortalEmailVerificationViewProps = {
  states: {
    error: "",
    loading: true,
    success: false,
    isVerified: false,
    loadingVerification: true,
    countdown: 10,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    email: "email@example.com",
    verifyMessage:
      "A verification email was sent to {email}. Please verify your email to continue to the portal.",
    emailVerificationHeader: "Verify your email",
    resendEmailButtonText: "Re-send Email",
    verificationStatusMessage: "{countdown} seconds till verification refresh",
    verificationLoadingMessage: "Checking verification",
  },
};

export const Default = () => <PortalEmailVerificationView {...defaultProps} />;

export const EmailVerificationWithError = () => (
  <PortalEmailVerificationView {...errorProps} />
);

export const EmailVerificationLoading = () => (
  <PortalEmailVerificationView {...loadingProps} />
);

export const EmailVerificationCheckingVerification = () => (
  <PortalEmailVerificationView {...loadingVerificationProps} />
);

export const EmailVerificationSuccess = () => (
  <PortalEmailVerificationView {...successProps} />
);
