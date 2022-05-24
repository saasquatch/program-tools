import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { r as rn, j as jn } from './index.module-b74a7f69.js';
import { P as PortalFrameView } from './sqm-portal-frame-view-631178f9.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

function usePortalFrame(footerContent, headerContent) {
  const [, rerender] = rn();
  return {
    data: {
      footer: footerContent,
      header: headerContent,
    },
    callbacks: {
      rerender,
    },
  };
}

let PortalFrame = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const footerContent = h$1("slot", { name: "footer" });
    const headerContent = h$1("slot", { name: "header" });
    const props = jn()
      ? usePortalFrameDemo(footerContent, headerContent, this)
      : usePortalFrame(footerContent, headerContent);
    return (h$1(PortalFrameView, Object.assign({}, props), h$1("slot", null)));
  }
};
function usePortalFrameDemo(footerContent, headerContent, props) {
  return cjs({
    data: {
      footer: footerContent ? (footerContent) : (h$1("span", null, "example@example.com")),
      header: headerContent ? (headerContent) : (h$1("div", { style: { display: "flex", flexDirection: "column" } }, h$1("span", { style: {
          fontSize: "var(--sl-font-size-large)",
          fontWeight: "bold",
        } }, "Portal Header"), h$1("span", { style: { fontSize: "var(--sl-font-size-small)" } }, "A description for the portal"))),
    },
    callbacks: {
      rerender: () => { },
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { PortalFrame as sqm_portal_frame };
