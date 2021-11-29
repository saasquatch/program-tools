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

export const ProgressBar = () => {
  const props = {
    progress: 0,
    goal: 500,
    progressBarUnit: "$",
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [-100, 0, 100, 500, 1000] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};

export const ProgressBarSteps = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    progressBarUnit: "$",
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [-1, 0, 1, 5, 7] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};

export const ProgressBarRepeatable = () => {
  const props = {
    progress: 0,
    goal: 500,
    progressBarUnit: "$",
    repeatable: true,
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [100, 500, 650, 1200] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};

export const ProgressBarStepsRepeatable = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    progressBarUnit: "$",
    repeatable: true,
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [1, 5, 7, 12] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};
