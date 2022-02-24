import { h } from "@stencil/core";
import { PortalChangePasswordView } from "./sqm-portal-change-password-view";
import scenario from "./sqm-portal-change-password.feature";

export default {
  title: "Components/Change Password",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  states: {
    open: false,
    loading: false,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const openProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const errorProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Network error. Please try again.",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const passwordErrorProps = {
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Passwords do not match.",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const loadingProps = {
  states: {
    open: true,
    loading: true,
    success: false,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const successProps = {
  states: {
    open: true,
    loading: false,
    success: true,
    error: "",
    content: {
      modalChangePasswordHeader: "Change Password",
      cancelText: "Cancel",
      changePasswordButtonText: "Change Password",
      passwordFieldLabel: "New Password",
      confirmPasswordFieldLabel: "Confirm new password",
      successMessage: "Your password has been updated.",
      portalChangePasswordHeader: "Password",
      portalChangePasswordButtonText: "Change your password...",
    },
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

export const Default = () => <PortalChangePasswordView {...defaultProps} />;
export const Open = () => <PortalChangePasswordView {...openProps} />;
export const Error = () => <PortalChangePasswordView {...errorProps} />;
export const PaswordError = () => (
  <PortalChangePasswordView {...passwordErrorProps} />
);
export const Loading = () => <PortalChangePasswordView {...loadingProps} />;
export const Success = () => <PortalChangePasswordView {...successProps} />;
