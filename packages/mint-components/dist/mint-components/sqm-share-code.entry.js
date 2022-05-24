import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { m as useState, n as h } from './stencil-hooks.module-f4b05383.js';
import { d as dist, M, i as ie, R as Rn, a as sn, q as qe, j as jn } from './index.module-b74a7f69.js';
import { S as ShareLinkView } from './sqm-share-link-view-9a6d536e.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

const MessageLinkQuery = dist.gql `
  query ($programId: ID) {
    user: viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;
const WIDGET_ENGAGEMENT_EVENT = dist.gql `
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;
function useShareCode(props) {
  var _a, _b;
  const programId = M();
  const user = ie();
  const engagementMedium = Rn();
  const { data } = sn(MessageLinkQuery, { programId }, !(user === null || user === void 0 ? void 0 : user.jwt));
  const [sendLoadEvent] = qe(WIDGET_ENGAGEMENT_EVENT);
  const shareString = (_b = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.referralCode) !== null && _b !== void 0 ? _b : 
  // Shown during loading
  "...";
  const [open, setOpen] = useState(false);
  function onClick() {
    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(shareString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user === null || user === void 0 ? void 0 : user.id,
        accountId: user === null || user === void 0 ? void 0 : user.accountId,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium,
          shareMedium: "DIRECT",
        },
      },
    });
  }
  return { ...props, onClick, open, shareString };
}

const DEFAULT_TOOLTIP_LIFESPAN = 1000;
let ShareCode = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * This is shown after someone has successfully copied the cpde to the clipboard.
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
      ? useDemoShareCode(thisProps)
      : useShareCode(thisProps);
    return h$1(ShareLinkView, Object.assign({}, props));
  }
};
function useDemoShareCode(props) {
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

export { ShareCode as sqm_share_code };
