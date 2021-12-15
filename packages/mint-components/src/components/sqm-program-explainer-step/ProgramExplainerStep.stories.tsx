import { h } from "@stencil/core";
import { ProgramExplainerStepView } from "./sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer Step",
};

export const Example1 = () => {
  const props = {
    cardTitle: "Invite your friends to Klip",
    description: "Earn up to $1200 in rewards for each referral",
    color: "white",
    background: "#5B3EDA",
    icon: "person-plus-fill",
  };
  return <ProgramExplainerStepView {...props} />;
};