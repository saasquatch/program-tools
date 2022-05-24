import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { P as PortalChangePasswordView } from './sqm-portal-change-password-view-0cd1cdf3.js';
import { g as $e, i as ie, c as jsonpointer, j as jn } from './index.module-b74a7f69.js';
import { c as cjs } from './cjs-e829b75b.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';
import './sqm-portal-container-view-79dfef65.js';
import './sqm-portal-section-view-5c942599.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalChangePassword(props) {
  var _a, _b, _c, _d;
  const [request, { loading, errors, data }] = $e();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const user = ie();
  const submit = async (event) => {
    var _a;
    setSuccess(false);
    const formData = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.formData;
    formData === null || formData === void 0 ? void 0 : formData.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    if (!(user === null || user === void 0 ? void 0 : user.jwt)) {
      setError("Please log in again to change your password.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const variables = {
      password: formData.password,
    };
    await request(variables);
  };
  useEffect(() => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.changeManagedIdentityPassword) === null || _a === void 0 ? void 0 : _a.success) {
      setSuccess(true);
    }
  }, [(_a = data === null || data === void 0 ? void 0 : data.changeManagedIdentityPassword) === null || _a === void 0 ? void 0 : _a.success]);
  return {
    states: {
      open,
      loading,
      success,
      error: error || ((_d = (_c = (_b = errors === null || errors === void 0 ? void 0 : errors.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message),
      content: {
        modalChangePasswordHeader: props.modalChangePasswordHeader,
        cancelText: props.cancelText,
        changePasswordButtonText: props.changePasswordButtonText,
        passwordFieldLabel: props.passwordFieldLabel,
        confirmPasswordFieldLabel: props.confirmPasswordFieldLabel,
        successMessage: props.successMessage,
        portalChangePasswordHeader: props.portalChangePasswordHeader,
        portalChangePasswordButtonText: props.portalChangePasswordButtonText,
      },
    },
    data: {},
    callbacks: {
      setOpen,
      submit,
    },
  };
}

let PortalChangePassword = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Change password modal header
     */
    this.modalChangePasswordHeader = "Change Password";
    /**
     * @uiName Modal cancel password change button text
     */
    this.cancelText = "Cancel";
    /**
     * @uiName Modal change password button text
     */
    this.changePasswordButtonText = "Change Password";
    /**
     * @uiName Password input field label
     */
    this.passwordFieldLabel = "New Password";
    /**
     * @uiName Password confirmation input field label
     */
    this.confirmPasswordFieldLabel = "Confirm New Password";
    /**
     * @uiName Successful password change message
     */
    this.successMessage = "Your password has been updated.";
    /**
     * @uiName Portal change password section header
     */
    this.portalChangePasswordHeader = "Password";
    /**
     * @uiName Portal change password button text
     */
    this.portalChangePasswordButtonText = "Change your password...";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks } = jn()
      ? usePortalChangePasswordDemo(this)
      : usePortalChangePassword(this);
    return h$1(PortalChangePasswordView, { states: states, callbacks: callbacks });
  }
};
function usePortalChangePasswordDemo(props) {
  return cjs({
    states: {
      open: true,
      error: "",
      content: {
        modalChangePasswordHeader: "Change Password",
        cancelText: "Cancel",
        changePasswordButtonText: "Change Password",
        passwordFieldLabel: "New Password",
        confirmPasswordFieldLabel: "Confirm new password",
        successMessage: "Your password has been updated.",
        portalChangePasswordHeader: "Password",
        portalChangePasswordButtonText: "Change your password...",
      },
    },
    callbacks: {
      setOpen: (o) => console.log(o),
      submit: (e) => console.log("Submit", e),
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalChangePassword as sqm_portal_change_password };
