import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { getProps } from "../../utils/utils";
import { useCouponCode } from "./useCouponCode";
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
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign: "left" | "center" = "left";
  /**
   * Set copy button as icon
   *
   * @uiName Copy icon
   */
  @Prop({
    attribute: "is-copy-icon",
  })
  isCopyIcon: boolean = true;

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
   * Set the copy button position
   *
   * @uiName Copy button position
   */
  @Prop({
    attribute: "copy-button-position",
  })
  buttonPosition: "inside" | "outside" | "below" = "outside";

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
    return <CopyTextView {...props} />;
  }
}

function useDemoCouponCode(props: CouponCode): CopyTextViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "THANKSJANE125uv125";
  return deepmerge(
    {
      copyString,
      tooltiptext: props.tooltiptext,
      isCopyIcon: props.isCopyIcon,
      textAlign: props.textAlign,
      buttonPosition: props.buttonPosition,
      copyButtonLabel: props.copyButtonLabel,
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
