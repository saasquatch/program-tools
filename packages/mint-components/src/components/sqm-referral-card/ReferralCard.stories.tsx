import { h } from "@stencil/core";

export default {
  title: "Components/Referral Card",
};

export const ReferralCard = () => {
  return (
    <div>
      <sqm-referral-card
        header="Share $50 with friends"
        description="They’ll get a $50 credit towards a new account and you’ll get up to $1250."
      >
        <div slot="left">
          <sqm-text>
            <h3>Get rewarded when your friend uses Klip</h3>
          </sqm-text>
          <sqm-media
            image-url="https://i.imgur.com/L3aRMde.png"
            min-height="0"
          />
        </div>
        <div slot="right">
          <sqm-share-code></sqm-share-code>
          <sqm-share-link></sqm-share-link>
          <sqm-share-button></sqm-share-button>
        </div>
      </sqm-referral-card>
    </div>
  );
};

{
  /* <sqm-timeline slot="left">
          <sqm-timeline-entry
            reward="75"
            unit="points"
            desc="Your friends signs up for a free trial"
          />
          <sqm-timeline-entry
            reward="$50"
            unit="visa giftcard"
            desc="Your friends signs up for Klip Personal"
          />
        </sqm-timeline> */
}

export const TimelineWith1Reward = () => {
  return (
    <div>
      <sqm-timeline>
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
      </sqm-timeline>
      <br /> <hr /> <br />
      <sqm-timeline icon="circle">
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
      </sqm-timeline>
    </div>
  );
};

export const TimelineWith2Rewards = () => {
  return (
    <div>
      <sqm-timeline>
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
      </sqm-timeline>
      <br /> <hr /> <br />
      <sqm-timeline icon="circle">
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
      </sqm-timeline>
    </div>
  );
};

export const TimelineWith3Rewards = () => {
  return (
    <div>
      <sqm-timeline>
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
        <sqm-timeline-entry
          reward="$200"
          unit="visa giftcard"
          desc="Your friend qualifies as a good fit for Klip Team"
        />
      </sqm-timeline>
      <br /> <hr /> <br />
      <sqm-timeline icon="circle">
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
        <sqm-timeline-entry
          reward="$200"
          unit="visa giftcard"
          desc="Your friend qualifies as a good fit for Klip Team"
        />
      </sqm-timeline>
    </div>
  );
};

export const TimelineWith4Rewards = () => {
  return (
    <div>
      <sqm-timeline>
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
        <sqm-timeline-entry
          reward="$200"
          unit="visa giftcard"
          desc="Your friend qualifies as a good fit for Klip Team"
        />
        <sqm-timeline-entry
          reward="$1000"
          unit="visa giftcard"
          desc="Your friend purchases Klip Team"
        />
      </sqm-timeline>
      <br /> <hr /> <br />
      <sqm-timeline icon="circle">
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
        <sqm-timeline-entry
          reward="$200"
          unit="visa giftcard"
          desc="Your friend qualifies as a good fit for Klip Team"
        />
        <sqm-timeline-entry
          reward="$1000"
          unit="visa giftcard"
          desc="Your friend purchases Klip Team"
        />
      </sqm-timeline>
    </div>
  );
};
