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
  couponCodeLabel: "Your coupon code:",
  error: false,
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
export const CopyButtonCustomLabel = () => {
  return (
    <sqm-coupon-code
      {...defaultProps}
      buttonStyle="button-outside"
      copy-button-label="test long custom label"
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
export const CopyButtonBelowCustomLabel = () => {
  return (
    <sqm-coupon-code
      {...defaultProps}
      buttonStyle={"button-below"}
      copy-button-label="test long custom label"
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

export const ErrorGeneric = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="We couldn't fetch your code. Please try again later or reach out to the Support team for help resolving this issue."
    ></CouponCodeView>
  );
};
export const ErrorPending = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="info"
      error={true}
      errorText="Your code will be available on April 24, 2023. Mark your calendar and come back then to redeem your reward!"
    ></CouponCodeView>
  );
};
export const ErrorFullfillment = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="We couldn't fetch your code. Please try again later or reach out to the Support team for help resolving this issue."
    ></CouponCodeView>
  );
};
export const ErrorCancelled = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="This code has been cancelled. Please reach out to the Support team for help resolving this issue."
    ></CouponCodeView>
  );
};

export const ErrorExpired = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="warning"
      error={true}
      errorText="Looks like this code has expired. Please reach out to the Support team for help resolving this issue."
    ></CouponCodeView>
  );
};
export const ErrorRedeemed = () => {
  return (
    <CouponCodeView
      {...defaultProps}
      errorType="success"
      error={true}
      errorText="Looks like you’ve already redeemed this code."
    ></CouponCodeView>
  );
};
