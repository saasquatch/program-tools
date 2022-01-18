import { h } from "@stencil/core";
import { ReferralCardView } from "./sqm-referral-card-view";
import { RewardTimelineView } from "./reward-timeline-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

export default {
  title: "Components/Referral Card",
};

export const Example = () => {
  return <div>Hello World</div>;
};

export const Timeline1Reward = () => {
  return (
    <div>
      <sqm-timeline-reward
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <br /> <hr /> <br />
      <sqm-timeline>
        <sqm-timeline-reward
          gift={false}
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-reward
          gift={false}
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
      </sqm-timeline>
    </div>
  );
};

export const Timeline2Rewards = createHookStory(() => {
  return (
    <div>
      <sqm-timeline gift={true}>
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
      </sqm-timeline>
      <sqm-timeline gift={false}>
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
      </sqm-timeline>
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
});

export const Timeline3Rewards = () => {
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

export const Timeline4Rewards = () => {
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
