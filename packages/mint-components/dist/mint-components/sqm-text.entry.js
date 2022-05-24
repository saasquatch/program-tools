import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { d as browser, n as h } from './stencil-hooks.module-f4b05383.js';
import { i as insertCSS } from './insertcss-d82cf6d6.js';

const debug = browser("sq:global");
const textStyles = `
  sqm-text {
    display: block;
  }

  sqm-text h1 {
    font-size: var(--sl-font-size-xx-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h2 {
    font-size: var(--sl-font-size-x-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h3 {
    font-size: var(--sl-font-size-large);
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text h4 {
    font-size: 13px;
    font-weight: 600;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text p {
    font-size: var(--sl-font-size-small);
    font-weight: 400;
    color: var(--sl-color-gray-800);
    margin: 0;
  }

  sqm-text p[light] {
    font-size: var(--sl-font-size-small);
    font-weight: 400;
    color: var(--sl-color-gray-600);
    margin: 0;
  }
`;
let Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  componentWillLoad() {
    try {
      insertCSS(textStyles);
    }
    catch (error) {
      debug(error);
    }
  }
  render() {
    return h$1("slot", null);
  }
};

export { Text as sqm_text };
