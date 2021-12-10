import { h } from "@stencil/core";
import { MatrixStory } from "../sqm-stencilbook/Matrix";
import { TaskCardView } from "./sqm-task-card-view";
import { ProgressBarView } from "./progress-bar/progress-bar-view";
import scenarioTaskCard from "./sqm-task-card.feature";
import scenarioProgressBar from "./progress-bar/progress-bar.feature";
import { DateTime } from "luxon";

import { Resizer } from "../sqm-stencilbook/Resizer";

const scenario = scenarioTaskCard + scenarioProgressBar;

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
  rewardUnit: "SaaSquatch Points",
  cardTitle: "Complete a survey",
  description:
    "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
  repeatable: false,
  showProgressBar: false,
  progress: 0,
  goal: 1,
  buttonText: "Take survey",
  buttonLink: "https://example.com/",
  openNewTab: false,
  showExpiry: false,
  rewardDuration: null,
  loading: false,
  finite: 0,
};

const coupleActions = {
  rewardAmount: 40,
  rewardUnit: "SaaSquatch Points",
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
  openNewTab: false,
  showExpiry: false,
  rewardDuration: null,
  loading: false,
  finite: 0,
};

const manyActions = {
  rewardAmount: 150,
  rewardUnit: "SaaSquatch Points",
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
  openNewTab: false,
  showExpiry: false,
  rewardDuration: null,
  loading: false,
  finite: 0,
};

export const TaskCard = () => {
  const expire = {
    showExpiry: true,
    rewardDuration: "2021-11-30T08:00:00.000Z/2021-12-01T08:00:00.000Z",
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (
    <div style={storyFrame}>
      <Resizer>
        <h4>Not Repeatable</h4>
        <TaskCardView {...oneAction} progress={0} /> <h5 />
        <TaskCardView {...coupleActions} progress={1} /> <h5 />
        <TaskCardView {...manyActions} progress={230} />
      </Resizer>
      <Resizer>
        <h4>Repeatable</h4>
        <TaskCardView {...oneAction} progress={2} repeatable={true} /> <h5 />
        <TaskCardView {...coupleActions} progress={7} repeatable={true} />
        <h5 />
        <TaskCardView {...manyActions} progress={650} repeatable={true} />
      </Resizer>
      <Resizer>
        <h4>Complete</h4>
        <TaskCardView {...oneAction} progress={1} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} /> <h5 />
        <TaskCardView {...manyActions} progress={500} />
      </Resizer>
      <Resizer>
        <h4>Unavailable</h4>
        <TaskCardView {...oneAction} progress={0} {...expireRepeat} /> <h5 />
        <TaskCardView {...coupleActions} progress={3} {...expireRepeat} />
        <h5 />
        <TaskCardView {...manyActions} progress={250} {...expireRepeat} />
      </Resizer>
    </div>
  );
};

export const TaskCardNotRepeatable = () => {
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

export const TaskCardRepeatable = () => {
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

export const TaskCardRepeatableFinite = () => {
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        {/* <TaskCardView {...oneAction} progress={0} repeatable={true} finite={2} /> <h5 />
        <TaskCardView {...oneAction} progress={1} repeatable={true} finite={2} /> <h5 /> */}
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        {/* <TaskCardView {...coupleActions} progress={1} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...coupleActions} progress={5} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...coupleActions} progress={7} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...coupleActions} progress={10} repeatable={true} finite={2}/> */}
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...manyActions} progress={500} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...manyActions} progress={650} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...manyActions} progress={950} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...manyActions} progress={1000} repeatable={true} finite={2}/>
        <h5 />
        <TaskCardView {...manyActions} progress={1300} repeatable={true} finite={3}/>
        <h5 />
        <TaskCardView {...manyActions} progress={1500} repeatable={true} finite={3}/>
        <h5 />
        <TaskCardView {...manyActions} progress={2500} repeatable={true} finite={3}/>
        <h5 />
        <TaskCardView {...manyActions} progress={2500} repeatable={true} finite={4}/>
        <h5 />
        <TaskCardView {...manyActions} progress={2500} repeatable={true} finite={5}/>
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardEndDate = () => {
  const expire = {
    showExpiry: true,
    rewardDuration:
      DateTime.now().minus({ days: 1 }).toISO() +
      "/" +
      DateTime.now().plus({ days: 1 }).toISO(),
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

export const TaskCardLoading = () => {
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

export const TaskCardNotStarted = () => {
  const expire = {
    showExpiry: true,
    rewardDuration:
      DateTime.now().plus({ days: 1 }).toISO() +
      "/" +
      DateTime.now().plus({ days: 2 }).toISO(),
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} {...expire} /> <h5 />
        <TaskCardView {...oneAction} progress={1} {...expire} /> <h5 />
        <TaskCardView {...oneAction} progress={0} {...expireRepeat} /> <h5 />
        <TaskCardView {...oneAction} progress={1} {...expireRepeat} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} {...expire} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} {...expire} /> <h5 />
        <TaskCardView {...coupleActions} progress={1} {...expireRepeat} />
        <h5 />
        <TaskCardView {...coupleActions} progress={5} {...expireRepeat} />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} {...expire} /> <h5 />
        <TaskCardView {...manyActions} progress={500} {...expire} /> <h5 />
        <TaskCardView {...manyActions} progress={100} {...expireRepeat} />
        <h5 />
        <TaskCardView {...manyActions} progress={500} {...expireRepeat} />
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardEnded = () => {
  const expire = {
    showExpiry: true,
    rewardDuration:
      DateTime.now().minus({ days: 2 }).toISO() +
      "/" +
      DateTime.now().minus({ days: 1 }).toISO(),
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView {...oneAction} progress={0} {...expire} /> <h5 />
        <TaskCardView {...oneAction} progress={1} {...expire} /> <h5 />
        <TaskCardView {...oneAction} progress={0} {...expireRepeat} /> <h5 />
        <TaskCardView {...oneAction} progress={1} {...expireRepeat} /> <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView {...coupleActions} progress={1} {...expire} /> <h5 />
        <TaskCardView {...coupleActions} progress={5} {...expire} /> <h5 />
        <TaskCardView {...coupleActions} progress={1} {...expireRepeat} />
        <h5 />
        <TaskCardView {...coupleActions} progress={5} {...expireRepeat} />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView {...manyActions} progress={100} {...expire} /> <h5 />
        <TaskCardView {...manyActions} progress={500} {...expire} /> <h5 />
        <TaskCardView {...manyActions} progress={100} {...expireRepeat} />
        <h5 />
        <TaskCardView {...manyActions} progress={500} {...expireRepeat} />
        <h5 />
      </div>
    </div>
  );
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
