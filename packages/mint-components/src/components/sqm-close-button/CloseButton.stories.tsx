import { h } from "@stencil/core";
import { CloseButtonView, CloseButtonViewProps } from "./sqm-close-button-view";

export default {
  title: "Components/Close Button",
  parameters: {
    // scenario,
  },
};

const defaultProps: CloseButtonViewProps = {};

export const Default = () => {
  return <CloseButtonView {...defaultProps}></CloseButtonView>;
};

export const InPopup = () => {
  return <CloseButtonView {...defaultProps}></CloseButtonView>;
};
