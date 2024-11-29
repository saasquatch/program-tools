import { h } from "@stencil/core";

export default {
  title: "Components/Widget Email Verification",
};

export const Default = () => (
  <sqm-email-verification demoData={{}}></sqm-email-verification>
);

export const Loading = () => (
  <sqm-email-verification
    demoData={{ states: { error: "", loading: true } }}
  ></sqm-email-verification>
);

export const Error = () => (
  <sqm-email-verification
    demoData={{ states: { error: "ERROR", loading: false } }}
  ></sqm-email-verification>
);
