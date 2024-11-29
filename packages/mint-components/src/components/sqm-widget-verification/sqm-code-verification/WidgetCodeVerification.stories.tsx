import { h } from "@stencil/core";

export default {
  title: "Components/Widget Code Verification",
};

export const Default = () => (
  <sqm-code-verification demoData={{}}></sqm-code-verification>
);

export const Loading = () => (
  <sqm-sqm-code-verification
    demoData={{ states: { loading: true } }}
  ></sqm-sqm-code-verification>
);

export const VerificationFailed = () => (
  <sqm-sqm-code-verification
    demoData={{ states: { verifyFailed: true } }}
  ></sqm-sqm-code-verification>
);
