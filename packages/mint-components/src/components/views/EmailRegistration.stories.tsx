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
  content: {
    invalidEmailErrorMessage: "Must be a valid email address",
    requiredFieldErrorMessage: "Cannot be empty",
    paddingTop: "large",
    paddingRight: "large",
    paddingBottom: "large",
    paddingLeft: "large",
    fraudErrorMessage:
      "Our team will review this referral. If approved, you and your friend will receive your rewards. Need help? Reach out to our Support team.",
    fraudErrorMessageTitle: "Looks like you tried referring yourself",
  },
};

export const Default = () => <EmailRegistrationView {...defaultProps} />;

export const HasFirstNameLastName = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      content: {
        ...defaultProps.content,
        includeName: true,
      },
    }}
  />
);

export const WithSlots = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      content: {
        ...defaultProps.content,
        topSlot: <div>Hello this is the top slot</div>,
        bottomSlot: <div>Hello this is the bottom slot</div>,
      },
    }}
  />
);

export const NoBorder = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      content: {
        ...defaultProps.content,
        hideBorder: true,
      },
    }}
  />
);

export const BackgroundColor = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      content: {
        ...defaultProps.content,
        backgroundColor: "aquamarine",
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

export const FraudError = () => (
  <EmailRegistrationView
    {...{
      ...defaultProps,
      states: {
        error: "FRAUD",
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
