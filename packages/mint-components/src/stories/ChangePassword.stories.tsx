import { h } from "@stencil/core";
import { PortalChangePasswordView } from "../components/sqm-portal-change-password/sqm-portal-change-password-view";

export default {
  title: "Change Password",
};

const defaultProps = {
  states: { open: false, error: "" },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const openProps = {
  states: { open: true, error: "" },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

const errorProps = {
  states: { open: true, error: "Something went wrong. Please try again." },
  callbacks: {
    setOpen: (o) => console.log(o),
    submit: (e) => console.log("Submit", e),
  },
};

export const Default = () => <PortalChangePasswordView {...defaultProps} />;
export const Open = () => <PortalChangePasswordView {...openProps} />;
export const Error = () => <PortalChangePasswordView {...errorProps} />;
