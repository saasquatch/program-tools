import { h } from "@stencil/core";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "./sqm-portal-verify-email-view";
import scenario from "./sqm-portal-verify-email.feature";

export default {
  title: "Components/Microsite Verify Email",
  parameters: {
    scenario,
  },
};

const errorProps: PortalVerifyEmailViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    verified: false,
  },
  data: {
    oobCode: "abc123",
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
  content: {
    verifyEmailText: "Verify your email",
    verifySuccessText:
      "Your email has been verified and you are being redirected. If you are not redirected, please click Continue.",
    verifyInvalidText:
      "The email verification code is invalid or has expired, please try again.",
  },
};

const verifiedProps: PortalVerifyEmailViewProps = {
  states: {
    error: "",
    loading: false,
    verified: true,
  },
  data: {
    oobCode: "abc123",
  },
  callbacks: {
    gotoNextPage: () => console.log("next page"),
    failed: () => console.log("failed"),
  },
  content: {},
};

export const EmailVerificationWithError = () => (
  <PortalVerifyEmailView {...errorProps} />
);

export const EmailVerificationSuccess = () => (
  <PortalVerifyEmailView {...verifiedProps} />
);
