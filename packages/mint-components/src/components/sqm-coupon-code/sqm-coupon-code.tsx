import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { getProps } from "../../utils/utils";
import { useCouponCode } from "./useCouponCode";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";
import { CouponCodeView, CouponCodeViewProps } from "./sqm-coupon-code-view";

/**
 * @uiName Coupon Code
 * @compatibility Built for instant access
 * @exampleGroup Instant Access
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
   * @uiName Tooltip text
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
   * @uiName Coupon code alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign: "left" | "center" | "right" = "left";

  /**
   * @uiName Copy button label
   */
  @Prop({
    attribute: "copy-button-label",
  })
  copyButtonLabel: string = "Copy Coupon";

  /**
   * Set the copy button style and placement.
   *
   * @uiName Style
   * @uiType string
   * @uiEnum ["icon", "button-outside", "button-below"]
   * @uiEnumNames ["Icon", "Button outside", "Button below"]
   */
  @Prop({
    attribute: "copy-button-style",
  })
  buttonStyle: "icon" | "button-outside" | "button-below" = "icon";

  /**
   * @uiName Coupon code label
   */
  @Prop({
    attribute: "coupon-code-label",
  })
  couponCodeLabel: string = "Your coupon code:";

  /**
   * Display this message when the coupon code has been cancelled.
   *
   * @uiWidget textArea
   * @uiName Cancelled code error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "cancelled-error-text",
  })
  cancelledErrorText: string =
    "This code has been cancelled. Please reach out to the Support team for help resolving this issue.";

  /**
   * Display this message when the coupon code has already been redeemed.
   *
   * @uiWidget textArea
   * @uiName Redeemed code error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "redeemed-error-text",
  })
  redeemedErrorText: string = "Looks like you’ve already redeemed this code.";

  /**
   * Display this message when the coupon code has expired.
   *
   * @uiWidget textArea
   * @uiName Expired code error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "expired-error-text",
  })
  expiredErrorText: string =
    "Looks like this code has expired. Please reach out to the Support team for help resolving this issue.";

  /**
   * Display this message when the code fails to load due to a fulfillment error.
   *
   * @uiWidget textArea
   * @uiName Code fulfillment error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "fullfilled-error-text",
  })
  fullfillmentErrorText: string =
    "We couldn't fetch your code. Please try again later or reach out to the Support team for help resolving this issue.";

  /**
   * Display this message when the coupon code not available yet. Use the ICU message, {unpendDate}, to show the date the code will be available.
   *
   * @uiWidget textArea
   * @uiName Code pending error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "pending-error-text",
  })
  pendingErrorText: string =
    "Your code will be available on {unpendDate}. Mark your calendar and come back then to redeem your reward!";

  /**
   * Display this message when the code fails to load due to an unspecified error.
   *
   * @uiWidget textArea
   * @uiName Code retrieval error message
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "error-text",
  })
  genericErrorText: string =
    "We couldn't fetch your code. Please try again later or reach out to the Support team for help resolving this issue.";

  /**
   * Display this text when the coupon code can’t be retrieved.
   *
   * @uiName Coupon code placeholder
   * @uiGroup Coupon code error
   */
  @Prop({
    attribute: "coupon-code-placeholder",
  })
  couponCodePlaceholder: string = "...";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<CouponCodeViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoCouponCode(thisProps)
      : useCouponCode(thisProps);

    return <CouponCodeView {...props} />;
  }
}

function useDemoCouponCode(props: CouponCode): CouponCodeViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "THANKSJANE125uv125";
  return deepmerge(
    {
      copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      buttonStyle: props.buttonStyle,
      copyButtonLabel: props.copyButtonLabel,
      error: false,
      couponCodePlaceholder: props.couponCodePlaceholder,
      couponCodeLabel: props.couponCodeLabel,
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
