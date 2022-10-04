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

const defaultCallbacks = {
  submit: async (e) => await e,
};

const defaultContent = {
  email: "email@example.com",
  verifyMessage:
    "A verification email was sent to {email}. Please verify your email to continue to the portal.",
  emailVerificationHeader: "Verify your email",
  resendEmailButtonText: "Re-send Email",
  verificationStatusMessage: "{countdown} seconds till verification refresh",
  verificationLoadingMessage: "Checking verification",
};

const defaultStates = {
  error: "",
  loading: false,
  success: false,
  isVerified: false,
  loadingVerification: false,
  countdown: 10,
};

const defaultProps: PortalEmailVerificationViewProps = {
  states: defaultStates,
  callbacks: defaultCallbacks,
  content: defaultContent,
};

const errorProps: PortalEmailVerificationViewProps = {
  states: {
    ...defaultStates,
    error: "Something went wrong. Please try again.",
  },
  callbacks: defaultCallbacks,
  content: defaultContent,
};

const loadingProps: PortalEmailVerificationViewProps = {
  states: {
    ...defaultStates,
    loading: true,
  },
  callbacks: defaultCallbacks,
  content: defaultContent,
};

const successProps: PortalEmailVerificationViewProps = {
  states: {
    ...defaultStates,
    success: true,
    isVerified: true,
  },
  callbacks: defaultCallbacks,
  content: defaultContent,
};

const loadingVerificationProps: PortalEmailVerificationViewProps = {
  states: {
    ...defaultStates,
    loadingVerification: true,
  },
  callbacks: defaultCallbacks,
  content: defaultContent,
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
