import { h } from "@stencil/core";
import {
  PortalVerifyEmailView,
  PortalVerifyEmailViewProps,
} from "../components/sqm-portal-verify-email/sqm-portal-verify-email-view";
import scenario from "../components/sqm-portal-verify-email/sqm-portal-verify-email.feature";

export default {
  title: "Portal Verify Email",
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
};

export const EmailVerificationWithError = () => (
  <PortalVerifyEmailView {...errorProps} />
);

export const EmailVerificationSuccess = () => (
  <PortalVerifyEmailView {...verifiedProps} />
);
