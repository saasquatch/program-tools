import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";
import { getProps } from "../../utils/utils";
import { useShareCode } from "./useShareCode";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Share Code
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
      isCopyIcon: props.isCopyIcon,
      textAlign: props.textAlign,
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
