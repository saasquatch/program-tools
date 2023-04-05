import { h } from "@stencil/core";
import {
  EmailRegistrationView,
  EmailRegistrationViewProps,
} from "./email-registration-view";
// import scenario from "./ShareCode.feature";

export default {
  title: "Components/Email Registration",
  parameters: {
    // scenario,
  },
};
const defaultProps: EmailRegistrationViewProps = {
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

export const Default = () => <EmailRegistrationView {...defaultProps} />;

export const HasFirstNameLastName = () => (
  <EmailRegistrationView
    {...defaultProps}
    {...{
      content: {
        includeName: true,
      },
    }}
  />
);

export const WithSlots = () => (
  <EmailRegistrationView
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
  <EmailRegistrationView
    {...defaultProps}
    {...{
      content: {
        hidePoweredBy: true,
      },
    }}
  />
);
