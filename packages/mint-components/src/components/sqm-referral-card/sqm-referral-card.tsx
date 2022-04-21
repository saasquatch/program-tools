import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";
import { ReferralCardView } from "./sqm-referral-card-view";

/**
 * @uiName Referral Card
 * @example Card with Timeline and Sharing - <sqm-referral-card><sqm-portal-container gap="large" slot="left"><sqm-text>Get rewarded when your friend uses Klip </sqm-text><sqm-timeline icon="circle"><sqm-timeline-entry reward="75" unit="points" desc="Your friends signs up for a free trial"></sqm-timeline-entry><sqm-timeline-entry reward="$50" unit="visa giftcard" desc="Your friends signs up for Klip Business"></sqm-timeline-entry><sqm-timeline-entry reward="$200" unit="visa giftcard" desc="Your friend qualifies as a good fit for Klip Enterprise"></sqm-timeline-entry><sqm-timeline-entry reward="$1000" unit="visa giftcard" desc="Your friend purchases Klip Enterprise"></sqm-timeline-entry></sqm-timeline></sqm-portal-container><sqm-portal-container gap="large" slot="right"><sqm-text>Choose how you want to share: </sqm-text><sqm-text><sub>Your unique referral link:</sub><sqm-share-link> </sqm-share-link></sqm-text><sqm-portal-container gap="x-small"><sqm-share-button medium="email">Share via email</sqm-share-button><sqm-share-button medium="linkedin">Share on LinkedIn</sqm-share-button><sqm-share-button medium="twitter">Tweet about us</sqm-share-button><sqm-share-button medium="sms">Text a friend</sqm-share-button></sqm-portal-container></sqm-portal-container></sqm-referral-card>
 */
@Component({
  tag: "sqm-referral-card",
  shadow: true,
})
export class ReferralCard {
  @State()
  ignored = true;

  /**
   * @uiName Vertical Aligment
   * @uiType string
   * @uiEnum ["start", "center", "end"]
   * @uiEnumNames ["Start", "Center", "End"]
   */
  @Prop() verticalAlignment: "start" | "center" | "end" = "start";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const slots = {
      left: <slot name="left" />,
      right: <slot name="right" />,
    };

    return (
      <ReferralCardView {...getProps(this)} slots={slots}>
        <slot />
      </ReferralCardView>
    );
  }
}
