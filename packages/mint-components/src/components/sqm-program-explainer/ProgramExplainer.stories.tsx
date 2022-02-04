import { h } from "@stencil/core";
import { ProgramExplainerView } from "./sqm-program-explainer-view";
import { ProgramExplainerStepView } from "../sqm-program-explainer-step/sqm-program-explainer-step-view";
import scenario from "./sqm-program-explainer.feature";

export default {
  title: "Components/Program Explainer",
  parameters: {
    scenario,
  },
};

export const OneStep = () => {
  return (
    <sqm-program-explainer header="How it works">
      <sqm-program-explainer-step
        header="Get up to $1250 for inviting friends to Klip"
        description="Share your referral link with a friend and earn up to $1250"
        icon="person-plus-fill"
      />
      <sqm-program-explainer-step
        header="Earn points for using Klip"
        description="Complete tasks like uploading your first video or sharing videos with friends"
        icon="server"
      />
      <sqm-program-explainer-step
        header="Redeem rewards with your points"
        description="Redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"
        icon="people-fill"
      />
    </sqm-program-explainer>
  );
};

export const Custom = () => {
  return (
    <sqm-program-explainer
      header="How it works"
      text-color="#fffc4b"
      background-color="#ff7f7f"
    >
      <sqm-program-explainer-step
        header="Get up to $1250 for inviting friends to Klip"
        description="Share your referral link with a friend and earn up to $1250"
        icon="person-plus-fill"
      />
      <sqm-program-explainer-step
        header="Earn points for using Klip"
        description="Complete tasks like uploading your first video or sharing videos with friends"
        icon="server"
      />
      <sqm-program-explainer-step
        header="Redeem rewards with your points"
        description="Redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America"
        icon="people-fill"
      />
    </sqm-program-explainer>
  );
};

export const ProgramExplainerGeneric = () => {
  return (
    <sqm-program-explainer
      header="Anything and everything can be passed to this component!"
      text-color="#eee"
      background-color="#333"
    >
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          color: "#333",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          color: "#333",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          color: "#333",
        }}
      >
        PLACEHOLDER
      </div>
    </sqm-program-explainer>
  );
};
