import { r as registerInstance, h, j as Host } from './index-832bd454.js';

let SqmRoute = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
  }
  disconnectedCallback() { }
  render() {
    return h(Host, { style: { display: "contents" } });
  }
};

export { SqmRoute as sqm_route };
