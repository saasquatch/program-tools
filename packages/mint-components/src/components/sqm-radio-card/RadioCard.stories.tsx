import { h } from "@stencil/core";
import { RadioCardView, RadioCardViewProps } from "./sqm-radio-card-view";

export default {
  title: "Components/Radio Card",
};

const defaultProps: RadioCardViewProps = {
  selected: false,
  title: "Card Title",
  description: "Description text goes here",
  icon: "apple",
};

export const DefaultView = () => {
  return <RadioCardView {...defaultProps} />;
};

export const Selected = () => {
  return <RadioCardView {...defaultProps} selected={true} />;
};
