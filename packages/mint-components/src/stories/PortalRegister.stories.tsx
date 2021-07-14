import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../components/portal-register/sqm-portal-register-view";

export default {
  title: "Portal Register",
};

const defaultProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
};

const errorProps: PortalRegisterViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
};

const loadingProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: true,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
  },
};

export const Default = () => <PortalRegisterView {...defaultProps} />;

export const RegisterWithError = () => <PortalRegisterView {...errorProps} />;

export const RegisterLoading = () => <PortalRegisterView {...loadingProps} />;
