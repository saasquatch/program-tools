import { h } from "@stencil/core";
import scenario from "./ReferralCodes.feature";

export default {
  title: "Components/Referral Codes",
  parameters: {
    scenario,
  },
};

export const ReferralCodes = () => {
  return <sqm-referral-codes></sqm-referral-codes>;
};
