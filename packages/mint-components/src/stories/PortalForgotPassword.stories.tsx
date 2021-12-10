import { h } from "@stencil/core";
import {
  PortalForgotPasswordView,
  PortalForgotPasswordViewProps,
} from "../components/sqm-portal-forgot-password/sqm-portal-forgot-password-view";
import scenario from "../components/sqm-portal-forgot-password/sqm-portal-forgot-password.feature";

export default {
  title: "Portal Forgot Password",
  parameters: {
    scenario,
  },
};

const defaultProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};

const errorProps: PortalForgotPasswordViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};

const loadingProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: true,
    success: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};

const successProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    success: true,
    loginPath: "/login",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: {
    secondaryButton: "Cancel",
    messageSlot: "Enter your email below to receive a password reset link.",
  },
};

export const Default = () => <PortalForgotPasswordView {...defaultProps} />;

export const ForgotPasswordWithError = () => (
  <PortalForgotPasswordView {...errorProps} />
);

export const ForgotPasswordLoading = () => (
  <PortalForgotPasswordView {...loadingProps} />
);

export const ForgotPasswordSuccess = () => (
  <PortalForgotPasswordView {...successProps} />
);
