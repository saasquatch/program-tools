import { h } from "@stencil/core";
import {
  PortalForgotPasswordView,
  PortalForgotPasswordViewProps,
} from "../components/portal-forgot-password/sqm-portal-forgot-password-view";

export default {
  title: "Portal Forgot Password",
};

const defaultProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Test Message",
  },
};

const errorProps: PortalForgotPasswordViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Test Message",
  },
};

const loadingProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: true,
    success: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Test Message",
  },
};

const successProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    success: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Test Message",
  },
};

export const Default = () => <PortalForgotPasswordView {...defaultProps} />;

export const ForgotPasswordWithError = () => (
  <PortalForgotPasswordView {...errorProps} />
);

export const ForgotPasswordLoading = () => (
  <PortalForgotPasswordView {...loadingProps} />
);

// Currently does not show any success message to the user
export const ForgotPasswordSuccess = () => (
  <PortalForgotPasswordView {...successProps} />
);
