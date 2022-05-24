import { r as registerInstance } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { l as luxon } from './luxon-1decee23.js';
import { l as luxonLocale } from './utils-48175026.js';

let ReferralTableDateCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    this.locale = "en";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    var _a;
    const date = !this.date
      ? "-"
      : (_a = luxon.DateTime.fromMillis(this.date)) === null || _a === void 0 ? void 0 : _a.setLocale(luxonLocale(this.locale)).toLocaleString(luxon.DateTime.DATE_MED);
    return date;
  }
};

export { ReferralTableDateCell as sqm_referral_table_date_cell };
