import { r as registerInstance, h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let ReferralTableStatusCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const style = {
      Badge: {
        "&::part(base)": {
          fontSize: "var(--sl-font-size-small)",
          padding: "4px 8px",
        },
      },
    };
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    return (h("div", null, h("style", { type: "text/css" }, styleString), h("sl-badge", { pill: true, type: this.converted ? "success" : "warning", class: sheet.classes.Badge }, this.statusText)));
  }
};

export { ReferralTableStatusCell as sqm_referral_table_status_cell };
