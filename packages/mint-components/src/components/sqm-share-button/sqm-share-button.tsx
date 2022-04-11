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
   * @uiEnum ["facebook", "twitter", "email", "direct", "linkedin", "sms", "fbmessenger", "whatsapp", "linemessenger", "pinterest" ]
   * @uiEnumNames ["Facebook", "Twitter", "Email", "Web Share Sheet", "Linkedin", "SMS", "Facebook Messenger", "Whatsapp", "Line Messenger", "Pinterest"]
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
   * Configure border radius with pixel amount
   * @uiName Border Radius
   */
  @Prop() borderradius?: number;
  /**
   * @uiName Button Background Color
   * @uiWidget color
   */
  @Prop() backgroundcolor?: string;
  /**
   * @uiName Button Text Color
   * @uiWidget color
   */
  @Prop() textcolor?: string;
  /**
   * @uiName Display Pill
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
   * @uiEnumNames ["Primary", "Success", "Info", "Warning", "Danger", "Default", "Text"]
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
   * Options available at https://shoelace.style/components/icon
   *
   * Icon used in button. Will try to select an icon based on the share medium if left empty.
   *
   * @uiName Icon
   */
  @Prop() icon?: string;
  /**
   * @uiName Hide Icon
   */
  @Prop() hideicon?: boolean = false;
  /**
   * @uiName Hide Text
   */
  @Prop() hidetext?: boolean = false;
  /**
   * Title used for native sharing (mobile only)
   * @uiName Share Title
   */
  @Prop() sharetitle?: string;
  /**
   * Text used for native sharing (mobile only)
   * @uiName Share Text
   */
  @Prop() sharetext?: string;

  /**
   * @undocumented
   * @uiType object
   */
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
      ...props,
      loading: false,
      hide: false,
      onClick: () => {
        // TODO: Provide visual feedback
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
