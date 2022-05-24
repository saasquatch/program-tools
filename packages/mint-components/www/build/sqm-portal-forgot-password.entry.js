import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { Y as Ye, c as jsonpointer, j as jn, b as dn } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { P as PortalForgotPasswordView } from './sqm-portal-forgot-password-view-ab5384e4.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalForgotPassword(props) {
  var _a, _b, _c, _d;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [request, { loading, data, errors }] = Ye();
  const urlParams = new URLSearchParams(window.location.search);
  const nextPage = urlParams.get("nextPage");
  const submit = async (event) => {
    setError("");
    let formData = event.detail.formData;
    formData === null || formData === void 0 ? void 0 : formData.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const urlParams = nextPage ? { nextPage } : null;
    const redirectPath = props.redirectPath;
    const variables = { email: formData.email, urlParams, redirectPath };
    await request(variables);
  };
  useEffect(() => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.requestManagedIdentityPasswordResetEmail) === null || _a === void 0 ? void 0 : _a.success) {
      setSuccess(true);
    }
  }, [(_a = data === null || data === void 0 ? void 0 : data.requestManagedIdentityPasswordResetEmail) === null || _a === void 0 ? void 0 : _a.success]);
  useEffect(() => {
    if (errors === null || errors === void 0 ? void 0 : errors.message) {
      setError("Network request failed.");
    }
  }, [errors]);
  return {
    states: {
      loading,
      error: ((_d = (_c = (_b = errors === null || errors === void 0 ? void 0 : errors.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || error,
      success,
      loginPath: props.loginPath,
    },
    callbacks: {
      submit,
    },
  };
}

let PortalForgotPassword = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * The page that users are redirected to from the password reset email.
     *
     * @uiName Email redirection base path
     */
    this.redirectPath = "/resetPassword";
    /**
     * @uiName Email label
     */
    this.emailLabel = "Email";
    /**
     * @uiName Password reset button text
     */
    this.submitLabel = "Request Password Reset";
    /**
     * @uiName Routing path to login page
     */
    this.loginPath = "/login";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks } = jn()
      ? usePortalForgotPasswordDemo(this)
      : usePortalForgotPassword(this);
    const content = {
      secondaryButton: (h$1("slot", { name: "secondaryButton" }, h$1("sl-button", { type: "text", disabled: states.loading, onClick: () => dn.push(states.loginPath) }, "Sign In"))),
      messageSlot: (h$1("slot", { name: "messageSlot" }, "Enter your email below to receive a password reset link.")),
      emailLabel: this.emailLabel,
      submitLabel: this.submitLabel,
    };
    return (h$1(PortalForgotPasswordView, { states: states, callbacks: callbacks, content: content }));
  }
};
function usePortalForgotPasswordDemo(props) {
  return cjs({
    states: { error: "", loading: false, success: false },
    callbacks: {
      submit: async (_event) => { },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalForgotPassword as sqm_portal_forgot_password };
