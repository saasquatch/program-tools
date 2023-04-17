import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { getProps } from "../../utils/utils";
import { RewardStatusType, useCouponCode } from "./useCouponCode";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Coupon Code
 * @exampleGroup Sharing
 * @example Coupon Code - <sqm-coupon-code tooltip-text="Copied to Clipboard" tooltip-lifespan="1000"></sqm-coupon-code>
 */
@Component({
  tag: "sqm-coupon-code",
  shadow: true,
})
export class CouponCode {
  /**
   * The ID of the program that should generate the code. Defaults to the program ID in context where this widget is loaded.
   *
   * @uiName Program ID
   * @uiWidget programSelector
   */
  @Prop() programId?: string;

  /**
   * Shown inside a tooltip after someone has successfully copied the link to their clipboard.
   *
   * @uiName Tooltip Text
   */
  @Prop({
    attribute: "tooltip-text",
  })
  tooltiptext: string = "Copied to Clipboard";

  /**
   * The number of milliseconds that the tooltip appears for
   *
   * @uiName Tooltip lifespan
   */
  @Prop({
    attribute: "tooltip-lifespan",
  })
  tooltiplifespan: number = 1000;

  /**
   * Change the text alignment
   *
   * @uiName Align text
   * @uiType string
   * @uiEnum ["left", "center"]
   * @uiEnumNames ["left", "center"]
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign: "left" | "center" = "left";

  /**
   * Set copy button label
   *
   * @uiName Copy button label
   */
  @Prop({
    attribute: "copy-button-label",
  })
  copyButtonLabel: string = "Copy Coupon";

  /**
   * Set the copy button style
   *
   * @uiName Copy button style
   * @uiType string
   * @uiEnum ["icon", "button inside", "button outside", "button below"]
   * @uiEnumNames ["icon", "button inside", "button outside", "button below"]
   */
  @Prop({
    attribute: "copy-button-style",
  })
  buttonStyle: "icon" | "button inside" | "button outside" | "button below" =
    "icon";

  /**
   * Set error message
   *
   * @uiName Error message
   */
  @Prop({
    attribute: "error-text",
  })
  pendingErrorText: string = "Your reward will be available on ";

  /**
   * Set error message
   *
   * @uiName Error message
   */
  @Prop({
    attribute: "error-text",
  })
  cancelledErrorText: string =
    "Oops! Your coupon code is cancelled. Please try again later or contact support.";

  /**
   * Set error message
   *
   * @uiName Error message
   */
  @Prop({
    attribute: "error-text",
  })
  expiredErrorText: string =
    "Oops! Your coupon code is expired. Please try again later or contact support.";

  /**
   * Set error message
   *
   * @uiName Error message
   */
  @Prop({
    attribute: "error-text",
  })
  redeemedErrorText: string =
    "Oops! Your coupon code has already been redeemed. Please try again later or contact support.";

  /**
   * Set coupon code placeholder for when there there is no coupon code to display
   *
   * @uiName Coupon code placeholder
   */
  @Prop({
    attribute: "coupon-code-placeholder",
  })
  couponCodePlaceholder: string = "CODE ERROR";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CopyTextViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoCouponCode(thisProps)
      : useCouponCode(thisProps);

    const getRewardStatusText = (status: RewardStatusType) => {
      switch (status) {
        case "CANCELLED":
          return this.cancelledErrorText;
        case "PENDING":
          return `${this.pendingErrorText}${props.dateAvailable}`;
        case "EXPIRED":
          return this.expiredErrorText;
        case "REDEEMED":
          return this.redeemedErrorText;
        case "AVAILABLE":
          return "";
        case "EMPTY_TANK":
          // TODO: Replace
          return "An error happened, please contact customer support or try again later.";
        default:
          // TODO: Replace
          return "An error occurred, please contact customer support.";
      }
    };

    const errorText = getRewardStatusText(props.rewardStatus);

    return <CopyTextView {...props} errorText={errorText} />;
  }
}

function useDemoCouponCode(props: CouponCode): CopyTextViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "THANKSJANE125uv125";
  return deepmerge(
    {
      copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      buttonStyle: props.buttonStyle,
      copyButtonLabel: props.copyButtonLabel,
      rewardStatus: "AVAILABLE",
      couponCodePlaceholder: props.couponCodePlaceholder,
      open,
      onClick: () => {
        // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
        // Only if called from a user-initiated event
        navigator.clipboard.writeText(copyString);
        setOpen(true);
        setTimeout(() => setOpen(false), props.tooltiplifespan);
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}