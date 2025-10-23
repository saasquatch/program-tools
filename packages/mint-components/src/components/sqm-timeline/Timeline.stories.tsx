import { h } from "@stencil/core";
import scenarioTimeline from "./sqm-timeline.feature";
import scenarioTimelineEntry from "./sqm-timeline-entry.feature";

const scenario = scenarioTimeline + scenarioTimelineEntry;

export default {
  title: "Components/Timeline",
  parameters: {
    scenario,
  },
};

export const TimelineWith1Reward = () => {
  return (
    <div>
      <sqm-timeline>
        <sqm-timeline-entry
          textColor="red"
          lineColor="red"
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

export const TimelineWithCustomColors = () => {
  return (
    <sqm-timeline>
      <sqm-timeline-entry
        text-color="red"
        line-color="red"
        reward="75"
        unit="points"
        desc="Your friends signs up for a free trial"
      />
      <sqm-timeline-entry
        text-color="red"
        line-color="red"
        reward="$50"
        unit="visa giftcard"
        desc="Your friends signs up for Klip Personal"
      />
      <sqm-timeline-entry
        text-color="red"
        line-color="red"
        reward="$200"
        unit="visa giftcard"
        desc="Your friend qualifies as a good fit for Klip Team"
      />
      <sqm-timeline-entry
        text-color="red"
        line-color="red"
        reward="$1000"
        unit="visa giftcard"
        desc="Your friend purchases Klip Team"
      />
    </sqm-timeline>
  );
};
