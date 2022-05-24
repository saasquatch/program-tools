import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { j as jn } from './index.module-b74a7f69.js';
import { p as d, n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { N as NameFieldsView } from './sqm-name-fields-view-e7dad2ee.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

const CONTEXT_NAME = "sq:validation-state";
function useNameFields(props) {
  const validationState = d(CONTEXT_NAME);
  return {
    states: {
      validationErrors: validationState === null || validationState === void 0 ? void 0 : validationState.validationErrors,
      content: {
        lastNameLabel: props.lastNameLabel,
        firstNameLabel: props.firstNameLabel,
      },
    },
  };
}

let NameFields = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName First name field label
     */
    this.firstNameLabel = "First Name";
    /**
     * @uiName Last name field label
     */
    this.lastNameLabel = "Last Name";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const { states } = jn() ? useNameFieldsDemo(this) : useNameFields(this);
    return h$1(NameFieldsView, { states: states });
  }
};
function useNameFieldsDemo(props) {
  return cjs({
    states: {
      validationErrors: [],
      content: {
        firstNameLabel: "First Name",
        lastNameLabel: "Last Name",
      },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { NameFields as sqm_name_fields };
