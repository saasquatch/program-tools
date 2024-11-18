import { h } from "@stencil/core";
import { CopyTextView } from "../views/copy-text-view";
import scenario from "./ReferralCode.feature";

export default {
  title: "Components/Referral Code",
  parameters: {
    scenario,
  },
};
export const ReferralCode = () => {
  return (
    <sqm-referral-code tooltiptext="Copied to Clipboard"></sqm-referral-code>
  );
};
export const CustomTooltipText = () => {
  return (
    <sqm-referral-code tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-referral-code>
  );
};
export const TextAlignCenter = () => {
  return <sqm-referral-code textAlign="center"></sqm-referral-code>;
};
export const TextAlignRight = () => {
  return <sqm-referral-code textAlign="right"></sqm-referral-code>;
};

export const CustomTooltipDuration = () => {
  return (
    <sqm-referral-code
      tooltiplifespan={5000}
      tooltiptext="CUSTOM TOOLTIP TEXT"
    ></sqm-referral-code>
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
