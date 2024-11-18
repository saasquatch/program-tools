import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { useReferralCode } from "./useReferralCode";

/**
 * @uiName Referral Code
 * @exampleGroup Sharing
 * @example Referral Code - <sqm-referral-code tooltip-text="Copied to Clipboard" tooltip-lifespan="1000"></sqm-referral-code>
 */
@Component({
  tag: "sqm-referral-code",
  shadow: true,
})
export class ReferralCode {
  /**
   * The ID of the program that should generate the code. Defaults to the program ID in context where this widget is loaded.
   *
   * @uiName Program ID
   * @uiWidget programSelector
   */
  @Prop() programId?: string;
  /**
   * Shown inside a tooltip after someone has successfully copied the link to their clipboard
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
   * Change the text alignment
   *
   * @uiName referral code alignment
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
  copyButtonLabel?: string = "Copy Code";

  /**
   * Set the copy button style and placement
   *
   * @uiName Style
   * @uiType string
   * @uiEnum ["icon", "button-outside", "button-below"]
   * @uiEnumNames ["Icon", "Button outside", "Button below"]
   */
  @Prop({
    attribute: "copy-button-style",
  })
  buttonStyle?: "icon" | "button-outside" | "button-below" = "icon";

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
      ? useDemoReferralCode(thisProps)
      : useReferralCode(thisProps);
    return <CopyTextView {...props} />;
  }
}

function useDemoReferralCode(props: ReferralCode): CopyTextViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "REFERRALCODE001";
  return deepmerge(
    {
      copyString: copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      copyButtonLabel: props.copyButtonLabel,
      buttonStyle: props.buttonStyle,
      rewardStatus: "AVAILABLE",
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
