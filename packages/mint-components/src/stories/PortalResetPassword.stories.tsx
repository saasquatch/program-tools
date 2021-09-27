import { h } from "@stencil/core";
import {
  PortalResetPasswordView,
  PortalResetPasswordViewProps,
} from "../components/sqm-portal-reset-password/sqm-portal-reset-password-view";
import scenario from "../components/sqm-portal-reset-password/sqm-portal-reset-password.feature";

export default {
  title: "Portal Reset Password",
  parameters: {
    scenario,
  },
};

const defaultProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const defaultPropsNoConfirm: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: false,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const errorProps: PortalResetPasswordViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const loadingProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: true,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const successProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: true,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: true,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

const validatingCodeProps: PortalResetPasswordViewProps = {
  states: {
    error: "",
    loading: false,
    reset: false,
    confirmPassword: true,
    oobCodeValidating: false,
    oobCodeValid: false,
    content: {
      passwordResetHeader: "Password reset",
      resetPasswordHeader: "Reset your password",
      continueButtonText: "Continue",
      resetPasswordButtonText: "Reset Password",
      confirmPasswordFieldLabel: "Confirm Password",
    },
  },
  callbacks: {
    submit: async (e) => await e,
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
};

export const Default = () => <PortalResetPasswordView {...defaultProps} />;

export const DefaultWithoutConfirmField = () => (
  <PortalResetPasswordView {...defaultPropsNoConfirm} />
);

export const ResetPasswordWithError = () => (
  <PortalResetPasswordView {...errorProps} />
);

export const ResetPasswordLoading = () => (
  <PortalResetPasswordView {...loadingProps} />
);

export const ResetPasswordSuccess = () => (
  <PortalResetPasswordView {...successProps} />
);

export const CodeValidating = () => (
  <PortalResetPasswordView {...validatingCodeProps} />
);
