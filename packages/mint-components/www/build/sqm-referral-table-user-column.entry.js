import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let ReferralTableUserColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName User Column Title
     */
    this.columnTitle = "Customer";
    /**
     * @uiName Name displayed for anonymous users
     */
    this.anonymousUser = "Anonymous User";
    /**
     * @uiName Name displayed for deleted users
     */
    this.deletedUser = "Deleted User";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data) {
    var _a, _b, _c, _d;
    let name;
    if (!(data === null || data === void 0 ? void 0 : data.referredUser)) {
      name = this.deletedUser;
    }
    else if (!((_a = data === null || data === void 0 ? void 0 : data.referredUser) === null || _a === void 0 ? void 0 : _a.firstName) &&
      !((_b = data === null || data === void 0 ? void 0 : data.referredUser) === null || _b === void 0 ? void 0 : _b.lastName)) {
      name = this.anonymousUser;
    }
    else {
      name = `${(_c = data === null || data === void 0 ? void 0 : data.referredUser) === null || _c === void 0 ? void 0 : _c.firstName} ${(_d = data === null || data === void 0 ? void 0 : data.referredUser) === null || _d === void 0 ? void 0 : _d.lastName}`;
    }
    return (h$1("sqm-referral-table-user-cell", { name: name }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([
      this.deletedUser,
      this.anonymousUser,
      this.columnTitle,
    ]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { ReferralTableUserColumn as sqm_referral_table_user_column };
