import { FunctionalComponent, h } from "@stencil/core";
import { MatrixStory } from "./Matrix";
import {
  ProgressBar as ProgressBarView,
  TaskCardStyle,
  TaskCardView,
} from "./sqm-task-card-view";

export default {
  title: "Components/Task Card",
};

export const Example = () => {
  const props = {
    goal: 5,
    progress: 2,
    repeatable: false,
    buttonText: "Start reading",
    onClick: () => {},
  };
  return <TaskCardView {...props} />;
};

export const ProgressBar = () => {
  const props = {
    goal: 5,
    progress: 2,
    repeatable: false,
  };
  return (
    <div>
      <TaskCardStyle />
      <MatrixStory
        matrix={{ repeatable: [false, true], goal: [5, 10] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};
