import { h } from "@stencil/core";
import scenario from "./sqm-referral-card.feature";

export default {
  title: "Components/Referral Card",
  parameters: {
    scenario,
  },
};

const media = (slot) => {
  return (
    <sqm-portal-container gap="large" slot={slot}>
      <sqm-hero-image
        header="Get rewarded when your friend uses Klip"
        image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000227/squatch-assets/IqB7GeS.png"
      ></sqm-hero-image>
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
      <sqm-portal-container gap="x-small">
        <sqm-share-button medium="email">Share via email</sqm-share-button>
        <sqm-share-button medium="facebook">Share on Facebook</sqm-share-button>
        <sqm-share-button medium="twitter">Tweet about us</sqm-share-button>
      </sqm-portal-container>
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

export const ImageAndShareButtons = () => {
  return (
    <sqm-referral-card>
      {media("left")}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const TimelineAndShareButtons = () => {
  return (
    <sqm-referral-card>
      {timeline("left", 3)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const StartAlignment = () => {
  return (
    <sqm-referral-card vertical-alignment="start">
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const CenterAlignment = () => {
  return (
    <sqm-referral-card vertical-alignment="center">
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const EndAlignment = () => {
  return (
    <sqm-referral-card vertical-alignment="end">
      {timeline("left", 4)}
      {sharebutton("right")}
    </sqm-referral-card>
  );
};

export const FlippedSlots = () => {
  return (
    <sqm-referral-card>
      {timeline("right", 3)}
      {sharebutton("left")}
    </sqm-referral-card>
  );
};

export const ReferralCardGeneric = () => {
  return (
    <sqm-referral-card vertical-alignment="center">
      <sqm-portal-container slot="left" gap="x-small">
        <div
          style={{
            padding: "100px",
            border: "1px dashed black",
            background: "#eee",
            color: "#333",
            textAlign: "center",
          }}
        >
          PLACEHOLDER
        </div>
      </sqm-portal-container>

      <sqm-portal-container slot="right" gap="x-small">
        <div
          style={{
            padding: "100px",
            border: "1px dashed black",
            background: "#eee",
            color: "#333",
            textAlign: "center",
          }}
        >
          PLACEHOLDER
        </div>
      </sqm-portal-container>
    </sqm-referral-card>
  );
};
