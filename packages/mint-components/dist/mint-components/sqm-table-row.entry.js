import { r as registerInstance, h, j as Host } from './index-832bd454.js';

let TableRow = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.border = "1px solid #EAEAEA";
  }
  render() {
    return (h(Host, { style: { display: "contents" } }, h("tr", { style: { border: this.border } }, h("slot", null))));
  }
};

export { TableRow as sqm_table_row };
