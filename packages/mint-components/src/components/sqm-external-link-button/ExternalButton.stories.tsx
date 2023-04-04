import { h } from "@stencil/core";
import scenario from "./sqm-link-button.feature";
import { LinkButtonView } from "./sqm-link-button-view";

export default {
  title: "Components/User Identifier",
  parameters: {
    scenario,
  },
};

const defaultProps = {
  buttonSlot: <span>Test Slot Content</span>,
  link: "https://example.com",
  openInNewTab: false,
};

export const Default = () => {
  return <LinkButtonView {...defaultProps} />;
};

export const OpenInNewTab = () => {
  return <LinkButtonView {...{ ...defaultProps, openInNewTab: true }} />;
};
