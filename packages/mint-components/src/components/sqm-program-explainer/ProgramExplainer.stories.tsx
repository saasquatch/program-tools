import { h } from "@stencil/core";
import { ProgramExplainerView } from "./sqm-program-explainer-view";
import { ProgramExplainerStepView } from "../sqm-program-explainer-step/sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer",
};

export const OneStep = () => {
  return (
    <sqm-program-explainer>
      <sqm-program-explainer-step
        header="Get up to $1250 for inviting friends to Klip"
        description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
        image-url="https://i.imgur.com/xCgw1nb.png"
      />
      <sqm-program-explainer-step
        header="Get up to $1250 for inviting friends to Klip"
        description="Send your referral link to a friend or share it through email, Twitter, or Facebook"
        image-url="https://i.imgur.com/xCgw1nb.png"
      />
    </sqm-program-explainer>
  );
};

// export const TwoSteps = () => {
//   return (
//     <ProgramExplainerView {...props}>
//       <ProgramExplainerStepView {...steps1} />
//       <ProgramExplainerStepView {...steps2} />
//     </ProgramExplainerView>
//   );
// };

// export const ThreeSteps = () => {
//   return (
//     <ProgramExplainerView {...props}>
//       <ProgramExplainerStepView {...steps1} />
//       <ProgramExplainerStepView {...steps2} />
//       <ProgramExplainerStepView {...steps3} />
//     </ProgramExplainerView>
//   );
// };
