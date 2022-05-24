import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { i as ie, K as Ke, b as dn, j as jn } from './index.module-b74a7f69.js';
import { m as useState, i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { P as PortalVerifyEmailView } from './sqm-portal-verify-email-view-f40aa0a5.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';
import './JSS-f59933eb.js';
import './sqm-text-span-view-6c68cc9a.js';

function usePortalVerifyEmail({ nextPage, failedPage }) {
  var _a, _b, _c, _d, _e;
  const [verified, setVerified] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);
  const userIdent = ie();
  const [request, { loading, data, errors }] = Ke();
  const [error, setError] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  const nextPageOverride = urlParams.get("nextPage");
  urlParams.delete("oobCode");
  const failed = () => {
    return dn.push({
      pathname: failedPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };
  const gotoNextPage = () => {
    urlParams.delete("nextPage");
    return dn.push({
      pathname: nextPageOverride || nextPage,
      search: urlParams.toString() && "?" + urlParams.toString(),
    });
  };
  const submit = async () => {
    if (oobCode) {
      setError("");
      await request({ oobCode });
    }
  };
  useEffect(() => {
    var _a;
    if ((_a = data === null || data === void 0 ? void 0 : data.verifyManagedIdentityEmail) === null || _a === void 0 ? void 0 : _a.success) {
      setVerified(true);
    }
  }, [(_a = data === null || data === void 0 ? void 0 : data.verifyManagedIdentityEmail) === null || _a === void 0 ? void 0 : _a.success]);
  useEffect(() => {
    submit();
  }, []);
  useEffect(() => {
    var _a, _b;
    if ((_a = userIdent === null || userIdent === void 0 ? void 0 : userIdent.managedIdentity) === null || _a === void 0 ? void 0 : _a.emailVerified) {
      setDisableContinue(false);
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    }
    else if (!oobCode ||
      ((_b = data === null || data === void 0 ? void 0 : data.verifyManagedIdentityEmail) === null || _b === void 0 ? void 0 : _b.success) === false) {
      setDisableContinue(false);
    }
    else if (!userIdent) {
      setDisableContinue(false);
      setTimeout(() => {
        gotoNextPage();
      }, 3000);
    }
  }, [(_b = userIdent === null || userIdent === void 0 ? void 0 : userIdent.managedIdentity) === null || _b === void 0 ? void 0 : _b.emailVerified]);
  useEffect(() => {
    if (errors === null || errors === void 0 ? void 0 : errors.message) {
      setError("Network request failed.");
    }
  }, [errors]);
  return {
    states: {
      loading: loading || disableContinue,
      error: ((_e = (_d = (_c = errors === null || errors === void 0 ? void 0 : errors.response) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.message) || error,
      verified,
    },
    data: {
      oobCode,
    },
    callbacks: {
      failed,
      gotoNextPage,
    },
  };
}

let PortalVerifyEmail = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * The page that users are redirected to when the verification succeeds.
     *
     * @uiName Next page path
     */
    this.nextPage = "/";
    /**
     * The page that users are redirected to if verification fails due to outdated verification attempt.
     *
     * @uiName Failed page redirection path
     */
    this.failedPage = "/";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states, data, callbacks } = jn()
      ? usePortalVerifyEmailDemo(this)
      : usePortalVerifyEmail(this);
    return (h$1(PortalVerifyEmailView, { states: states, data: data, callbacks: callbacks }));
  }
};
function usePortalVerifyEmailDemo(props) {
  return cjs({
    states: { error: "", loading: false, verified: true },
    data: {
      oobCode: "code",
    },
    callbacks: {
      failed: () => {
        console.log("failed");
      },
      gotoNextPage: () => { },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalVerifyEmail as sqm_portal_verify_email };
