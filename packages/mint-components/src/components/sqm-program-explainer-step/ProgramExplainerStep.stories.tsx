import { h } from "@stencil/core";
import { ProgramExplainerStepView } from "./sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer Step",
};

export const Example1 = () => {
  const props = {
    cardTitle: "Invite your friends to Klip",
    description: "Send your referral link to a friend or share it through email, Twitter, or Facebook",
    color: "white",
    background: "#5B3EDA",
    icon: "person-plus-fill",
  };
  return <ProgramExplainerStepView {...props} />;
};