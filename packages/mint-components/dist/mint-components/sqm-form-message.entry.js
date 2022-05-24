import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';

const sqmFormMessageCss = "sl-alert::part(base){border:1px solid;border-radius:3px;box-shadow:0 1px 2px rgba(20, 20, 20, 0.1)}.Error::part(base){background-color:var(--sl-color-danger-100);border-color:var(--sl-color-danger-200)}.Success::part(base){background-color:var(--sl-color-success-100);border-color:var(--sl-color-success-200)}.Info::part(base){background-color:var(--sl-color-primary-100);border-color:var(--sl-color-primary-200)}";

let FormMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    if (this.type === "error") {
      return (h$1("sl-alert", { exportparts: "base: erroralert-base, icon:erroralert-icon", class: "Error", type: "danger", open: true }, h$1("sl-icon", { slot: "icon", name: `${this.icon ? this.icon : "exclamation-octagon"}` }), h$1("slot", null)));
    }
    else if (this.type === "info") {
      return (h$1("sl-alert", { exportparts: "base: infoalert-base, icon:infoalert-icon", class: "Info", type: "primary", open: true }, h$1("sl-icon", { slot: "icon", name: `${this.icon ? this.icon : "info-circle"}` }), h$1("slot", null)));
    }
    else {
      return (h$1("sl-alert", { exportparts: "base: successalert-base, icon:successalert-icon", class: "Success", type: "success", open: true }, h$1("sl-icon", { slot: "icon", name: `${this.icon ? this.icon : "check2-circle"}` }), h$1("slot", null)));
    }
  }
};
FormMessage.style = sqmFormMessageCss;

export { FormMessage as sqm_form_message };
