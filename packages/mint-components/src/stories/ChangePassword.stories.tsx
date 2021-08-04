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
    error: "Something went wrong. Please try again.",
  },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

export const Default = () => <PortalChangePasswordView {...defaultProps} />;
export const Open = () => <PortalChangePasswordView {...openProps} />;
export const Error = () => <PortalChangePasswordView {...errorProps} />;
