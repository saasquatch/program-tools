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
    googleSubmit: async () => {},
    submit: async (e) => await e,
  },
  content: {
    pageLabel: "Sign in to your account",
  },
};

const errorProps: PortalLoginViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    googleSubmit: async () => {},
    submit: async (e) => await e,
  },
  content: {
    pageLabel: "Sign in to your account",
  },
};

const loadingProps: PortalLoginViewProps = {
  states: {
    error: "",
    loading: true,
    forgotPasswordPath: "/forgotPassword",
    registerPath: "/register",
  },
  callbacks: {
    googleSubmit: async () => {},
    submit: async (e) => await e,
  },
  content: {
    pageLabel: "Sign in to your account",
  },
};

const googleProps: PortalLoginViewProps = {
  ...defaultProps,
  content: {
    secondaryButton: (
      <span>
        Don't have an account?{" "}
        <sl-button style={{ width: "50px" }} size="large" type="text">
          Register
        </sl-button>
      </span>
    ),
    googleButton: <sl-button>Sign in with Google</sl-button>,
  },
};

export const Default = () => (
  <sqm-portal-login demoData={{ ...defaultProps }} />
);

export const Text = () => <PortalLoginView {...defaultProps} />;

export const IsGoogle = () => (
  <sqm-portal-login demoData={{ ...googleProps }} />
);

export const LoginWithError = () => (
  <sqm-portal-login demoData={{ ...errorProps }} />
);

export const LoginLoading = () => (
  <sqm-portal-login demoData={{ ...loadingProps }} />
);
