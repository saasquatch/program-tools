import { h } from "@stencil/core";

export default {
  title: "Components/Widget Code Verification",
};

const defaultProps = {
  email: "testemail@example.com",
  loading: false,
  verifyFailed: false,
  emailResent: false,
};

export const Default = () => (
  <sqm-code-verification
    demoData={{ states: defaultProps }}
  ></sqm-code-verification>
);

export const Loading = () => (
  <sqm-code-verification
    demoData={{
      states: {
        ...defaultProps,
        loading: true,
      },
    }}
  ></sqm-code-verification>
);

export const CodeResent = () => (
  <sqm-code-verification
    demoData={{
      states: {
        ...defaultProps,
        emailResent: true,
      },
    }}
  ></sqm-code-verification>
);

export const VerificationFailed = () => (
  <sqm-code-verification
    demoData={{
      states: {
        ...defaultProps,
        verifyFailed: true,
      },
    }}
  ></sqm-code-verification>
);
