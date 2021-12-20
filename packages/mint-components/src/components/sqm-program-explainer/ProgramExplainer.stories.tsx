import { h } from "@stencil/core";
import { ProgramExplainerView } from "./sqm-program-explainer-view";
import { ProgramExplainerStepView } from "../sqm-program-explainer-step/sqm-program-explainer-step-view";

export default {
  title: "Components/Program Explainer",
};

const props = {
  header: "Klip Rewards",
  headerColor: "black",
  headerBackground: "#F3F0EC",
  cardTitle: "Earn rewards with our loyalty program",
  cardDescription:
    "Earn points by completing tasks like uploading your first video or sharing videos with friends. Use your points to redeem rewards like one free month of Klip Enterprise or two plane tickets to anywhere in North America.",
  cardColor: "black",
  cardBackground: "var(--sl-color-primary-100)",
};

const steps1 = {
  cardTitle: "Invite your friends to Klip",
  description: "Send your referral link to a friend or share it through email, Twitter, or Facebook",
  color: "white",
  background: "#5B3EDA",
  icon: "person-plus-fill",
};
const steps2 = {
  cardTitle: "If your friend signs up for a Klip Business plan",
  description: "Get a $50 VISA giftcard when they pay for their first month",
  color: "black",
  background: "#F3CC66",
  icon: "server",
};
const steps3 = {
  cardTitle: "If your friend signs up for a Klip Enterprise plan",
  description:
    "Get up to $1200 in rewards - a $200 VISA giftcard when our sales team qualifies them as a good fit for Klip, and a $1000 VISA giftcard when they become a paying customer",
  color: "black",
  background: "#D3CCF5",
  icon: "people-fill",
};

export const OneStep = () => {
  return (
    <ProgramExplainerView {...props}>
      <ProgramExplainerStepView {...steps1} />
    </ProgramExplainerView>
  );
};

export const TwoSteps = () => {
  return (
    <ProgramExplainerView {...props}>
      <ProgramExplainerStepView {...steps1} />
      <ProgramExplainerStepView {...steps2} />
    </ProgramExplainerView>
  );
};

export const ThreeSteps = () => {
  return (
    <ProgramExplainerView {...props}>
      <ProgramExplainerStepView {...steps1} />
      <ProgramExplainerStepView {...steps2} />
      <ProgramExplainerStepView {...steps3} />
    </ProgramExplainerView>
  );
};
