import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";
import { ReferralCardView } from "./sqm-referral-card-view";
import { useChildElements } from "../../tables/useChildElements";

/**
 * @uiName Referral Card
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqb-program-section","sqb-conditional-section"]
 * @validChildren ["div","sqm-portal-container","p","sqm-timeline","h1","h2","h3","h5","h4","sqm-pagination","sqm-qr-code","sqm-referral-code","sqm-referral-codes","sqm-share-code","sqm-share-link","sqm-text","span"]
 * @exampleGroup Referrals
 * @slots [{"name":"left", "title":"Left Content"},{"name":"right", "title":"Right Content"},{"name":"header", "title":"Header Content"},{"name":"footer", "title":"Footer Content"}]
 * @example Referral Card - <sqm-referral-card vertical-alignment="start"> <sqm-portal-container gap="large" slot="left" direction="column" display="grid" max-width="100%" padding="none" > <sqm-text >They’ll get a $50 credit towards a new account and you’ll get: </sqm-text> <sqm-timeline icon="circle"> <sqm-timeline-entry reward="$50" unit="visa giftcard" desc="Your friend purchases a Business plan" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$200" unit="visa giftcard" desc="Our sales team qualifies your friend as a good fit for our Enterprise plan" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$1000" unit="visa giftcard" desc="Your friend purchases an Enterprise plan" icon="circle" > </sqm-timeline-entry> </sqm-timeline> </sqm-portal-container> <sqm-portal-container gap="large" slot="right" direction="column" display="grid" max-width="100%" padding="none" > <sqm-text>Choose how you want to share: </sqm-text> <sqm-text> <sub>Your unique referral link:</sub> <sqm-share-link tooltip-text="Copied to Clipboard" tooltip-lifespan="1000" > </sqm-share-link> </sqm-text> <sqm-portal-container gap="x-small" direction="column" display="grid" max-width="100%" padding="none" > <sqm-share-button medium="email" icon-slot="prefix" size="medium" type="default" > Share via email </sqm-share-button> <sqm-share-button medium="linkedin" icon-slot="prefix" size="medium" type="default" > Share on LinkedIn </sqm-share-button> <sqm-share-button medium="twitter" icon-slot="prefix" size="medium" type="default" > Share on Twitter </sqm-share-button> </sqm-portal-container> </sqm-portal-container> </sqm-referral-card>
 * */

@Component({
  tag: "sqm-referral-card",
  shadow: true,
})
export class ReferralCard {
  @State()
  ignored = true;

  /**
   * @uiName Vertical alignment
   * @uiType string
   * @uiEnum ["start", "center", "end"]
   * @uiEnumNames ["Top", "Center", "Bottom"]
   */
  @Prop() verticalAlignment: "start" | "center" | "end" = "start";

  /**
   * @uiName Hide border
   * @uiType boolean
   */
  @Prop() hideBorder: boolean = false;

  /**
   * @uiName Top padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingTop: string = "large";
  /**
   * @uiName Right padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingRight: string = "large";
  /**
   * @uiName Bottom padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingBottom: string = "large";
  /**
   * @uiName Left padding
   * @uiGroup Padding
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingLeft: string = "large";

  /**
   * @uiName Background color
   * @uiWidget color
   * @uiType string
   */
  @Prop() backgroundColor?: string;

  /**
   * Border color of container
   * @uiName Border color
   * @uiWidget color
   * @format color
   */
  @Prop() borderColor?: string;

  /**
   * Color of the text and copy icon
   * @uiName Text color
   * @uiWidget color
   * @format color
   */
  @Prop() textColor?: string;

  /**
   * The border radius (in pixels)
   * @uiName Border Radius
   * @uiType number
   */
  @Prop() borderRadius?: number;

  /**
   * @uiName Limit width
   * @uiType boolean
   */
  @Prop() limitWidth: boolean = false;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const slots = {
      left: <slot name="left" />,
      right: <slot name="right" />,
      header: <slot name="header" />,
      footer: <slot name="footer" />,
    };

    const children = useChildElements<Element>();

    const hasHeader =
      children.findIndex((child) => child.slot === "header") > -1;

    const hasFooter =
      children.findIndex((child) => child.slot === "footer") > -1;

    return (
      <ReferralCardView
        {...getProps(this)}
        slots={slots}
        hasHeader={hasHeader}
        hasFooter={hasFooter}
      >
        <slot />
      </ReferralCardView>
    );
  }
}
