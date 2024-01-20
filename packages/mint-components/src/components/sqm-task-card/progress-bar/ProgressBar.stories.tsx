import { h } from "@stencil/core";
import { ProgressBar } from "../../sqm-reward-exchange-list/progressBar";
import { ProgressBarProps } from "./progress-bar-view";

export default {
  title: "Components/Progress Bar",
};

const defaultProps: ProgressBarProps = {
  progress: 2,
  goal: 4,
  //   progressBarUnit: string,
  steps: true,
};

export const TaxAndPayoutsProgressBar = () => {
  return <ProgressBar {...defaultProps} stageCount={4} currentStage={2} />;
};
