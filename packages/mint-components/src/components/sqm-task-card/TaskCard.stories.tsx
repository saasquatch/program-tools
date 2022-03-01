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
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "20",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: false,
    steps: false,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    rewardDuration: null,
    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 1,
    locale: "en",
  },
  states: {
    progress: 0,
    loading: false,
    loadingEvent: false,
  },
};

const coupleActions = {
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "40",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Comment on 5 articles",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    steps: true,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 5,
    locale: "en",
  },
  states: {
    progress: 1,
    loading: false,
    loadingEvent: false,
  },
};

const manyActions = {
  callbacks: {
    sendEvent: () => void 0,
    onClick: () => void 0,
  },
  content: {
    rewardAmount: "150",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Spend $500 at our Store",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    showProgressBar: true,
    steps: false,
    progressBarUnit: "$",
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 500,
    locale: "en",
  },
  states: { progress: 100, loading: false, loadingEvent: false },
};

export const TaskCard = () => {
  const expire = {
    rewardDuration: "2021-11-30T08:00:00.000Z/2021-12-01T08:00:00.000Z",
  };
  const expireRepeat = { ...expire, repeatable: true };
  return (
    <div style={storyFrame}>
      <Resizer>
        <h4>Not Repeatable</h4>
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, description: "" }}
          states={{ ...oneAction.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, description: "" }}
          states={{ ...coupleActions.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, description: "" }}
          states={{ ...manyActions.states, progress: 230 }}
        />
      </Resizer>
      <Resizer>
        <h4>Repeatable</h4>
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true }}
          states={{ ...oneAction.states, progress: 2 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true }}
          states={{ ...coupleActions.states, progress: 7 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true }}
          states={{ ...manyActions.states, progress: 650 }}
        />
      </Resizer>
      <Resizer>
        <h4>Complete</h4>
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 5 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
        />
      </Resizer>
      <Resizer>
        <h4>Unavailable</h4>
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
          {...expireRepeat}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 3 }}
          {...expireRepeat}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 250 }}
          {...expireRepeat}
        />
      </Resizer>
    </div>
  );
};

export const TaskCardNotRepeatable = () => {
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 5 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 230 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
        />
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardRepeatable = () => {
  return (
    <div style={storyFrame}>
      <div style={resizable}>
        <h4>One Action</h4>
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true }}
          states={{ ...oneAction.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true }}
          states={{ ...oneAction.states, progress: 1 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true }}
          states={{ ...coupleActions.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true }}
          states={{ ...coupleActions.states, progress: 5 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true }}
          states={{ ...coupleActions.states, progress: 7 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true }}
          states={{ ...coupleActions.states, progress: 10 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true }}
          states={{ ...manyActions.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true }}
          states={{ ...manyActions.states, progress: 500 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true }}
          states={{ ...manyActions.states, progress: 650 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true }}
          states={{ ...manyActions.states, progress: 1000 }}
        />
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
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true, finite: 2 }}
          states={{ ...oneAction.states, progress: 0 }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true, finite: 2 }}
          states={{ ...oneAction.states, progress: 1 }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, repeatable: true, finite: 2 }}
          states={{ ...oneAction.states, progress: 2 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true, finite: 2 }}
          states={{ ...coupleActions.states, progress: 2 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true, finite: 2 }}
          states={{ ...coupleActions.states, progress: 5 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true, finite: 2 }}
          states={{ ...coupleActions.states, progress: 10 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true, finite: 3 }}
          states={{ ...coupleActions.states, progress: 12 }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          content={{ ...coupleActions.content, repeatable: true, finite: 3 }}
          states={{ ...coupleActions.states, progress: 15 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true, finite: 2 }}
          states={{ ...manyActions.states, progress: 200 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true, finite: 3 }}
          states={{ ...manyActions.states, progress: 500 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true, finite: 2 }}
          states={{ ...manyActions.states, progress: 1000 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true, finite: 3 }}
          states={{ ...manyActions.states, progress: 1200 }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          content={{ ...manyActions.content, repeatable: true, finite: 3 }}
          states={{ ...manyActions.states, progress: 1500 }}
        />
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardEndDate = () => {
  const expire = {
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
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...oneAction.content, ...expireRepeat }}
          states={{ ...oneAction.states, progress: 1 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...oneAction}
          content={{ ...coupleActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...coupleActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...coupleActions.content, ...expireRepeat }}
          states={{ ...coupleActions.states, progress: 5 }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...oneAction}
          content={{ ...manyActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...manyActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          content={{ ...manyActions.content, ...expireRepeat }}
          states={{ ...manyActions.states, progress: 1000 }}
        />
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardLoading = () => {
  const loading = {
    states: { loading: true, progress: 0, loadingEvent: false },
  };
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
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
          content={{ ...oneAction.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
          content={{ ...oneAction.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
          content={{ ...oneAction.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
          content={{ ...oneAction.content, ...expireRepeat }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expireRepeat }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 100 }}
          content={{ ...manyActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
          content={{ ...manyActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 100 }}
          content={{ ...manyActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
          content={{ ...manyActions.content, ...expireRepeat }}
        />
        <h5 />
      </div>
    </div>
  );
};

export const TaskCardEnded = () => {
  const expire = {
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
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
          content={{ ...oneAction.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
          content={{ ...oneAction.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 0 }}
          content={{ ...oneAction.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...oneAction}
          states={{ ...oneAction.states, progress: 1 }}
          content={{ ...oneAction.content, ...expireRepeat }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>A Couple Actions</h4>
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...coupleActions}
          states={{ ...coupleActions.states, progress: 1 }}
          content={{ ...coupleActions.content, ...expireRepeat }}
        />
        <h5 />
      </div>
      <div style={resizable}>
        <h4>Many Actions</h4>
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 100 }}
          content={{ ...manyActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
          content={{ ...manyActions.content, ...expire }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 100 }}
          content={{ ...manyActions.content, ...expireRepeat }}
        />
        <h5 />
        <TaskCardView
          {...manyActions}
          states={{ ...manyActions.states, progress: 500 }}
          content={{ ...manyActions.content, ...expireRepeat }}
        />
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
        matrix={{ progress: [0, 100, 500, 650, 1200] }}
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
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [0, 1, 5, 7, 12] }}
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
        matrix={{ progress: [0, 250, 500, 750, 1000, 1250] }}
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
    repeatable: true,
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [0, 1, 5, 7, 12] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};

export const ProgressBarFinite = () => {
  const props = {
    progress: 0,
    goal: 500,
    progressBarUnit: "$",
    repeatable: true,
    finite: 2,
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [0, 250, 500, 750, 1000, 1250] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};

export const ProgressBarStepsFinite = () => {
  const props = {
    progress: 0,
    steps: true,
    goal: 5,
    repeatable: true,
    finite: 2,
  };
  return (
    <div>
      <MatrixStory
        matrix={{ progress: [0, 1, 5, 7, 10, 12] }}
        props={props}
        Component={ProgressBarView}
      />
    </div>
  );
};
