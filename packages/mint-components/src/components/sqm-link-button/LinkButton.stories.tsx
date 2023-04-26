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
};

export const Default = () => {
  return (
    <LinkButtonView {...defaultProps}>
      <span>Test Slot Content</span>
    </LinkButtonView>
  );
};

export const OpenInNewTab = () => {
  return (
    <LinkButtonView {...{ ...defaultProps, openInNewTab: true }}>
      <span>Test Slot Content</span>
    </LinkButtonView>
  );
};
