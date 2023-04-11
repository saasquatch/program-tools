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

export const Loading = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      states: {
        error: "",
        loading: true,
      },
    }}
  />
);

export const Error = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      states: {
        error: "Something went wrong. Please try again.",
        loading: false,
      },
    }}
  />
);

export const EmptyEmailError = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      states: {
        error: "Something went wrong. Please try again.",
        loading: false,
        registrationFormState: {
          validationErrors: { email: "Email cannot be empty" },
        },
      },
    }}
  />
);
