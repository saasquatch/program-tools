import { h } from "@stencil/core";

export default {
  title: "Components/Widget Email Verification",
};

const defaultProps = {
  email: "",
  error: false,
  loading: false,
  initialLoading: false,
  sendCodeError: false,
};

export const Default = () => (
  <sqm-email-verification demoData={{}}></sqm-email-verification>
);

export const EmailIsPrefilled = () => (
  <div>
    <sqm-text>
      <h4>Verify your email</h4>
    </sqm-text>
    <sqm-text>
      <sub>
        To get your cash paid out directly to your bank account, please complete
        your account setup
      </sub>
    </sqm-text>
    <sqm-email-verification
      demoData={{
        states: {
          ...defaultProps,
          email: "test@example.com",
        },
      }}
    ></sqm-email-verification>
  </div>
);

export const Loading = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        initialLoading: true,
      },
    }}
  ></sqm-email-verification>
);

export const SaveLoading = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        loading: true,
      },
    }}
  ></sqm-email-verification>
);

export const WithHeader = () => (
  <div>
    <sqm-text>
      <h4>Verify your email</h4>
    </sqm-text>
    <sqm-text>
      <sub>
        To get your cash paid out directly to your bank account, please complete
        your account setup
      </sub>
    </sqm-text>
    <sqm-email-verification
      demoData={{
        states: {
          ...defaultProps,
          email: "test@example.com",
        },
      }}
    ></sqm-email-verification>
  </div>
);

export const InvalidEmail = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        error: true,
      },
    }}
  ></sqm-email-verification>
);

export const SendCodeError = () => (
  <sqm-email-verification
    demoData={{
      states: {
        ...defaultProps,
        sendCodeError: true,
      },
    }}
  ></sqm-email-verification>
);
