import { h } from "@stencil/core";

export default {
  title: "Components/Widget Email Verification",
};

const defaultProps = {
  email: "",
  error: "",
  loading: false,
};

export const Default = () => (
  <sqm-email-verification demoData={{}}></sqm-email-verification>
);

export const Loading = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        loading: true,
      },
    }}
  ></sqm-email-verification>
);

export const Error = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        error: "Email is invalid",
      },
    }}
  ></sqm-email-verification>
);
