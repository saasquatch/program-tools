import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { isDemo } from "@saasquatch/component-boilerplate";
import { ShareButtonView, ShareButtonViewProps } from "./sqm-share-button-view";
import { useShareButton } from "./useShareButton";
import { getProps } from "../../utils/utils";
import { DemoData } from "../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Share Button
 * @uiOrder ["medium", "program-id", "*", "pill", "disabled", "hideicon"]
 */
@Component({
  tag: "sqm-share-button",
  styleUrl: "sqm-share-button.scss",
  shadow: true,
})
export class ShareButton {
  //
  //  Required attrs to make it work
  //
  /// TOOD: Add all the share mediums
  // Should be a REQUIRED prop

  /**
   * The social medium to share on. Share messages and links
   * will be pulled from your program config and tagged for analytics.
   *
   * @uiName Share Medium
   * @uiType string
   * @uiEnum ["facebook", "twitter", "email", "direct", "linkedin", "sms", "fbmessenger", "whatsapp", "linemessenger", "pinterest", "reminder", "unknown" ]
   * @uiEnumNames ["Facebook", "Twitter", "Email", "Web Share Sheet", "Linkedin", "SMS", "Facebook Messenger", "Whatsapp", "Line Messenger", "Pinterest", "Reminder", "Unknown"]
   */
  @Prop() medium:
    | "facebook"
    | "twitter"
    | "email"
    | "direct"
    | "linkedin"
    | "sms"
    | "fbmessenger"
    | "whatsapp"
    | "linemessenger"
    | "pinterest"
    | "reminder"
    | "unknown";
  /**
   * Optional programId, or uses the programId context where this button is rendered.
   *
   * @uiName Program ID
   */
  @Prop() programId?: string;

  //
  //  Optional styling attrs
  //

  /**
   * @uiName Display as pill
   */
  @Prop() pill?: boolean;
  /**
   * @uiName Disabled
   */
  @Prop() disabled?: boolean;
  /**
   * @uiType string
   * @uiName Button Style
   * @uiEnum ["primary" , "success", "info", "warning", "danger", "default", "text" ]
   */
  @Prop() type?:
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "default"
    | "text" = "default";
  /**
   * @uiName Button Size
   * @uiType string
   * @uiEnum ["small", "medium", "large" ]
   * @uiEnumNames ["Small", "Medium", "Large"]
   */
  @Prop() size?: "small" | "medium" | "large";
  /**
   * @uiName Icon Location
   * @uiType string
   * @uiEnum ["prefix", "suffix" ]
   * @uiEnumNames ["Prefix", "Suffix"]
   */
  @Prop() iconslot?: "prefix" | "suffix" = "prefix";
  /**
   * @uiName Icon used in button. Will try to select an icon based on the share medium if left empty.
   */
  @Prop() icon?: string;
  /**
   * @uiName Hide the icon
   */
  @Prop() hideicon?: boolean = false;
  /**
   * @uiName Hide the text
   */
  @Prop() hidetext?: boolean = false;
  /**
   * @uiName Title used for native sharing (mobile only)
   */
  @Prop() sharetitle?: string;
  /**
   * @uiName Text used for native sharing (mobile only)
   */
  @Prop() sharetext?: string;

  /** @undocumented */
  @Prop() demoData?: DemoData<ShareButtonViewProps>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const thisProps = getProps(this);
    const props = isDemo()
      ? useDemoShareButton(thisProps)
      : useShareButton(thisProps);
    return (
      <ShareButtonView {...props}>
        <slot />
      </ShareButtonView>
    );
  }
}

function useDemoShareButton(props: ShareButton): ShareButtonViewProps {
  return deepmerge(
    {
      medium: props.medium,
      loading: false,
      disabled: props.disabled,
      pill: props.pill,
      type: props.type,
      size: props.size,
      hideicon: props.hideicon,
      iconslot: props.iconslot,
      icon: props.icon,
      hide: false,
      onClick: () => {
        // TODO: PRovide visual feedback
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
