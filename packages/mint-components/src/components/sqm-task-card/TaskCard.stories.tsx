import { h } from "@stencil/core";
import { TaskCardView } from "./sqm-task-card-view";
import scenario from "./sqm-task-card.feature";

export default {
  title: "Components/Task Card/",
  parameters: {
    scenario,
  },
};

const storyFrame = {
  display: "inline-flex",
  gap: "32px",
};

const resizable = {
  width: "347px",
  minWidth: "347px",
  resize: "horizontal",
  height: "fit-content",
  overflow: "hidden",
};

const oneAction = {
  rewardAmount: 20,
  rewardUnit: "Points",
  cardTitle: "Complete a survey",
  description:
    "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
  repeatable: false,
  showProgressBar: false,
  progress: 0,
  goal: 1,
  buttonText: "Take survey",
  buttonLink: "https://example.com/",
  showExpiry: false,
  loading: false,
};

const coupleActions = {
  rewardAmount: 40,
  rewardUnit: "Points",
  cardTitle: "Comment on 5 articles",
  description:
    "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
  repeatable: false,
  showProgressBar: true,
  steps: true,
  progress: 1,
  goal: 5,
  buttonText: "Take survey",
  buttonLink: "https://example.com/",
  showExpiry: false,
  loading: false,
};

const manyActions = {
  rewardAmount: 150,
  rewardUnit: "Points",
  cardTitle: "Spend $500 at our Store",
  description:
    "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
  repeatable: false,
  showProgressBar: true,
  progress: 100,
  goal: 500,
  progressBarUnit: "$",
  buttonText: "Take survey",
  buttonLink: "https://example.com/",
  showExpiry: false,
  loading: false,
};

export const NotRepeatable = () => {
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...oneAction} progress={1} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={230} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
      </div>
    </div>
  );
};

export const Repeatable = () => {
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} repeatable={true} /> <h5 />
        <TaskCardView {...oneAction} progress={1} repeatable={true} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} repeatable={true} />
        <h5 />
        <TaskCardView {...coupleActions} progress={5} repeatable={true} />
        <h5 />
        <TaskCardView {...coupleActions} progress={7} repeatable={true} />
        <h5 />
        <TaskCardView {...coupleActions} progress={10} repeatable={true} />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} repeatable={true} />
        <h5 />
        <TaskCardView {...manyActions} progress={500} repeatable={true} />
        <h5 />
        <TaskCardView {...manyActions} progress={650} repeatable={true} />
        <h5 />
        <TaskCardView {...manyActions} progress={1000} repeatable={true} />
        <h5 />
      </div>
    </div>
  );
};

export const DateExpires = () => {
  const expire = {
    showExpiry: true,
    dateExpires: "2021-12-08T08:00:00.000Z/2021-12-17T08:00:00.000Z",
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} {...expire} /> <h5 />
        <TaskCardView {...oneAction} {...expireRepeat} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} {...expire} /> <h5 />
        <TaskCardView {...coupleActions} {...expireRepeat} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} {...expire} /> <h5 />
        <TaskCardView {...manyActions} {...expireRepeat} /> <h5 />
      </div>
    </div>
  );
};

export const Loading = () => {
  const loading = { loading: true };
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} {...loading} /> <h5 />
        <TaskCardView {...oneAction} {...loading} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} {...loading} /> <h5 />
        <TaskCardView {...coupleActions} {...loading} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} {...loading} /> <h5 />
        <TaskCardView {...manyActions} {...loading} /> <h5 />
      </div>
    </div>
  );
};
