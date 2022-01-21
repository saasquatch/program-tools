import { h } from "@stencil/core";

export default {
  title: "Components/Referral Card",
};

export const ReferralCard = () => {
  const props = {
    medium: "facebook",
    type: "text",
    backgroundcolor: "#3b5998",
    textcolor: "#fff",
    borderradius: 8,
    iconslot: "prefix",
  } as const;
  return (
    <div>
      <sqm-referral-card
        header="Share $50 with friends"
        description="They’ll get a $50 credit towards a new account and you’ll get up to $1250."
      >
        <div slot="left">
          Get rewarded when your friend uses Klip
          <sqm-media
            image-url="https://i.imgur.com/L3aRMde.png"
            min-height="0"
          />
        </div>
        <sqm-portal-container gap="large" slot="right">
          <sqm-text>Choose how you want to share:</sqm-text>
          <sqm-text
            style={{
              fontSize: "var(--sl-font-size-medium)",
              color: "var(--sl-color-neutral-600)",
            }}
          >
            Your unique referral link:
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
