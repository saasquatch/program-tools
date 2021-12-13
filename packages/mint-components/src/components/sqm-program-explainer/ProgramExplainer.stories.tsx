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
  return (
	  "asd"
    // <ProgramExplainerView {...barProps}>
    //   <ProgramExplainerStepView {...item1Props} />
    //   <ProgramExplainerStepView {...item2Props} />
    // </ProgramExplainerView>
  );
};
