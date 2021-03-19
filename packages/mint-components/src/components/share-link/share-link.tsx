import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { ShareLinkView, ShareLinkViewProps } from "./share-link-view";
import { useShareLink } from "./useShareLink";

const DEFAULT_TOOLTIP_LIFESPAN = 1000;

/**
 * @uiName Share Link
 */
@Component({
  tag: "sqm-share-link",
  styleUrl: "share-link.css",
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
    const props = isDemo() ? useDemoShareLink(this) : useShareLink(this);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): ShareLinkViewProps {
  return {
    sharelink: "https://www.example.com/sharelink/abc",
    tooltiptext: props.tooltiptext,
    open: false,
    onClick: () => {
      // TODO: PRovide UI feedback via Admin SDK
    },
  };
}
