import { h } from "@stencil/core";
import { TaskCardView } from "./sqm-task-card-view";
import scenario from "./sqm-task-card.feature";

export default {
  title: "Components/Task Card/",
  parameters: {
    scenario,
  },
};

const resizable = {
  width: "347px",
  minWidth: "347px",
  resize: "horizontal",
  height: "fit-content",
  overflow: "hidden",
};

export const NotRepeatable = () => {
  const oneAction = {
    rewardAmount: 20,
    showExpiry: false,
    rewardUnit: "Points",
    cardTitle: "Complete a survey",
    repeatable: false,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    buttonLink: "https://example.com/",
    showProgressBar: false,
    loading:false,
  };
  const coupleActions = {
    rewardAmount: 40,
    rewardUnit: "Points",
    cardTitle: "Comment on 5 articles",
    showProgressBar: true,
    showExpiry: false,
    goal: 5,
    repeatable: false,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    buttonLink: "https://example.com/",
    loading:false,
  };
  const manyActions = {
    rewardAmount: 150,
    rewardUnit: "Points",
    cardTitle: "Spend $500 at our Store",
    showProgressBar: true,
    showExpiry: false,
    goal: 500,
    repeatable: false,
    progressBarUnit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    buttonLink: "https://example.com/",
    loading:false,
  };

  return (
    <div style={{ display: "inline-flex", gap: "32px" }}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...oneAction} progress={1} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={0} /> <h5 />
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={0} /> <h5 />
        <TaskCardView {...manyActions} progress={230} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
      </div>
    </div>
  );
};

export const NotRepeatableWithExpiry = () => {
  const oneAction = {
    rewardAmount: 20,
    rewardUnit: "Points",
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    showExpiry: true,
    repeatable: false,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    showProgressBar: false,
    loading:false,
  };
  const coupleActions = {
    rewardAmount: 40,
    rewardUnit: "Points",
    cardTitle: "Comment on 5 articles",
    showProgressBar: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    showExpiry: true,
    repeatable: false,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    loading:false,
  };
  const manyActions = {
    rewardAmount: 150,
    rewardUnit: "Points",
    repeatable: false,
    cardTitle: "Spend $500 at our Store",
    showProgressBar: true,
    goal: 500,
    progressBarUnit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    showExpiry: true,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    loading:false,
  };
  return (
    <div style={{ display: "inline-flex", gap: "32px" }}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...oneAction} progress={1} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={0} /> <h5 />
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={0} /> <h5 />
        <TaskCardView {...manyActions} progress={230} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
      </div>
    </div>
  );
};

export const Repeatable = () => {
  const oneAction = {
    rewardAmount: 20,
    rewardUnit: "Points",
    showExpiry: false,
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    repeatable: true,
    buttonLink: "https://example.com/",
    showProgressBar: false,
    loading:false,
  };
  const coupleActions = {
    rewardAmount: 40,
    rewardUnit: "Points",
    showExpiry: false,
    cardTitle: "Comment on 5 articles",
    showProgressBar: true,
    repeatable: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    buttonLink: "https://example.com/",
    loading:false,
  };
  const manyActions = {
    rewardAmount: 150,
    rewardUnit: "Points",
    showExpiry: false,
    cardTitle: "Spend $500 at our Store",
    showProgressBar: true,
    repeatable: true,
    goal: 500,
    progressBarUnit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    buttonLink: "https://example.com/",
    loading:false,
  };
  return (
    <div style={{ display: "inline-flex", gap: "32px" }}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...oneAction} progress={1} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
        <TaskCardView {...coupleActions} progress={7} /> <h5 />
        <TaskCardView {...coupleActions} progress={10} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <TaskCardView {...manyActions} progress={650} /> <h5 />
        <TaskCardView {...manyActions} progress={1000} /> <h5 />
      </div>
    </div>
  );
};

export const RepeatableWithExpiry = () => {
  const oneAction = {
    rewardAmount: 20,
    rewardUnit: "Points",
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    repeatable: true,
    showExpiry: true,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    showProgressBar: false,
    loading:false,
  };
  const coupleActions = {
    rewardAmount: 40,
    rewardUnit: "Points",
    cardTitle: "Comment on 5 articles",
    showProgressBar: true,
    repeatable: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    showExpiry: true,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    loading:false,
  };
  const manyActions = {
    rewardAmount: 150,
    rewardUnit: "Points",
    cardTitle: "Spend $500 at our Store",
    showProgressBar: true,
    repeatable: true,
    goal: 500,
    progressBarUnit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    showExpiry: true,
    dateExpires: "Nov 1, 2021",
    buttonLink: "https://example.com/",
    loading:false,
  };
  return (
    <div style={{ display: "inline-flex", gap: "32px" }}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...oneAction} progress={1} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
        <TaskCardView {...coupleActions} progress={7} /> <h5 />
        <TaskCardView {...coupleActions} progress={10} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <TaskCardView {...manyActions} progress={650} /> <h5 />
        <TaskCardView {...manyActions} progress={1000} /> <h5 />
      </div>
    </div>
  );
};
