import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { ShareLinkView, ShareLinkViewProps } from "./share-link-view";
import { useShareLink } from "./useShareLink";
import { getProps } from "../../utils/utils";

const DEFAULT_TOOLTIP_LIFESPAN = 1000;

/**
 * @uiName Share Link
 */
@Component({
  tag: "sqm-share-link",
  styleUrl: "share-link.scss",
  shadow: true,
})
export class ShareLink {
  /**
   * The ID of the program that should generate the link. Defaults to the program ID in context where this widget is loaded.
   *
   * @uiName Program ID
   */
  @Prop() programId?: string;
  /**
   * This is shown after someone has successfully copied the link to the clipboard.
   *
   * @uiName Tooltip text
   */
  @Prop({
    attribute: "tooltip-text",
  })
  tooltiptext: string = "Copied to Clipboard";
  /**
   * The number of milliseconds that the tooltip will appear for
   *
   * @uiName Tooltip lifespan
   */
  @Prop({
    attribute: "tooltip-lifespan",
  })
  tooltiplifespan: number = DEFAULT_TOOLTIP_LIFESPAN;


  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this)
    const props = isDemo() ? useDemoShareLink(thisProps) : useShareLink(thisProps);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): ShareLinkViewProps {
  const [open, setOpen] = useState(false);
  const sharelink = "https://www.example.com/sharelink/abc";
  return {
    sharelink,
    tooltiptext: props.tooltiptext,
    open,
    onClick: () => {
      // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
      // Only if called from a user-initiated event
      navigator.clipboard.writeText(sharelink);
      setOpen(true);
      setTimeout(() => setOpen(false), props.tooltiplifespan);
    },
  };
}
