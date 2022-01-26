import { h } from "@stencil/core";

export default {
  title: "Components/Referral Card",
};

const media = (slot) => {
  return (
    <sqm-portal-container gap="large" slot={slot}>
      Get rewarded when your friend uses Klip
      <sqm-image image-url="https://i.imgur.com/IqB7GeS.png" />
    </sqm-portal-container>
  );
};

const sharebutton = (slot) => {
  return (
    <sqm-portal-container gap="large" slot={slot}>
      <sqm-text>Choose how you want to share:</sqm-text>
      <sqm-text>
        {
          //@ts-ignore
          <p light>Your unique referral link:</p>
        }
        <sqm-share-code />
      </sqm-text>
      <sqm-share-button
        medium="email"
        icon="envelope"
        backgroundcolor="#666666"
        textcolor="#fff"
      >
        Share via email
      </sqm-share-button>
      <sqm-share-button
        medium="facebook"
        backgroundcolor="#0671E6"
        textcolor="#fff"
      >
        Share on Facebook
      </sqm-share-button>
      <sqm-share-button
        medium="twitter"
        backgroundcolor="#47ACDF"
        textcolor="#fff"
      >
        Tweet about us
      </sqm-share-button>
    </sqm-portal-container>
  );
};

const timeline = (slot, count) => {
  return (
    <sqm-timeline slot={slot} icon="circle">
      {count > 0 && (
        <sqm-timeline-entry
          reward="75"
          unit="points"
          desc="Your friends signs up for a free trial"
        />
      )}
      {count > 1 && (
        <sqm-timeline-entry
          reward="$50"
          unit="visa giftcard"
          desc="Your friends signs up for Klip Personal"
        />
      )}
      {count > 2 && (
        <sqm-timeline-entry
          reward="$200"
          unit="visa giftcard"
          desc="Your friend qualifies as a good fit for Klip Team"
        />
      )}
      {count > 3 && (
        <sqm-timeline-entry
          reward="$1000"
          unit="visa giftcard"
          desc="Your friend purchases Klip Team"
        />
      )}
    </sqm-timeline>
  );
};

export const ReferralCardA = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {media("left")}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardB = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("left", 2)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardC = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("left", 3)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardDStart = () => {
  return (
    <sqm-referral-card
      vertical-alignment="start"
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardDCenter = () => {
  return (
    <sqm-referral-card
      vertical-alignment="center"
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardDEnd = () => {
  return (
    <sqm-referral-card
      vertical-alignment="end"
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const ReferralCardAFlipped = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {media("right")}
      {sharebutton("left")}
    </sqm-referral-card>
  );
};

export const ReferralCardBFlipped = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("right", 2)}
      {sharebutton("left")}
    </sqm-referral-card>
  );
};

export const ReferralCardCFlipped = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("right", 3)}
      {sharebutton("left")}
    </sqm-referral-card>
  );
};

export const ReferralCardDFlipped = () => {
  return (
    <sqm-referral-card
      header="Share $50 with friends"
      description="They’ll get a $50 credit towards a new account and you’ll get up to $1200."
    >
      {timeline("right", 4)}
      {sharebutton("left")}
    </sqm-referral-card>
  );
};

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
