import { h } from "@stencil/core";
import { PortalChangePasswordView } from "../components/sqm-portal-change-password/sqm-portal-change-password-view";
import scenario from "../components/sqm-portal-change-password/sqm-portal-change-password.feature";

export default {
  title: "Change Password",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  states: { open: false, loading: false, success: false, error: "" },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const openProps = {
  states: { open: true, loading: false, success: false, error: "" },
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
