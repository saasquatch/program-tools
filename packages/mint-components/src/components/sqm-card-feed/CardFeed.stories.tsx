import { h } from "@stencil/core";
import { CardFeedView } from "./sqm-card-feed-view";
import { TaskCardView } from "../sqm-task-card/sqm-task-card-view";

export default {
  title: "Components/Card Feed",
};

const props = {};

const taskCardProps = {
  rewardAmount: "20",
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
  rewardAmount: "40",
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
	rewardAmount: "150",
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
  
export const TaskCardGrid = () => {
  return (
    <CardFeedView {...props}>
      <TaskCardView {...taskCardProps}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...taskCardProps}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...taskCardProps}></TaskCardView>
      <TaskCardView {...coupleActions}></TaskCardView>
      <TaskCardView {...manyActions}></TaskCardView>
    </CardFeedView>
  );
};
