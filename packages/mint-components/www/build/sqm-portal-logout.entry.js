import { r as registerInstance } from './index-832bd454.js';
import { e as ae, b as dn, j as jn } from './index.module-b74a7f69.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import './extends-c31f1eff.js';

function usePortalLogout({ nextPage }) {
  ae(undefined);
  dn.push({ pathname: nextPage, search: "" });
}

let PortalLogout = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Next Page path
     */
    this.nextPage = "/";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    jn() ? useLogoutDemo(this) : usePortalLogout(this);
  }
};
function useLogoutDemo({}) { }

export { PortalLogout as sqm_portal_logout };
