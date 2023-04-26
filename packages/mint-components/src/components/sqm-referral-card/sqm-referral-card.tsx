import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";
import { ReferralCardView } from "./sqm-referral-card-view";

/**
 * @uiName Referral Card
 * @exampleGroup Referrals
 * @slots [{"name":"left", "title":"Left Content"},{"name":"right", "title":"Right Content"},{"name":"header", "title":"Header Content"},{"name":"footer", "title":"Footer Content"}]
 * @example Referral Card - <sqm-referral-card vertical-alignment="start"> <sqm-portal-container gap="large" slot="left" direction="column" display="grid" max-width="100%" padding="none" > <sqm-text >They’ll get a $50 credit towards a new account and you’ll get: </sqm-text> <sqm-timeline icon="circle"> <sqm-timeline-entry reward="$50" unit="visa giftcard" desc="Your friend purchases a Business plan" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$200" unit="visa giftcard" desc="Our sales team qualifies your friend as a good fit for our Enterprise plan" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$1000" unit="visa giftcard" desc="Your friend purchases an Enterprise plan" icon="circle" > </sqm-timeline-entry> </sqm-timeline> </sqm-portal-container> <sqm-portal-container gap="large" slot="right" direction="column" display="grid" max-width="100%" padding="none" > <sqm-text>Choose how you want to share: </sqm-text> <sqm-text> <sub>Your unique referral link:</sub> <sqm-share-link tooltip-text="Copied to Clipboard" tooltip-lifespan="1000" > </sqm-share-link> </sqm-text> <sqm-portal-container gap="x-small" direction="column" display="grid" max-width="100%" padding="none" > <sqm-share-button medium="email" icon-slot="prefix" size="medium" type="default" > Share via email </sqm-share-button> <sqm-share-button medium="linkedin" icon-slot="prefix" size="medium" type="default" > Share on LinkedIn </sqm-share-button> <sqm-share-button medium="twitter" icon-slot="prefix" size="medium" type="default" > Share on Twitter </sqm-share-button> </sqm-portal-container> </sqm-portal-container> </sqm-referral-card>
 */
@Component({
  tag: "sqm-referral-card",
  shadow: true,
})
export class ReferralCard {
  @State()
  ignored = true;

  /**
   * @uiName Vertical aligment
   * @uiType string
   * @uiEnum ["start", "center", "end"]
   * @uiEnumNames ["Top", "Center", "Bottom"]
   */
  @Prop() verticalAlignment: "start" | "center" | "end" = "start";

  /**
   * @uiName Remove border
   * @uiType boolean
   */
  @Prop() removeBorder: boolean = false;

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
  @Prop() backgroundColor: string = "#ffffff";

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

    return (
      <ReferralCardView {...getProps(this)} slots={slots}>
        <slot />
      </ReferralCardView>
    );
  }
}
