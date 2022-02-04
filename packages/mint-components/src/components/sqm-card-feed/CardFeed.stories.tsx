import { h } from "@stencil/core";
import { CardFeedView } from "./sqm-card-feed-view";
import { TaskCardView } from "../sqm-task-card/sqm-task-card-view";
import scenario from "./sqm-card-feed.feature";

export default {
  title: "Components/Card Feed",
  parameters: {
    scenario,
  },
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

export const TaskCardGrid = () => {
  return (
    <CardFeedView width={347} gap={24}>
      <TaskCardView {...oneAction}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};

export const TaskCardGridHighGap = () => {
  return (
    <CardFeedView width={400} gap={150}>
      <TaskCardView {...oneAction}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};

export const TaskCardGridLowGap = () => {
  return (
    <CardFeedView width={400} gap={12}>
      <TaskCardView {...oneAction}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};

export const TaskCardGridHighWidth = () => {
  return (
    <CardFeedView width={1000} gap={24}>
      <TaskCardView {...oneAction}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};

export const TaskCardGridLowWidth = () => {
  return (
    <CardFeedView width={250} gap={24}>
      <TaskCardView {...oneAction}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...oneAction}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};

export const CardFeedGeneric = () => {
  return (
    <CardFeedView width={300} gap={24}>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
      <div
        style={{
          padding: "100px",
          border: "1px dashed black",
          background: "#eee",
          display: "inline-block",
        }}
      >
        PLACEHOLDER
      </div>
    </CardFeedView>
  );
};
