import { h } from "@stencil/core";
import scenario from "./sqm-program-explainer-step.feature";

export default {
  title: "Components/Program Explainer Step",
  parameters: {
    scenario,
  },
};

export const ProgramExplainerStep = () => {
  return (
    <sqm-program-explainer-step
      header="Get up to $1250 for inviting friends to Klip"
      description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
      icon="person-plus-fill"
    />
  );
};

export const ProgramExplainerStepCustom = () => {
  return (
    <sqm-program-explainer-step
      header="Invite your friends to Klip"
      description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
      image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000265/squatch-assets/Uqn3aXw.png"
      text-color="#fffc4b"
      background-color="#ff7f7f"
    />
  );
};
