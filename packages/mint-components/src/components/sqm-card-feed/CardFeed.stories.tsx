import { h } from "@stencil/core";
import { CardFeedView } from "./sqm-card-feed-view";
import { TaskCardView } from "../sqm-task-card/sqm-task-card-view";

export default {
  title: "Components/Card Feed",
};

const props = {
  width: 347,
  gap: 24,
};

const taskCardProps = {
  content: {
    rewardAmount: "20",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Complete a survey",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: false,

    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",

    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 1,
  },
  states: { progress: 0, loading: false },
};

const coupleActions = {
  content: {
    rewardAmount: "40",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Comment on 5 articles",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    steps: true,
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 5,
  },
  states: { progress: 1, loading: false },
};

const manyActions = {
  content: {
    rewardAmount: "150",
    rewardUnit: "SaaSquatch Points",
    cardTitle: "Spend $500 at our Store",
    description:
      "Description of action and reward. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget quisque commodo leo.",
    repeatable: false,
    showProgressBar: true,
    completedText:
      "Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}",
    progressBarUnit: "$",
    buttonText: "Take survey",
    buttonLink: "https://example.com/",
    openNewTab: false,
    showExpiry: false,
    rewardDuration: null,
    expiryMessage: "Ends {endDate}",
    startsOnMessage: "Starts {startDate}",
    endedMessage: "Ended {endDate}",
    finite: 0,
    goal: 500,
  },
  states: {
    progress: 100,
    loading: false,
  },
};

export const TaskCardGrid = () => {
  return (
    <CardFeedView {...props}>
      <TaskCardView {...taskCardProps}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...taskCardProps}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <div>
        <TaskCardView {...coupleActions}></TaskCardView>
      </div>
      <div>
        <div>
          <TaskCardView {...taskCardProps}></TaskCardView>
        </div>
      </div>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};
