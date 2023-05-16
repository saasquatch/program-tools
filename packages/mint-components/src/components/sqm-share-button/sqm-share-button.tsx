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
 * @slots [{"name":"", "title":"Button Content"}]
 * @slotEditor richText
 * @uiOrder ["medium", "program-id", "*", "pill", "disabled", "hideicon"]
 * @exampleGroup Sharing
 * @example Facebook Share Button - <sqm-share-button medium="facebook">Share on Facebook</sqm-share-button>
 * @example Twitter Share Button - <sqm-share-button medium="twitter">Share via Tweet</sqm-share-button>
 * @example Email Share Button - <sqm-share-button medium="email">Share via Email</sqm-share-button>
 * @example Web Share Sheet Share Button - <sqm-share-button medium="direct">Share</sqm-share-button>
 * @example LinkedIn Share Button - <sqm-share-button medium="linkedin">Share on LinkedIn</sqm-share-button>
 * @example SMS Share Button - <sqm-share-button medium="sms">Text a friend</sqm-share-button>
 * @example Facebook Messenger Share Button - <sqm-share-button medium="fbmessenger">Share via Messenger</sqm-share-button>
 * @example WhatsApp Share Button - <sqm-share-button medium="whatsapp">Share via WhatsApp</sqm-share-button>
 * @example Line Messenger Share Button - <sqm-share-button medium="linemessenger">Share via Line Messenger</sqm-share-button>
 * @example Pinterest Share Button - <sqm-share-button medium="pinterest">Share on Pinterest</sqm-share-button>
 */
@Component({
  tag: "sqm-share-button",
  styleUrl: "sqm-share-button.scss",
  shadow: true,
})
export class ShareButton {
  /**
   * The social medium to share on. Share messages and links
   * will be pulled from your program config and tagged for analytics.
   *
   * @uiName Share medium
   * @uiType string
   * @required
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
   * @uiWidget programSelector
   */
  @Prop() programId?: string;

  //
  //  Optional styling attrs
  //

  /**
   * Configure border radius with pixel amount
   * @uiName Border radius
   */
  @Prop() borderradius?: number;
  /**
   * @uiName Button background color
   * @uiWidget color
   * @format color
   */
  @Prop() backgroundcolor?: string;
  /**
   * @uiName Button text color
   * @uiWidget color
   * @format color
   */
  @Prop() textcolor?: string;
  /**
   * @uiName Display pill
   */
  @Prop() pill?: boolean;
  /**
   * @uiName Disabled
   */
  @Prop() disabled?: boolean;
  /**
   * @uiType string
   * @uiName Button style
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
   * @uiName Button size
   * @uiType string
   * @uiEnum ["small", "medium", "large" ]
   * @uiEnumNames ["Small", "Medium", "Large"]
   */
  @Prop() size?: "small" | "medium" | "large";
  /**
   * @uiName Icon location
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
   * @uiName Hide icon
   * @default
   */
  @Prop() hideicon?: boolean = false;
  /**
   * @uiName Hide text
   * @default
   */
  @Prop() hidetext?: boolean = false;
  /**
   * Title used for native sharing (mobile only)
   * @uiName Share title
   */
  @Prop() sharetitle?: string;
  /**
   * Text used for native sharing (mobile only)
   * @uiName Share text
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
