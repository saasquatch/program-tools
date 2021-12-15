import { h } from "@stencil/core";
import { CardFeedView } from "./sqm-card-feed-view";
import { TaskCardView } from "../sqm-task-card/sqm-task-card-view";

export default {
  title: "Components/Card Feed",
};

const props = {
	
};

export const TaskCardGrid = () => {
  return (
    <CardFeedView {...props}>

    </CardFeedView>
  );
};
