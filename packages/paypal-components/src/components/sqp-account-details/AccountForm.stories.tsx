import { h } from "@stencil/core";
import { AccountFormView } from "./sqp-account-form-view";

export default {
  title: "Components/PayPal Account Form",
  // parameters: {
  //   scenario,
  // },
};

const content = {
  modalConnectPayPalAccountHeader: "Connect PayPal account",
  cancelText: "Cancel",
  connectPayPalAccountButtonText: "Connect account",
  submitPayPalAccountButtonText: "Connect account",
  payPalEmailLabel: "PayPal email",
  payPalEmailLabelHelpText: "Enter the email used for your PayPal account.",
  confirmPayPalEmailLabel: "Confirm email",
  successMessage: "Success!",
  payPalAccountHeaderText: "PayPal account",
  connectPayPalDescriptionText:
    "Connect your PayPal account to automatically receive payments/cash rewards.",
};

const defaultProps = {
  hasAccount: false,
  states: {
    open: false,
    loading: false,
    success: false,
    error: "",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const openProps = {
  hasAccount: false,
  states: {
    open: true,
    loading: false,
    success: false,
    error: "",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const errorProps = {
  hasAccount: false,
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Network error. Please try again.",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const emailErrorProps = {
  hasAccount: false,
  states: {
    open: true,
    loading: false,
    success: false,
    error: "Emails do not match.",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const loadingProps = {
  hasAccount: false,
  states: {
    open: true,
    loading: true,
    success: false,
    error: "",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const successProps = {
  hasAccount: false,
  states: {
    open: true,
    loading: false,
    success: true,
    error: "",
  },
  formContent: {
    ...content,
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

export const Default = () => <AccountFormView {...defaultProps} />;
export const Open = () => <AccountFormView {...openProps} />;
export const Error = () => <AccountFormView {...errorProps} />;
export const EmailError = () => <AccountFormView {...emailErrorProps} />;
export const Loading = () => <AccountFormView {...loadingProps} />;
export const Success = () => <AccountFormView {...successProps} />;
