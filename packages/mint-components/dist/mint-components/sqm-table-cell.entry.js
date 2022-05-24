import { r as registerInstance, h, j as Host } from './index-832bd454.js';

let TableCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.colspan = 1;
    this.padding = "15px 10px";
  }
  render() {
    return (h(Host, { style: { display: "contents" } }, h("td", { colSpan: this.colspan, style: { padding: this.padding } }, h("slot", null))));
  }
};

export { TableCell as sqm_table_cell };
