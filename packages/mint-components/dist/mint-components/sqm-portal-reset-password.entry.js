import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { N as Ne, V as Ve, c as jsonpointer, b as dn, j as jn } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { P as PortalResetPasswordView } from './sqm-portal-reset-password-view-28ca5291.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalResetPassword(props) {
  var _a, _b, _c, _d, _e, _f;
  const [reset, setReset] = useState(false);
  const [error, setError] = useState("");
  const [verifyPasswordResetCode, verifyPasswordResetCodeState] = Ne();
  const [resetPassword, resetPasswordState] = Ve();
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  urlParams.delete("oobCode");
  const nextPageOverride = urlParams.get("nextPage");
  const submit = async (event) => {
    setError("");
    let formData = event.detail.formData;
    formData === null || formData === void 0 ? void 0 : formData.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { oobCode, password: formData.password };
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    await resetPassword(variables);
  };
  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    dn.push({
      pathname: nextPageOverride || props.nextPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };
  const failed = () => {
    dn.push({
      pathname: props.failedPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };
  useEffect(() => {
    var _a;
    if ((_a = resetPasswordState.data) === null || _a === void 0 ? void 0 : _a.resetManagedIdentityPassword) {
      setReset(true);
      setTimeout(() => {
        gotoNextPage();
      }, 5000);
    }
  }, [(_a = resetPasswordState.data) === null || _a === void 0 ? void 0 : _a.resetManagedIdentityPassword]);
  useEffect(() => {
    verifyPasswordResetCode({ oobCode });
  }, [oobCode]);
  useEffect(() => {
    var _a;
    if ((_a = verifyPasswordResetCodeState === null || verifyPasswordResetCodeState === void 0 ? void 0 : verifyPasswordResetCodeState.errors) === null || _a === void 0 ? void 0 : _a.message) {
      setError("Network request failed.");
    }
  }, [verifyPasswordResetCodeState === null || verifyPasswordResetCodeState === void 0 ? void 0 : verifyPasswordResetCodeState.errors]);
  return {
    states: {
      loading: resetPasswordState.loading,
      reset,
      confirmPassword: props.confirmPassword,
      error: ((_e = (_d = (_c = (_b = resetPasswordState.errors) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) || error,
      oobCodeValidating: verifyPasswordResetCodeState.loading,
      oobCodeValid: (_f = verifyPasswordResetCodeState.data) === null || _f === void 0 ? void 0 : _f.verifyManagedIdentityPasswordResetCode.success,
      content: {
        passwordResetHeader: props.passwordResetHeader,
        resetPasswordHeader: props.resetPasswordHeader,
        continueButtonText: props.continueButtonText,
        resetPasswordButtonText: props.resetPasswordButtonText,
        confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
        passwordFieldLabel: props.passwordFieldLabel,
      },
    },
    callbacks: { submit, failed, gotoNextPage },
  };
}

let PortalResetPassword = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * The page that users are redirected to when the password reset succeeds.
     *
     * @uiName Next page path
     */
    this.nextPage = "/";
    /**
     * The page that users are redirected to if the reset fails due to outdated password reset attempt.
     *
     * @uiName Failed page redirection path
     */
    this.failedPage = "/";
    /**
     * @uiName Show confirm password
     */
    this.confirmPassword = false;
    /**
     * @uiName Password reset header text
     */
    this.resetPasswordHeader = "Reset your password";
    /**
     * Displayed after a successful password reset
     *
     * @uiName Password reset header text
     */
    this.passwordResetHeader = "Password reset";
    /**
     * @uiName Password reset button text
     */
    this.resetPasswordButtonText = "Reset Password";
    /**
     * Displayed after a successful password reset
     *
     * @uiName Continue button text
     */
    this.continueButtonText = "Continue";
    /**
     * @uiName Confirm password field label
     */
    this.confirmPasswordFieldLabel = "Confirm Password";
    /**
     * @uiName Password field label
     */
    this.passwordFieldLabel = "New Password";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks } = jn()
      ? usePortalResetPasswordDemo(this)
      : usePortalResetPassword(this);
    return h$1(PortalResetPasswordView, { states: states, callbacks: callbacks });
  }
};
function usePortalResetPasswordDemo(props) {
  return cjs({
    states: {
      error: "",
      loading: false,
      reset: false,
      confirmPassword: true,
      oobCodeValidating: false,
      oobCodeValid: true,
      content: {
        passwordResetHeader: "Password reset",
        resetPasswordHeader: "Reset your password",
        continueButtonText: "Continue",
        resetPasswordButtonText: "Reset Password",
        confirmPasswordFieldLabel: "Confirm Password",
        passwordFieldLabel: "New Password",
      },
    },
    callbacks: {
      submit: async (_event) => {
        console.log("submit");
      },
      failed: () => { },
      gotoNextPage: () => { },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalResetPassword as sqm_portal_reset_password };
