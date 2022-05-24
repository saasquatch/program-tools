import { h, j as Host, r as registerInstance } from './index-832bd454.js';
import { d as dist, i as ie, a as sn, j as jn } from './index.module-b74a7f69.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';

function UserNameView(props) {
  return h(Host, null, props.loading ? props.loadingText : props.username);
}

const GET_USER_NAME = dist.gql `
  query getUserName {
    viewer {
      ... on User {
        firstName
        lastName
      }
    }
  }
`;
function useUserName(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const user = ie();
  const res = sn(GET_USER_NAME, {}, !(user === null || user === void 0 ? void 0 : user.jwt));
  const loading = res.loading;
  const username = ((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.viewer) === null || _b === void 0 ? void 0 : _b.firstName) || ((_d = (_c = res.data) === null || _c === void 0 ? void 0 : _c.viewer) === null || _d === void 0 ? void 0 : _d.lastName)
    ? `${(_f = (_e = res.data) === null || _e === void 0 ? void 0 : _e.viewer) === null || _f === void 0 ? void 0 : _f.firstName} ${(_h = (_g = res.data) === null || _g === void 0 ? void 0 : _g.viewer) === null || _h === void 0 ? void 0 : _h.lastName}`
    : props.fallback;
  return {
    loadingText: props.loadingText,
    loading,
    username,
  };
}

let UserName = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._ignored = true;
    /**
     * @uiName Fallback name for nameless users
     */
    this.fallback = "Anonymous User";
    /**
     * @uiName Loading text
     */
    this.loadingText = "...";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn() ? useUserNameDemo(this) : useUserName(this);
    return h(UserNameView, Object.assign({}, props));
  }
};
function useUserNameDemo(props) {
  return cjs({
    loading: false,
    loadingText: "...",
    username: "John Smith",
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { UserName as sqm_user_name };
