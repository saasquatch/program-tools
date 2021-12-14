import { h } from "@stencil/core";
import { ProgramExplainerView } from "./sqm-program-explainer-view";
import { ProgramExplainerStepView } from "../sqm-program-explainer-step/sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer",
};

const props1 = {
  title: "Invite your friends to Klip",
  description: "Earn up to $1200 in rewards for each referral",
  color: "white",
  background: "#5B3EDA",
};
const props2 = {
  title: "If your friend signs up for a Klip Business plan",
  description: "Get a $50 VISA giftcard when they pay for their first month",
  color: "black",
  background: "#F3CC66",
};
const props3 = {
  title: "If your friend signs up for a Klip Enterprise plan",
  description:
    "Get up to $1200 in rewards - a $200 VISA giftcard when our sales team qualifies them as a good fit for Klip, and a $1000 VISA giftcard when they become a paying customer",
  color: "black",
  background: "#D3CCF5",
};

export const Step1 = () => {
  return (
    <ProgramExplainerView>
      <ProgramExplainerStepView {...props1} />
    </ProgramExplainerView>
  );
};

export const Step2 = () => {
  return (
    <ProgramExplainerView>
      <ProgramExplainerStepView {...props1} />
      <ProgramExplainerStepView {...props2} />
    </ProgramExplainerView>
  );
};

export const Step3 = () => {
  return (
    <ProgramExplainerView>
      <ProgramExplainerStepView {...props1} />
      <ProgramExplainerStepView {...props2} />
      <ProgramExplainerStepView {...props3} />
    </ProgramExplainerView>
  );
};
