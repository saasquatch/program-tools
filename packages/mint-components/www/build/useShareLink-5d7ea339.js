import { d as dist, M, i as ie, R as Rn, a as sn, q as qe } from './index.module-b74a7f69.js';
import { m as useState } from './stencil-hooks.module-f4b05383.js';

const MessageLinkQuery = dist.gql `
  query ($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;
const WIDGET_ENGAGEMENT_EVENT = dist.gql `
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;
function useShareLink(props) {
  var _a, _b;
  const { programId = M() } = props;
  const user = ie();
  const engagementMedium = Rn();
  const { data } = sn(MessageLinkQuery, { programId }, !(user === null || user === void 0 ? void 0 : user.jwt));
  const [sendLoadEvent] = qe(WIDGET_ENGAGEMENT_EVENT);
  const shareString = (_b = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.shareLink) !== null && _b !== void 0 ? _b : 
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

export { useShareLink as u };
