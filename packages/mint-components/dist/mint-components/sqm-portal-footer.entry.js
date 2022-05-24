import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { P as PortalFooterView } from './sqm-portal-footer-view-ad47bb93.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';
import './global-b1f18590.js';
import './index.module-b74a7f69.js';
import './insertcss-d82cf6d6.js';

let PortalFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Support Email
     */
    this.supportEmail = "support@example.com";
    /**
     * @uiName Support Text
     */
    this.supportText = "For program support, contact {email}";
    /**
     * @uiName Show Powered By SaaSquatch
     */
    this.showPoweredBy = true;
    /**
     * @uiName Powered By Link
     */
    this.poweredByLink = "https://saasquatch.com";
    /**
     * @uiName Padding Top
     */
    this.paddingTop = "large";
    /**
     * @uiName Padding Right
     */
    this.paddingRight = "large";
    /**
     * @uiName Padding Bottom
     */
    this.paddingBottom = "large";
    /**
     * @uiName Padding Left
     */
    this.paddingLeft = "large";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return h$1(PortalFooterView, Object.assign({}, getProps(this)));
  }
  static get assetsDirs() { return ["../../assets"]; }
};

export { PortalFooter as sqm_portal_footer };
