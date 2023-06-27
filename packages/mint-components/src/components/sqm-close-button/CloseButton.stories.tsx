import { h } from "@stencil/core";
import { CloseButtonView, CloseButtonViewProps } from "./sqm-close-button-view";

export default {
  title: "Components/Close Button",
  parameters: {
    // scenario,
  },
};

const defaultProps: CloseButtonViewProps = {};
const containerStyles = {
  position: "relative",
  width: "500px",
  height: "500px",
  border: "1px solid black",
  padding: "25px",
};

export const Default = () => {
  return <CloseButtonView {...defaultProps}></CloseButtonView>;
};

export const InAContainer = () => {
  return (
    <div style={containerStyles}>
      <CloseButtonView {...defaultProps}></CloseButtonView>
    </div>
  );
};

export const CustomColor = () => {
  return (
    <div style={containerStyles}>
      <CloseButtonView
        {...{ ...defaultProps, color: "blue" }}
      ></CloseButtonView>
    </div>
  );
};
