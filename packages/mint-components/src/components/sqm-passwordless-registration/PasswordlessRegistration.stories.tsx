import { h } from "@stencil/core";
import {
  PasswordlessRegistrationView,
  PasswordlessRegistrationViewProps,
} from "./sqm-passwordless-registration-view";

export default {
  title: "Components/Passwordless Registration",
};

const defaultProps: PasswordlessRegistrationViewProps = {
  states: {
    error: "",
    loading: false,
  },
  callbacks: {
    submit: async (e) => await e,
  },
  content: { pageLabel: "Share 50$ with your friend now!" },
};

export const Default = () => <PasswordlessRegistrationView {...defaultProps} />;
