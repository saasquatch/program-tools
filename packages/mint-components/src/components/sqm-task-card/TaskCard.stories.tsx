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

export const Default = () => {
  return (
    <div style={resizable}>
      <TaskCardView />
    </div>
  );
};

export const NotRepeatable = () => {
  const oneAction = {
    points: 20,
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
  };
  const coupleActions = {
    points: 40,
    cardTitle: "Comment on 5 articles",
    progressBar: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
  };
  const manyActions = {
    points: 150,
    cardTitle: "Spend $500 at our Store",
    progressBar: true,
    goal: 500,
    unit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
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
    points: 20,
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    expire: true,
    dateExpire: "Nov 1, 2021",
  };
  const coupleActions = {
    points: 40,
    cardTitle: "Comment on 5 articles",
    progressBar: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    expire: true,
    dateExpire: "Nov 1, 2021",
  };
  const manyActions = {
    points: 150,
    cardTitle: "Spend $500 at our Store",
    progressBar: true,
    goal: 500,
    unit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    expire: true,
    dateExpire: "Nov 1, 2021",
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
    points: 20,
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    repeatable: true,
  };
  const coupleActions = {
    points: 40,
    cardTitle: "Comment on 5 articles",
    progressBar: true,
    repeatable: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
  };
  const manyActions = {
    points: 150,
    cardTitle: "Spend $500 at our Store",
    progressBar: true,
    repeatable: true,
    goal: 500,
    unit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
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
    points: 20,
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Take survey",
    goal: 1,
    repeatable: true,
    expire: true,
    dateExpire: "Nov 1, 2021",
  };
  const coupleActions = {
    points: 40,
    cardTitle: "Comment on 5 articles",
    progressBar: true,
    repeatable: true,
    goal: 5,
    steps: true,
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Start reading",
    expire: true,
    dateExpire: "Nov 1, 2021",
  };
  const manyActions = {
    points: 150,
    cardTitle: "Spend $500 at our Store",
    progressBar: true,
    repeatable: true,
    goal: 500,
    unit: "$",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    buttonText: "Visit our Store",
    expire: true,
    dateExpire: "Nov 1, 2021",
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
