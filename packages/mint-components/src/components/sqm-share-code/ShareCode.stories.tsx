import { h } from "@stencil/core";
import { CopyTextView } from "../views/copy-text-view";
import scenario from "./ShareCode.feature";

export default {
  title: "Components/Share Code",
  parameters: {
    scenario,
  },
};
export const ShareCode = () => {
  return <sqm-share-code tooltiptext="Copied to Clipboard"></sqm-share-code>;
};
export const CustomTooltipText = () => {
  return <sqm-share-code tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-share-code>;
};
export const TextAlignCenter = () => {
  return <sqm-share-code textAlign="center"></sqm-share-code>;
};

export const CustomTooltipDuration = () => {
  return (
    <sqm-share-code
      tooltiplifespan={5000}
      tooltiptext="CUSTOM TOOLTIP TEXT"
    ></sqm-share-code>
  );
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
export const CopyButtonInside = () => {
  return (
    <CopyTextView
      {...{
        copyString: "https://noah.example.com",
        open: false,
        tooltiptext: "Copied!",
        buttonStyle: "button inside",
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
        buttonStyle: "button below",
      }}
    ></CopyTextView>
  );
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
