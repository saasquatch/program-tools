import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { l as luxon } from './luxon-1decee23.js';
import { l as luxonLocale } from './utils-48175026.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let RewardTableDateCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    this.locale = "en";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    var _a, _b;
    const date = !this.date
      ? "-"
      : (_b = (_a = luxon.DateTime.fromMillis(this.date)) === null || _a === void 0 ? void 0 : _a.setLocale(luxonLocale(this.locale))) === null || _b === void 0 ? void 0 : _b.toLocaleString(luxon.DateTime.DATE_MED);
    return h$1(TextSpanView, { type: "p" }, date);
  }
};

export { RewardTableDateCell as sqm_rewards_table_date_cell };
