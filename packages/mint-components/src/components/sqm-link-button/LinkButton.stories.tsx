import { h } from "@stencil/core";
import scenario from "./sqm-link-button.feature";
import { LinkButtonView } from "./sqm-link-button-view";

export default {
  title: "Components/Link Button",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  link: "https://example.com",
  openInNewTab: false,
  buttonText: "Button Text",
};

export const Default = () => {
  return <LinkButtonView {...defaultProps}></LinkButtonView>;
};

export const OpenInNewTab = () => {
  return (
    <LinkButtonView
      {...{ ...defaultProps, openInNewTab: true }}
    ></LinkButtonView>
  );
};

export const DefaultType = () => {
  return (
    <LinkButtonView
      {...{ ...defaultProps, openInNewTab: true, buttonType: "default" }}
    ></LinkButtonView>
  );
};
