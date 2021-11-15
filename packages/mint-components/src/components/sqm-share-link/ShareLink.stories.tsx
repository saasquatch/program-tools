import { h } from "@stencil/core";
import { ShareLinkView } from "./sqm-share-link-view";

export default {
  title: "Components/Share Link",
};

export const Default = () => {
  const props = {
    shareString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
  };
  return <ShareLinkView {...props} />;
};

export const Tooltip = () => {
  const props = {
    shareString: "https://noah.example.com",
    tooltiptext: "Some text for the tooltip",
    open: true,
  };
  return <ShareLinkView {...props} />;
};

export const Disabled = () => {
  const props = {
    shareString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
  };
  return <ShareLinkView {...props} />;
};


export const FullStack = () => {
  return <sqm-share-link></sqm-share-link>;
};