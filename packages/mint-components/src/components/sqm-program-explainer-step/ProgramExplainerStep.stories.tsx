import { h } from "@stencil/core";
import { ProgramExplainerStepView } from "./sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer Step",
};

export const ProgramExplainerStep = () => {
  return (
    <sqm-program-explainer-step
      header="Get up to $1250 for inviting friends to Klip"
      description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
      image-url="https://i.imgur.com/xCgw1nb.png"
    />
  );
};

export const ProgramExplainerStepCustom = () => {
  return (
    <sqm-program-explainer-step
      header="Invite your friends to Klip"
      description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
      image-url="https://i.imgur.com/Uqn3aXw.png"
      text-color="#fffc4b"
      background-color="#ff7f7f"
    />
  );
};
