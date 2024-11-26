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
  return <sqm-share-code slot={slot}></sqm-share-code>;
};

export const ReferralCodes = () => {
  return (
    <sqm-referral-codes titleText="">
      {pagination("pagination")}
      {shareCodes("shareCodes")}
      {shareButtons("shareButtons")}
    </sqm-referral-codes>
  );
};
