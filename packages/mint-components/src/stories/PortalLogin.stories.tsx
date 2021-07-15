import { h } from "@stencil/core";
import {
  PortalLoginView,
  PortalLoginViewProps,
} from "../components/sqm-portal-login/sqm-portal-login-view";

export default {
  title: "Portal Login",
};

const defaultProps: PortalLoginViewProps = {
  states: {
    error: "",
    loading: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content:{}
};

const errorProps: PortalLoginViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content:{}
};

const loadingProps: PortalLoginViewProps = {
  states: {
    error: "",
    loading: true,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content:{}
};

export const Default = () => <PortalLoginView {...defaultProps} />;

export const LoginWithError = () => <PortalLoginView {...errorProps} />;

export const LoginLoading = () => <PortalLoginView {...loadingProps} />;
