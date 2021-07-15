import { h } from "@stencil/core";
import {
  PortalResetPasswordView,
  PortalResetPasswordViewProps,
} from "../components/portal-reset-password/sqm-portal-reset-password-view";

export default {
  title: "Portal Reset Password",
};

const defaultProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const errorProps: PortalResetPasswordViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    reset: false,
    confirmPassword: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const loadingProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: true,
    reset: false,
    confirmPassword: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

const successProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
};

export const Default = () => <PortalResetPasswordView {...defaultProps} />;

export const ResetPasswordWithError = () => (
  <PortalResetPasswordView {...errorProps} />
);

export const ResetPasswordLoading = () => (
  <PortalResetPasswordView {...loadingProps} />
);

// Currently does not show any success message to the user
export const ResetPasswordSuccess = () => (
  <PortalResetPasswordView {...successProps} />
);
