import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let RewardTableDateColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Date Column Title
     */
    this.columnTitle = "Date received";
    /**
     * @uiName Date Displayed
     * @uiType string
     * @uiEnum ["dateGiven",
     * "dateExpires",
     * "dateCancelled",
     * "dateRedeemed",
     * "dateScheduledFor"]
     */
    this.dateShown = "dateGiven";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    const reward = data === null || data === void 0 ? void 0 : data[0];
    // TODO: dateShown validation?
    console.log("reward column - locale", { locale });
    return (h$1("sqm-rewards-table-date-cell", { date: reward[this.dateShown], locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.dateShown, this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { RewardTableDateColumn as sqm_rewards_table_date_column };
