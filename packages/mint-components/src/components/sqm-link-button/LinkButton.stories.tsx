import { h } from "@stencil/core";
import scenario from "./sqm-link-button.feature";

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
  return <sqm-link-button {...defaultProps}></sqm-link-button>;
};

export const OpenInNewTab = () => {
  return (
    <sqm-link-button
      {...{ ...defaultProps, openInNewTab: true }}
    ></sqm-link-button>
  );
};
