import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let ReferralTableDateColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Date Column Title
     */
    this.columnTitle = "Date Converted";
    /**
     * @uiName Date Displayed
     * @uiType string
     * @uiEnum ["dateConverted",
     * "dateReferralStarted",
     * "dateFraudChecksCompleted",
     * "dateModerated",
     * "dateModified",
     * "dateReferralEnded",
     * "dateReferralPaid",
     * "dateUserModified"]
     */
    this.dateShown = "dateConverted";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    // TODO - Validate `dateShown` against a set of known values
    console.log("date column - referral", { locale });
    return (h$1("sqm-referral-table-date-cell", { date: data[this.dateShown], locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.dateShown, this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { ReferralTableDateColumn as sqm_referral_table_date_column };
