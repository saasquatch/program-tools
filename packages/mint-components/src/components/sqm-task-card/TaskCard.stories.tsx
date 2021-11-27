import { FunctionalComponent, h } from "@stencil/core";
import { MatrixStory } from "./Matrix";
import { TaskCardView } from "./sqm-task-card-view";
import { ProgressBarView } from "./progress-bar/progress-bar-view";

export default {
  title: "Components/Task Card/",
};

const resizable = {
  width: "347px",
  minWidth: "347px",
  resize: "horizontal",
  height: "fit-content",
  overflow: "hidden",
};

export const Default = () => {
  return <TaskCardView />;
};

export const StorySpecs = () => {
  const props = {
    progress: 0,
    goal: 500,
    unit: "$",
  };

  const mono_style = {
    whiteSpace: "pre-wrap",
    fontFamily: "monospace",
  };

  return (
    <div>
      <div style={mono_style}>
        {`
Scenario Outline: Progress Bar Linear

  Given <progress> and <goal>
  Then I have <progressBar>
  And the gift icon has <color>

  Examples:
    | progress | goal | progressBar | color |
    |     -100 |  500 | ●――――――――🎁 | no    |
    |        0 |  500 | ●――――――――🎁 | no    |
    |      250 |  500 | ――――●――――🎁 | no    |
    |      500 |  500 | ―――――――――🎁 | yes   |
    |     1000 |  500   | ―――――――――🎁 | yes   |

`}
      </div>
      <MatrixStory
        matrix={{ progress: [-100, 0, 250, 500, 1000] }}
        props={props}
        Component={ProgressBarView}
      />
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
        <h5>Progress {">"} Goal</h5>
        <TaskCardView {...coupleActions} progress={9} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={0} /> <h5 />
        <TaskCardView {...manyActions} progress={230} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <h5>Progress {">"} Goal</h5>
        <TaskCardView {...manyActions} progress={700} /> <h5 />
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
        <h5>Progress {">"} Goal</h5>
        <TaskCardView {...coupleActions} progress={9} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={0} /> <h5 />
        <TaskCardView {...manyActions} progress={230} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <h5>Progress {">"} Goal</h5>
        <TaskCardView {...manyActions} progress={700} /> <h5 />
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
        <TaskCardView {...coupleActions} progress={12} /> <h5 />
        <TaskCardView {...coupleActions} progress={15} /> <h5 />
        <TaskCardView {...coupleActions} progress={17} /> <h5 />
        <TaskCardView {...coupleActions} progress={22} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <TaskCardView {...manyActions} progress={650} /> <h5 />
        <TaskCardView {...manyActions} progress={1000} /> <h5 />
        <TaskCardView {...manyActions} progress={1200} /> <h5 />
        <TaskCardView {...manyActions} progress={1500} /> <h5 />
        <TaskCardView {...manyActions} progress={1700} /> <h5 />
        <TaskCardView {...manyActions} progress={2200} /> <h5 />
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
        <TaskCardView {...coupleActions} progress={12} /> <h5 />
        <TaskCardView {...coupleActions} progress={15} /> <h5 />
        <TaskCardView {...coupleActions} progress={17} /> <h5 />
        <TaskCardView {...coupleActions} progress={22} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} /> <h5 />
        <TaskCardView {...manyActions} progress={500} /> <h5 />
        <TaskCardView {...manyActions} progress={650} /> <h5 />
        <TaskCardView {...manyActions} progress={1000} /> <h5 />
        <TaskCardView {...manyActions} progress={1200} /> <h5 />
        <TaskCardView {...manyActions} progress={1500} /> <h5 />
        <TaskCardView {...manyActions} progress={1700} /> <h5 />
        <TaskCardView {...manyActions} progress={2200} /> <h5 />
      </div>
    </div>
  );
};
// export const Repeatable = () => {
//   const oneAction = {
//     points: 20,
//     cardTitle: "Complete a survey",
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     repeatable: 0,
//     buttonText: "Take survey",
//     buttonOnClick: () => {},
//   };
//   const coupleActions = {
//     points: 40,
//     cardTitle: "Comment on 5 articles",
//     goal: 5,
//     steps: 1,
//     repeatable: true,
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     buttonText: "Start reading",
//     buttonOnClick: () => {},
//   };
//   const manyActions = {
//     points: 150,
//     cardTitle: "Spend $500 at our Store",
//     goal: 500,
//     repeatable: true,
//     unit: "$",
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     buttonText: "Visit our Store",
//     buttonOnClick: () => {},
//   };
//   return (
//     <div style={{ display: "inline-flex", gap: "32px" }}>
//       <div style={resizable}>
//         <h4>One Action</h4>
//         <TaskCardView {...oneAction} /> <h5 />
//         <TaskCardView {...oneAction} repeatable={1} complete /> <h5 />
//       </div>
//       <div style={resizable}>
//         <h4>A Couple Actions</h4>
//         <TaskCardView {...coupleActions} progress={1} /> <h5 />
//         <TaskCardView {...coupleActions} progress={5} /> <h5 />
//         <TaskCardView {...coupleActions} progress={7} /> <h5 />
//         <TaskCardView {...coupleActions} progress={10} /> <h5 />
//         <TaskCardView {...coupleActions} progress={12} /> <h5 />
//       </div>
//       <div style={resizable}>
//         <h4>Many Actions</h4>
//         <TaskCardView {...manyActions} progress={100} /> <h5 />
//         <TaskCardView {...manyActions} progress={500} /> <h5 />
//         <TaskCardView {...manyActions} progress={650} /> <h5 />
//         <TaskCardView {...manyActions} progress={1000} /> <h5 />
//         <TaskCardView {...manyActions} progress={1200} /> <h5 />
//       </div>
//     </div>
//   );
// };

// export const RepeatableWithExpiry = () => {
//   const oneAction = {
//     points: 20,
//     cardTitle: "Complete a survey",
//     expire: "Nov 30, 2021",
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     repeatable: 0,
//     buttonText: "Take survey",
//     buttonOnClick: () => {},
//   };
//   const coupleActions = {
//     points: 40,
//     cardTitle: "Comment on 5 articles",
//     expire: "Nov 30, 2021",
//     goal: 5,
//     steps: 1,
//     repeatable: true,
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     buttonText: "Start reading",
//     buttonOnClick: () => {},
//   };
//   const manyActions = {
//     points: 150,
//     cardTitle: "Spend $500 at our Store",
//     expire: "Nov 30, 2021",
//     goal: 500,
//     repeatable: true,
//     unit: "$",
//     description:
//       "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
//     buttonText: "Visit our Store",
//     buttonOnClick: () => {},
//   };
//   return (
//     <div style={{ display: "inline-flex", gap: "32px" }}>
//       <div style={resizable}>
//         <h4>One Action</h4>
//         <TaskCardView {...oneAction} /> <h5 />
//         <TaskCardView {...oneAction} repeatable={1} complete /> <h5 />
//       </div>
//       <div style={resizable}>
//         <h4>A Couple Actions</h4>
//         <TaskCardView {...coupleActions} progress={1} /> <h5 />
//         <TaskCardView {...coupleActions} progress={5} /> <h5 />
//         <TaskCardView {...coupleActions} progress={7} /> <h5 />
//         <TaskCardView {...coupleActions} progress={10} /> <h5 />
//         <TaskCardView {...coupleActions} progress={12} /> <h5 />
//       </div>
//       <div style={resizable}>
//         <h4>Many Actions</h4>
//         <TaskCardView {...manyActions} progress={100} /> <h5 />
//         <TaskCardView {...manyActions} progress={500} /> <h5 />
//         <TaskCardView {...manyActions} progress={650} /> <h5 />
//         <TaskCardView {...manyActions} progress={1000} /> <h5 />
//         <TaskCardView {...manyActions} progress={1200} /> <h5 />
//       </div>
//     </div>
//   );
// };

// export const ProgressBar = () => {
//   const props = {
//     goal: 5,
//   };
//   return (
//     <div>
//       <MatrixStory
//         matrix={{ progress: [1, 2, 5], steps: [0, 1], repeatable: [false] }}
//         props={props}
//         Component={ProgressBarView}
//       />
//       <MatrixStory
//         matrix={{ progress: [2, 5, 7, 12], steps: [0, 1], repeatable: [true] }}
//         props={props}
//         Component={ProgressBarView}
//       />
//     </div>
//   );
// };
