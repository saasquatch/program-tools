import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { useShareLink } from "./useShareLink";
import { getProps } from "../../utils/utils";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Share Link
 * @exampleGroup Sharing
 * @example Share Link - <sqm-share-link tooltip-text="Copied to Clipboard" tooltip-lifespan="1000"></sqm-share-link>
 */
@Component({
  tag: "sqm-share-link",
  shadow: true,
})
export class ShareLink {
  /**
   * The ID of the program that should generate the link. Defaults to the program ID in context where this widget is loaded.
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
   * Change the text alignment
   *
   * @uiName Share link alignment
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop({
    attribute: "text-align",
  })
  textAlign?: "left" | "center" | "right" = "left";

  /**
   * @uiName Copy button label
   */
  @Prop({
    attribute: "copy-button-label",
  })
  copyButtonLabel: string = "Copy Link";

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
      ? useDemoShareLink(thisProps)
      : useShareLink(thisProps);
    return <CopyTextView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): CopyTextViewProps {
  const [open, setOpen] = useState(false);
  const copyString = "https://www.example.com/sharelink/abc";
  return deepmerge(
    {
      copyString: copyString,
      tooltiptext: props.tooltiptext,
      textAlign: props.textAlign,
      buttonStyle: props.buttonStyle,
      copyButtonLabel: props.copyButtonLabel,
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
