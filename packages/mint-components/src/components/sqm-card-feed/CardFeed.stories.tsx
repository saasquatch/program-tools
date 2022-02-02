import { h } from "@stencil/core";
import { CardFeedView } from "./sqm-card-feed-view";
import { TaskCardView } from "../sqm-task-card/sqm-task-card-view";
import {
  coupleActions,
  manyActions,
  oneAction,
} from "../sqm-task-card/TaskCard.stories";
import scenario from "./sqm-card-feed.feature";

export default {
  title: "Components/Card Feed",
  parameters: {
    scenario,
  },
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
