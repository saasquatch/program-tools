import { h } from "@stencil/core";
import { ReferralCardView } from "./sqm-referral-card-view";
import { RewardTimelineView } from "./reward-timeline-view";

export default {
  title: "Components/Referral Card",
};

export const Example = () => {
  return <div>Hello World</div>;
};

export const TimelineReward1 = () => {
  return (
    <div>
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
    </div>
  );
};

export const TimelineReward2 = () => {
  return (
    <div>
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
      <sqm-timeline-reward line={true} />
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
      <sqm-timeline-reward line={true} />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Sign up for a free trial"
      />
    </div>
  );
};
