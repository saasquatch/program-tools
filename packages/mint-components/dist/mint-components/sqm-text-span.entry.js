import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  componentWillLoad() { }
  render() {
    return h$1(TextSpanView, { type: this.type }, this.text);
  }
};

export { Text as sqm_text_span };
