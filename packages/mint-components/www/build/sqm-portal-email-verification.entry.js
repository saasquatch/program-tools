import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as nn, i as ie, j as jn } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { P as PortalEmailVerificationView } from './sqm-portal-email-verification-view-4a30b876.js';
import './extends-c31f1eff.js';
import './global-b1f18590.js';
import './insertcss-d82cf6d6.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalEmailVerification(props) {
  var _a, _b, _c, _d, _e;
  const [request, { loading, data, errors }] = nn();
  const userIdent = ie();
  const email = (_a = userIdent === null || userIdent === void 0 ? void 0 : userIdent.managedIdentity) === null || _a === void 0 ? void 0 : _a.email;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get("nextPage");
  const submit = async () => {
    if (!email)
      return;
    setError("");
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email, urlParams, redirectPath };
    await request(variables);
  };
  useEffect(() => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.requestManagedIdentityVerificationEmail) === null || _a === void 0 ? void 0 : _a.success) {
      setSuccess(true);
    }
  }, [(_b = data === null || data === void 0 ? void 0 : data.requestManagedIdentityVerificationEmail) === null || _b === void 0 ? void 0 : _b.success]);
  useEffect(() => {
    if (errors === null || errors === void 0 ? void 0 : errors.message) {
      setError("Network request failed.");
    }
  }, [errors]);
  return {
    states: {
      loading,
      error: ((_e = (_d = (_c = errors === null || errors === void 0 ? void 0 : errors.response) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) || error,
      success,
    },
    callbacks: {
      submit,
    },
    content: {
      email,
      verifyMessage: props.verifyMessage,
      emailVerificationHeader: props.emailVerificationHeader,
      resendEmailButtonText: props.resendEmailButtonText,
    },
  };
}

let PortalEmailVerification = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * The page that users are redirected to from the verification email.
     *
     * @uiName Email redirection base path
     */
    this.redirectPath = "/verifyEmail";
    /**
     * @uiName Email verification header text
     */
    this.emailVerificationHeader = "Verify your email";
    /**
     * @uiName Re-send email button text
     */
    this.resendEmailButtonText = "Re-send Email";
    /**
     * @uiName Email verification body text
     */
    this.verifyMessage = "A verification email was sent to {email}. Please verify your email to continue to the portal.";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks, content } = jn()
      ? usePortalEmailVerificationDemo(this)
      : usePortalEmailVerification(this);
    return (h$1(PortalEmailVerificationView, { states: states, callbacks: callbacks, content: content }));
  }
};
function usePortalEmailVerificationDemo(props) {
  return cjs({
    states: { error: "", loading: false, success: false },
    callbacks: {
      submit: async (_event) => { },
    },
    content: {
      email: "test@example.com",
      verifyMessage: "A verification email was sent to {email}. Please verify your email to continue to the portal.",
      emailVerificationHeader: "Verify your email",
      resendEmailButtonText: "Re-send Email",
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalEmailVerification as sqm_portal_email_verification };
