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
    resendSuccess: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const errorProps: PortalForgotPasswordViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    resendSuccess: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const loadingProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: true,
    resendSuccess: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const successProps: PortalForgotPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    resendSuccess: true,
  },
  callbacks: {
    submit: async (e) => await e,
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
