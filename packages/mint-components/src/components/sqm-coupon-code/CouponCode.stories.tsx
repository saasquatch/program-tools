import { h } from "@stencil/core";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";

export default {
  title: "Components/Coupon Code",
  parameters: {
    // scenario,
  },
};

const defaultProps: CopyTextViewProps = {
  tooltiptext: "Copied to Clipboard",
  copyString: "test",
  open: false,
  copyButtonLabel: "Copy Coupon",
};

export const CouponCode = () => {
  return <sqm-coupon-code tooltiptext="Copied to Clipboard"></sqm-coupon-code>;
};
export const CustomTooltipText = () => {
  return <sqm-coupon-code tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-coupon-code>;
};
export const TextAlignCenter = () => {
  return <sqm-coupon-code textAlign="center"></sqm-coupon-code>;
};
export const CopyButton = () => {
  return <sqm-coupon-code isCopyIcon={false}></sqm-coupon-code>;
};
export const CopyButtonInside = () => {
  return (
    <CopyTextView
      {...defaultProps}
      buttonPosition={"inside"}
      isCopyIcon={false}
    ></CopyTextView>
  );
};
export const CopyButtonBelow = () => {
  return (
    <CopyTextView
      {...defaultProps}
      buttonPosition={"below"}
      isCopyIcon={false}
    ></CopyTextView>
  );
};
export const CustomTooltipDuration = () => {
  return (
    <sqm-coupon-code
      tooltiplifespan={5000}
      tooltiptext="CUSTOM TOOLTIP TEXT"
    ></sqm-coupon-code>
  );
};
