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
        desc="Your friends signs up for a free trial"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
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
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
    </div>
  );
};

export const TimelineReward3 = () => {
  return (
    <div>
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$200"
        unit="visa giftcard"
        desc="Your friend qualifies as a good fit for Klip Team"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$200"
        unit="visa giftcard"
        desc="Your friend qualifies as a good fit for Klip Team"
      />
    </div>
  );
};

export const TimelineReward4 = () => {
  return (
    <div>
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$200"
        unit="visa giftcard"
        desc="Your friend qualifies as a good fit for Klip Team"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        reward="$1000"
        unit="visa giftcard"
        desc="Your friend purchases Klip Team"
      />
      <br /> <hr /> <br />
      <sqm-timeline-reward
        gift={false}
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$200"
        unit="visa giftcard"
        desc="Your friend qualifies as a good fit for Klip Team"
      />
      <sqm-timeline-reward line />
      <sqm-timeline-reward
        gift={false}
        reward="$1000"
        unit="visa giftcard"
        desc="Your friend purchases Klip Team"
      />
    </div>
  );
};
