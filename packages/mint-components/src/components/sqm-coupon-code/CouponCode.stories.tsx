import { h } from "@stencil/core";
import scenario from "./sqm-coupon-code.feature";
import { CouponCodeView, CouponCodeViewProps } from "./sqm-coupon-code-view";

export default {
  title: "Components/Coupon Code",
  parameters: {
    scenario,
  },
};

const defaultProps: CouponCodeViewProps = {
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
  return <CouponCodeView {...defaultProps} loading={true}></CouponCodeView>;
};
export const CopyButtonLoading = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      buttonStyle="button-outside"
      loading={true}
    ></CouponCodeView>
  );
};
export const CopyButtonBelowLoading = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      buttonStyle="button-below"
      loading={true}
    ></CouponCodeView>
  );
};
export const ErrorPending = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="Oops! Looks like we weren’t able to retrieve a code for you. Please try again later or contact support."
    ></CouponCodeView>
  );
};
export const ErrorCancelled = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="Oops! Your coupon code is cancelled. Please try again later or contact support."
    ></CouponCodeView>
  );
};
export const ErrorRedeemed = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="success"
      error={true}
      errorText="Oops! Your coupon code has already been redeemed. Please try again later or contact support."
    ></CouponCodeView>
  );
};
export const ErrorExpired = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="Oops! Your coupon code is expired. Please try again later or contact support."
    ></CouponCodeView>
  );
};
