import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import {
  ShareLinkView,
  ShareLinkViewProps,
} from "../sqm-share-link/sqm-share-link-view";
import { getProps } from "../../utils/utils";
import { useShareCode } from "./useShareCode";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";
import { useRef } from "@saasquatch/universal-hooks";

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
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<ShareLinkViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoShareCode(thisProps)
      : useShareCode(thisProps);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareCode(props: ShareCode): ShareLinkViewProps {
  const [open, setOpen] = useState(false);
  const shareString = "SHARECODE001";

  const [input, setInput] = useState<HTMLInputElement>(undefined);

  return deepmerge(
    {
      shareString,
      tooltiptext: props.tooltiptext,
      open,
      setInput,
      onClick: () => {
        // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
        // Only if called from a user-initiated event
        if (navigator?.clipboard) {
          navigator.clipboard.writeText(shareString);
        } else {
          input?.select();
          input?.setSelectionRange(0, 99999);
          try {
            document.execCommand("copy");
          } catch (err) {
            console.log("Error while copying to clipboard: " + err);
          }
        }
        setOpen(true);
        setTimeout(() => setOpen(false), props.tooltiplifespan);
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
