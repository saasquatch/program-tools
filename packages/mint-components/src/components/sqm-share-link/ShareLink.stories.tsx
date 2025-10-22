import { h } from "@stencil/core";
import { CopyTextView } from "../views/copy-text-view";
import scenario from "./ShareLink.feature";

export default {
  title: "Components/Share Link",
  parameters: {
    scenario,
  },
};

export const Default = () => {
  const props = {
    copyString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
  };
  return <CopyTextView {...props} />;
};

export const Tooltip = () => {
  const props = {
    copyString: "https://noah.example.com",
    tooltiptext: "Some text for the tooltip",
    open: true,
  };
  return <CopyTextView {...props} />;
};

export const Disabled = () => {
  const props = {
    copyString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
  };
  return <CopyTextView {...props} />;
};
export const Error = () => {
  const props = {
    copyString: "https://noah.example.com",
    disabled: true,
    open: true,
    tooltiptext: "Copied!",
    error: true,
  };
  return <CopyTextView {...props} />;
};
export const TextAlignCenter = () => {
  return <sqm-share-link textAlign="center"></sqm-share-link>;
};
export const TextAlignRight = () => {
  return <sqm-share-link textAlign="right"></sqm-share-link>;
};

export const CopyButton = () => {
  return (
    <CopyTextView
      {...{
        copyString: "https://noah.example.com",
        open: false,
        tooltiptext: "Copied!",
        isCopyIcon: false,
      }}
    ></CopyTextView>
  );
};
export const CopyButtonBelow = () => {
  return (
    <CopyTextView
      {...{
        copyString: "https://noah.example.com",
        open: false,
        tooltiptext: "Copied!",
        buttonStyle: "button-below",
      }}
    ></CopyTextView>
  );
};

export const CustomStyles = () => {
  const props = {
    copyString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
    backgroundColor: "#1ed760",
    borderRadius: "30px",
    textColor: "#121212",
    buttonType: "primary" as const,
  };
  return <CopyTextView {...props} />;
};

export const CustomStylesWithDemoHooks = () => {
  const props = {
    copyString: "https://noah.example.com",
    open: false,
    tooltiptext: "Copied!",
    backgroundColor: "#1ed760",
    borderRadius: "30px",
    textColor: "red",
    buttonType: "primary" as const,
    borderColor: "#121212",
  };
  return (
    <sqm-share-link
      demoData={{ ...props }}
      backgroundColor="#1ed760"
    ></sqm-share-link>
  );
};
export const FullStack = () => {
  return <sqm-share-link></sqm-share-link>;
};
