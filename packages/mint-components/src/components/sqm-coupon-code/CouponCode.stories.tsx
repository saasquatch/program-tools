import { h } from "@stencil/core";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import scenario from "./sqm-coupon-code.feature";

export default {
  title: "Components/Coupon Code",
  parameters: {
    scenario,
  },
};

const defaultProps: CopyTextViewProps = {
  tooltiptext: "Copied to Clipboard",
  copyString: "THANKSJANE125uv125",
  open: false,
  copyButtonLabel: "Copy Coupon",
  inputPlaceholderText: "CODE ERROR",
  error: true,
};

export const CouponCode = () => {
  return <sqm-coupon-code tooltiptext="Copied to Clipboard"></sqm-coupon-code>;
};
export const CustomTooltipText = () => {
  return <sqm-coupon-code tooltiptext="CUSTOM TOOLTIP TEXT"></sqm-coupon-code>;
};
export const CustomTooltipDuration = () => {
  return (
    <sqm-coupon-code
      tooltiplifespan={5000}
      tooltiptext="CUSTOM TOOLTIP TEXT"
    ></sqm-coupon-code>
  );
};
export const TextAlignCenter = () => {
  return <sqm-coupon-code textAlign="center"></sqm-coupon-code>;
};
export const TextAlignRight = () => {
  return <sqm-coupon-code textAlign="right"></sqm-coupon-code>;
};
export const CopyButton = () => {
  return (
    <sqm-coupon-code
      {...defaultProps}
      buttonStyle="button-outside"
    ></sqm-coupon-code>
  );
};
export const CopyButtonBelow = () => {
  return (
    <sqm-coupon-code
      {...defaultProps}
      buttonStyle={"button-below"}
    ></sqm-coupon-code>
  );
};

export const Loading = () => {
  return <CopyTextView {...defaultProps} loading={true}></CopyTextView>;
};
export const CopyButtonLoading = () => {
  return (
    <CopyTextView
      {...defaultProps}
      buttonStyle="button-outside"
      loading={true}
    ></CopyTextView>
  );
};
export const CopyButtonBelowLoading = () => {
  return (
    <CopyTextView
      {...defaultProps}
      buttonStyle="button-below"
      loading={true}
    ></CopyTextView>
  );
};
export const ErrorPending = () => {
  return (
    <CopyTextView
      {...defaultProps}
      error={true}
      errorText="Oops! Looks like we weren’t able to retrieve a code for you. Please try again later or contact support."
    ></CopyTextView>
  );
};
export const ErrorCancelled = () => {
  return (
    <CopyTextView
      {...defaultProps}
      error={true}
      errorText="Oops! Your coupon code is cancelled. Please try again later or contact support."
    ></CopyTextView>
  );
};
export const ErrorRedeemed = () => {
  return (
    <CopyTextView
      {...defaultProps}
      error={true}
      errorText="Oops! Your coupon code has already been redeemed. Please try again later or contact support."
    ></CopyTextView>
  );
};
export const ErrorExpired = () => {
  return (
    <CopyTextView
      {...defaultProps}
      error={true}
      errorText="Oops! Your coupon code is expired. Please try again later or contact support."
    ></CopyTextView>
  );
};
export const ErrorButtonBelow = () => {
  return (
    <CopyTextView
      {...defaultProps}
      error={true}
      errorText="Oops! Your coupon code is expired. Please try again later or contact support."
      buttonStyle="button-below"
    ></CopyTextView>
  );
};
