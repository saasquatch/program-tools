import { h } from "@stencil/core";
import {
  CashVerifyEmailView,
  CashVerifyEmailViewProps,
} from "./sqm-cash-verify-email-view";

export default {
  title: "Components/Cash Email Verification",
};

const defaultCallbacks = {
  submit: async (e) => await e,
};

const defaultStates = {
  error: "",
  loading: false,
  success: false,
  verified: false,
  email: "text@example.com",
  codeSent: false,
};

export const Default = () => (
  <sqm-cash-verify-email demoData={{ states: defaultStates }}>
    <div style={{ width: "300px", height: "300px", border: "1px dotted gray" }}>
      No Access
    </div>
  </sqm-cash-verify-email>
);

export const CodeSentToEmail = () => (
  <sqm-cash-verify-email
    demoData={{
      states: {
        ...defaultStates,
        codeSent: true,
      },
    }}
  >
    <div style={{ width: "300px", height: "300px", border: "1px dotted gray" }}>
      No Acess
    </div>
  </sqm-cash-verify-email>
);

export const Verified = () => (
  <sqm-cash-verify-email
    demoData={{
      states: {
        ...defaultStates,
        verified: true,
      },
    }}
  >
    <div style={{ width: "300px", height: "300px", border: "1px dotted gray" }}>
      I HAVE ACCESS!!!!!
    </div>
  </sqm-cash-verify-email>
);
