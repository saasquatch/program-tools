import { FunctionalComponent, h } from "@stencil/core";
import { MatrixStory } from "../Matrix";
import { ProgressBarView } from "./progress-bar-view";
import scenario from "./progress-bar.feature";

export default {
  title: "Components/Task Card Progress Bar",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  return <ProgressBarView />;
};

export const ProgressBarLinear = () => {
  const props = {
    progress: 0,
    goal: 500,
    unit: "$",
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [-100, 0, 250, 500, 1000] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};
