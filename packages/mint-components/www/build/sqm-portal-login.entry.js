import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { E as Ee, c as jsonpointer, b as dn, j as jn } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { P as PortalLoginView } from './sqm-portal-login-view-dd89ca61.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalLogin(props) {
  var _a, _b, _c, _d;
  const [request, { loading, errors, data }] = Ee();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const nextPageOverride = urlParams.get("nextPage");
  const submit = async (event) => {
    setError("");
    let formData = event.detail.formData;
    formData === null || formData === void 0 ? void 0 : formData.forEach((value, key) => {
      jsonpointer.set(formData, key, value);
    });
    const variables = { email: formData.email, password: formData.password };
    await request(variables);
  };
  useEffect(() => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.authenticateManagedIdentityWithEmailAndPassword) === null || _a === void 0 ? void 0 : _a.token) {
      urlParams.delete("nextPage");
      dn.push({
        pathname: nextPageOverride || props.nextPage,
        search: urlParams.toString() && "?" + urlParams.toString(),
      });
    }
  }, [(_a = data === null || data === void 0 ? void 0 : data.authenticateManagedIdentityWithEmailAndPassword) === null || _a === void 0 ? void 0 : _a.token]);
  useEffect(() => {
    var _a;
    if ((errors === null || errors === void 0 ? void 0 : errors.message) || ((_a = errors === null || errors === void 0 ? void 0 : errors.response) === null || _a === void 0 ? void 0 : _a["error"])) {
      setError("Network request failed.");
    }
  }, [errors]);
  const errorMessage = ((_d = (_c = (_b = errors === null || errors === void 0 ? void 0 : errors.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.message) || error;
  return {
    states: {
      loading,
      error: errorMessage,
      registerPath: props.registerPath,
      forgotPasswordPath: props.forgotPasswordPath
    },
    callbacks: {
      submit,
    },
  };
}

let PortalLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Page navigated to after sign-in
     */
    this.nextPage = "/";
    /**
     * @uiName Label for email field
     */
    this.emailLabel = "Email";
    /**
     * @uiName Label for password field
     */
    this.passwordLabel = "Password";
    /**
     * @uiName Label for submit button
     */
    this.submitLabel = "Sign In";
    /**
     * @uiName Label for forgotten password button
     */
    this.forgotPasswordLabel = "Forgot Password?";
    /**
     * @uiName Label for register navigation button
     */
    this.registerLabel = "Register";
    /**
     * @uiName Heading label
     */
    this.pageLabel = "Sign in to your account";
    /**
     * @uiName Register button redirection path
     */
    this.registerPath = "/register";
    /**
     * @uiName Forgot password button redirect path
     */
    this.forgotPasswordPath = "/forgotPassword";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, callbacks } = jn()
      ? useLoginDemo(this)
      : usePortalLogin(this);
    const content = {
      forgotPasswordButton: (h$1("slot", { name: "forgotPassword" }, h$1("a", { onClick: () => dn.push(states.forgotPasswordPath) }, this.forgotPasswordLabel))),
      secondaryButton: (h$1("slot", { name: "secondaryButton" }, h$1("sl-button", { type: "text", disabled: states.loading, onClick: () => dn.push(states.registerPath) }, this.registerLabel))),
      emailLabel: this.emailLabel,
      passwordLabel: this.passwordLabel,
      submitLabel: this.submitLabel,
      pageLabel: this.pageLabel,
    };
    return (h$1(PortalLoginView, { states: states, callbacks: callbacks, content: content }));
  }
};
function useLoginDemo(props) {
  return cjs({
    states: {
      error: "",
      loading: false,
      forgotPasswordPath: "/forgotPassword",
      registerPath: "/register",
    },
    callbacks: {
      submit: async (_event) => {
        console.log("submit");
      },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalLogin as sqm_portal_login };
