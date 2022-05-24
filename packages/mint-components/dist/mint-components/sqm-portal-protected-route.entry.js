import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { i as ie, l as ln, b as dn, j as jn } from './index.module-b74a7f69.js';
import { i as useEffect, n as h } from './stencil-hooks.module-f4b05383.js';
import './extends-c31f1eff.js';

function usePortalProtectedRoute({ requireEmailVerification, redirectTo, redirectToUnverified, }) {
  var _a;
  const userIdent = ie();
  const authenticated = !!(userIdent === null || userIdent === void 0 ? void 0 : userIdent.jwt);
  const emailVerified = (_a = userIdent === null || userIdent === void 0 ? void 0 : userIdent.managedIdentity) === null || _a === void 0 ? void 0 : _a.emailVerified;
  const { pathname, search } = ln();
  const nextPageParam = new URLSearchParams();
  nextPageParam.append("nextPage", `${pathname}${search}`);
  useEffect(() => {
    if (!authenticated) {
      return dn.push({
        pathname: redirectTo,
        search: "?" + nextPageParam.toString(),
      });
    }
    if (requireEmailVerification && !emailVerified) {
      return dn.push({
        pathname: redirectToUnverified || redirectTo,
        search: "?" + nextPageParam.toString(),
      });
    }
  }, []);
  return !!userIdent;
}

let PortalProtectedRoute = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Redirect Path
     */
    this.redirectTo = "/";
    /**
     * @uiName Require Email Verification
     */
    this.requireEmailVerification = false;
    /**
     * @uiName Redirect unverified users path
     */
    this.redirectToUnverified = "/emailVerification";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const hasUser = jn()
      ? usePortalProtectedRouteDemo(this)
      : usePortalProtectedRoute(this);
    return (h$1(Host, { style: { display: hasUser ? "contents" : "none" } }, h$1("slot", null)));
  }
};
function usePortalProtectedRouteDemo({}) {
  return true;
}

export { PortalProtectedRoute as sqm_portal_protected_route };
