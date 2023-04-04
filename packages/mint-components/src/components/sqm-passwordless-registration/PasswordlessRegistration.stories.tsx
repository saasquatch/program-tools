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
  content: {},
  // content: { pageLabel: "Share 50$ with your friend now!" },
};

export const Default = () => <PasswordlessRegistrationView {...defaultProps} />;

export const HasFirstNameLastName = () => (
  <PasswordlessRegistrationView
    {...defaultProps}
    {...{
      content: {
        includeName: true,
      },
    }}
  />
);

export const WithSlots = () => (
  <PasswordlessRegistrationView
    {...defaultProps}
    {...{
      content: {
        topSlot: <div>Hello this is the top slot</div>,
        bottomSlot: <div>Hello this is the bottom slot</div>,
      },
    }}
  />
);

export const HidePoweredBy = () => (
  <PasswordlessRegistrationView
    {...defaultProps}
    {...{
      content: {
        hidePoweredBy: true,
      },
    }}
  />
);
