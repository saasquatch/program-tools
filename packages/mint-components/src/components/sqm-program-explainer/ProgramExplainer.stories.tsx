import { h } from "@stencil/core";
import { ProgramExplainerView } from "./sqm-program-explainer-view";
import { ProgramExplainerStepView } from "../sqm-program-explainer-step/sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer",
};

export const DefaultProgramExplainerView = () => {
  const barProps = {
    data: {
      programs: [
        {
          key: "program1",
          label: "My Referral Program",
        },
        {
          key: "program2",
          label: "My Rewards Program",
        },
      ],
    },
  };
  const item1Props = {
	title: "hello",
	description: "world"
  };
  const item2Props = {
	title: "hello",
	description: "world"
  };

  const props1 = {
    title: "Invite your friends to Klip",
    description: "Earn up to $1200 in rewards for each referral",
	color: "white",
	background: "#5B3EDA"
  };
  const props2 = {
    title: "Invite your friends to Klip",
    description: "Earn up to $1200 in rewards for each referral",
	color: "black",
	background: "yellow"
  };


  return (
    <ProgramExplainerView {...barProps}>
      <ProgramExplainerStepView {...props1} />
      <ProgramExplainerStepView {...props2} />
    </ProgramExplainerView>
  );
};
