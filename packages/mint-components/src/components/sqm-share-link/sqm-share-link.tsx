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
   * @uiName Tooltip Text
   */
  @Prop({
    attribute: "tooltip-text",
  })
  tooltiptext: string = "Copied to Clipboard";

  /**
   * The number of milliseconds that the tooltip appears for
   *
   * @uiName Tooltip Lifespan
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
  copyButtonLabel: string = "Copy Link";

  /**
   * Set the copy button position
   *
   * @uiName Copy button position
   * @uiType string
   * @uiEnum ["inside", "outside", "below"]
   * @uiEnumNames ["inside", "outside", "below"]
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
