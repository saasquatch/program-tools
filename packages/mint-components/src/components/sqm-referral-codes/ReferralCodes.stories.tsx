import { h } from "@stencil/core";
import scenario from "./ReferralCodes.feature";

export default {
  title: "Components/Referral Codes",
  parameters: {
    scenario,
  },
};

const pagination = (slot) => {
  return <sqm-pagination slot={slot}></sqm-pagination>;
};

const shareButtons = (slot) => {
  return (
    <sqm-portal-container gap="small" slot={slot}>
      <sqm-share-button medium="email">Share via email</sqm-share-button>
      <sqm-share-button medium="facebook">Share on Facebook</sqm-share-button>
      <sqm-share-button medium="whatsapp">Share on WhatsApp</sqm-share-button>
    </sqm-portal-container>
  );
};

const shareCodes = (slot) => {
  return <sqm-referral-code slot={slot}></sqm-referral-code>;
};

const shareCodeWithPreviouslyCopied = (slot) => {
  return (
    <sqm-referral-code
      slot={slot}
      showNotificationText={true}
      notificationText="You’ve copied this before."
    ></sqm-referral-code>
  );
};

export const ReferralCodes = () => {
  return (
    <sqm-referral-codes>
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};

export const WithPreviouslyCopiedCode = () => {
  return (
    <sqm-referral-codes>
      {pagination("pagination")}
      {shareCodeWithPreviouslyCopied("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};
