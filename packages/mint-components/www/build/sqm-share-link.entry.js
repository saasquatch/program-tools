import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h, m as useState } from './stencil-hooks.module-f4b05383.js';
import { j as jn } from './index.module-b74a7f69.js';
import { S as ShareLinkView } from './sqm-share-link-view-9a6d536e.js';
import { u as useShareLink } from './useShareLink-5d7ea339.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

const DEFAULT_TOOLTIP_LIFESPAN = 1000;
let ShareLink = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * This is shown after someone has successfully copied the link to the clipboard.
     *
     * @uiName Tooltip text
     */
    this.tooltiptext = "Copied to Clipboard";
    /**
     * The number of milliseconds that the tooltip will appear for
     *
     * @uiName Tooltip lifespan
     */
    this.tooltiplifespan = DEFAULT_TOOLTIP_LIFESPAN;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const thisProps = getProps(this);
    const props = jn()
      ? useDemoShareLink(thisProps)
      : useShareLink(thisProps);
    return h$1(ShareLinkView, Object.assign({}, props));
  }
};
function useDemoShareLink(props) {
  const [open, setOpen] = useState(false);
  const shareString = "https://www.example.com/sharelink/abc";
  return cjs({
    shareString,
    tooltiptext: props.tooltiptext,
    open,
    onClick: () => {
      // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
      // Only if called from a user-initiated event
      navigator.clipboard.writeText(shareString);
      setOpen(true);
      setTimeout(() => setOpen(false), props.tooltiplifespan);
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { ShareLink as sqm_share_link };
