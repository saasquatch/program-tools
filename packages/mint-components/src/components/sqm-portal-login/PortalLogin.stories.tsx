import { h } from "@stencil/core";
import { PortalLoginView, PortalLoginViewProps } from "./sqm-portal-login-view";

export default {
  title: "Components/Microsite Login",
};

const defaultProps: PortalLoginViewProps = {
  states: {
    error: "",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" },
};

const errorProps: PortalLoginViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" },
};

const loadingProps: PortalLoginViewProps = {
  states: {
    error: "",
    loading: true,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Sign in to your account" },
};

export const Default = () => <PortalLoginView {...defaultProps} />;

export const LoginWithError = () => <PortalLoginView {...errorProps} />;

export const LoginLoading = () => <PortalLoginView {...loadingProps} />;
