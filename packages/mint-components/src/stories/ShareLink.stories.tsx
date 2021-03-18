import { h } from "@stencil/core";
import { ShareLinkView } from "../components/share-link/share-link-view";

export default {
  title: "Share Link",
};

export const Default = () => {
  const props = {
    sharelink: "https://noah.example.com",
    open: false,
  };
  return <ShareLinkView {...props} />;
};

export const Tooltip = () => {
  const props = {
    sharelink: "https://noah.example.com",
    tooltiptext: "Some text for the tooltip",
    open: true,
  };
  return <ShareLinkView {...props} />;
};

export const Disabled = () => {
  const props = {
    sharelink: "https://noah.example.com",
    disabled: true,
    open: true,
  };
  return <ShareLinkView {...props} />;
};
