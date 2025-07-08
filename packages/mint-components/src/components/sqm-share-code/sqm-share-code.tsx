import { isDemo } from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { getProps } from "../../utils/utils";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { useShareCode } from "./useShareCode";

/**
 * @uiName Share Code
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqb-program-section","sqb-conditional-section"]
 * @exampleGroup Sharing
 * @example Share Code - <sqm-share-code tooltip-text="Copied to Clipboard" tooltip-lifespan="1000"></sqm-share-code>
 */
@Component({
  tag: "sqm-share-code",
  shadow: true,
})
export class ShareCode {
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
   * @uiName Share code alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   * @uiGroup Style
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign: "left" | "center" | "right" = "left";

  /**
   * Background color of share link container
   * @uiName Background color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() backgroundColor?: string;

  /**
   * Color of the text and copy icon
   * @uiName Text color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() textColor?: string;

  /**
   * The border radius on the share link container (in pixels)
   * @uiName Border Radius
   * @uiType number
   * @uiGroup Style
   */
  @Prop() borderRadius?: string;

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
   * @uiGroup Style
   */
  @Prop({
    attribute: "copy-button-style",
  })
  buttonStyle?: "icon" | "button-outside" | "button-below" = "icon";

  /**
   * The type of the button that is used (primary or secondary).
   * @uiName Button Type
   * @uiType string
   * @uiEnum ["primary", "secondary"]
   * @uiEnumNames ["Primary", "Secondary"]
   * @uiGroup Style
   */
  @Prop()
  buttonType?: "primary" | "secondary" = "primary";

  /**
   * Border color of share link container (default is set to 1px solid transparent)
   * @uiName Border color
   * @uiWidget color
   * @format color
   * @uiGroup Style
   */
  @Prop() borderColor?: string;

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
      ? useDemoShareCode(thisProps)
      : useShareCode(thisProps);
    return <CopyTextView {...props} />;
  }
}

function useDemoShareCode(props: ShareCode): CopyTextViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "SHARECODE001";
  return deepmerge(
    {
      copyString: copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      copyButtonLabel: props.copyButtonLabel,
      buttonStyle: props.buttonStyle,
      backgroundColor: props.backgroundColor,
      textColor: props.textColor,
      borderRadius: props.borderRadius,
      borderColor: props.borderColor,
      buttonType: props.buttonType,
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
