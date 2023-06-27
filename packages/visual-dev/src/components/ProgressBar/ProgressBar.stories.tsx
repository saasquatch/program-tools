import React from "react";
import { ProgressBarView } from "./ProgressBar";
export default {
  title: "Components / Progress Bar",
  component: ProgressBarView,
};

const threeSteps = [
  "Create contact properties",
  "Customize contact record section",
  "Review",
];

const sixSteps = [
  "Create contact properties",
  "Customize contact record section",
  "Create referral object",
  "Customize referral object view",
  "Sync settings",
  "Review",
];

const twelveSteps = [
  "Create contact properties",
  "Customize contact record section",
  "Create referral object",
  "Customize referral object view",
  "Sync settings",
  "Create",
  "Read",
  "Update",
  "Delete",
  "Edit",
  "Confirm all fields are correct",
  "Review",
];

const longNameSteps = [
  "Create contact properties",
  "Customize contact record section",
  "Create referral object",
  "Customize referral object view",
  "Sync settings",
  "Step six has a really really long name, but that's okay because the text will wrap accordingly",
];

const defaultProps = {
  steps: threeSteps,
  currentStep: 0,
};

export const ThreeSteps = () => {
  return <ProgressBarView {...defaultProps} currentStep={1} />;
};

export const SixSteps = () => {
  return <ProgressBarView {...defaultProps} steps={sixSteps} currentStep={4} />;
};

export const TwelveSteps = () => {
  return (
    <ProgressBarView {...defaultProps} steps={twelveSteps} currentStep={8} />
  );
};
export const WithLongName = () => {
  return (
    <ProgressBarView {...defaultProps} steps={longNameSteps} currentStep={2} />
  );
};

export const WithCustomColor = () => {
  return (
    <ProgressBarView {...defaultProps} currentStep={2} barColor="tomato" />
  );
};
