import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { ShareLinkView, ShareLinkViewProps } from "./sqm-share-link-view";
import { useShareLink } from "./useShareLink";
import { getProps } from "../../utils/utils";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Share Link
 * @exampleGroup Referrals
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
   */
  @Prop() programId?: string;
  /**
   * This is shown after someone has successfully copied the link to the clipboard.
   *
   * @uiName Tooltip Text
   */
  @Prop({
    attribute: "tooltip-text",
  })
  tooltiptext: string = "Copied to Clipboard";
  /**
   * The number of milliseconds that the tooltip will appear for
   *
   * @uiName Tooltip Lifespan
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
      ? useDemoShareLink(thisProps)
      : useShareLink(thisProps);
    return <ShareLinkView {...props} />;
  }
}

function useDemoShareLink(props: ShareLink): ShareLinkViewProps {
  const [open, setOpen] = useState(false);
  const shareString = "https://www.example.com/sharelink/abc";
  return deepmerge(
    {
      shareString,
      tooltiptext: props.tooltiptext,
      open,
      onClick: () => {
        // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
        // Only if called from a user-initiated event
        navigator.clipboard.writeText(shareString);
        setOpen(true);
        setTimeout(() => setOpen(false), props.tooltiplifespan);
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
