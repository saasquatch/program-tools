import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { useChildElements } from "../../tables/useChildElements";
import { TimelineReward } from "./sqm-timeline-entry";

/**
 * @uiName Program Timeline
 * @slots [{"name":"","title":"Timeline","validChildren":["sqm-timeline-entry"]}]
 * @exampleGroup Common Components
 * @examples Program Timeline - <sqm-timeline icon="circle"> <sqm-timeline-entry reward="$50" unit="visa giftcard" desc="You refer a friend" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$200" unit="visa giftcard" desc="Our sales team qualifies your friend as a good fit for our Enterprise plan" icon="circle" > </sqm-timeline-entry> <sqm-timeline-entry reward="$1000" unit="visa giftcard" desc="Your friend purchases an Enterprise plan" icon="circle" > </sqm-timeline-entry></sqm-timeline>
*/
@Component({
  tag: "sqm-timeline",
  shadow: true,
})
export class Timeline {
  @State()
  ignored = true;

  /**
   * @uiName Icon
   * @uiType string
   * @uiEnum ["gift", "circle"]
   * @uiEnumNames ["Gift", "Circle"]
   */
  @Prop() icon: "gift" | "circle" = "gift";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
 
    const rewards = useChildElements<TimelineReward>();

    rewards.forEach((reward) => {
      try {
        reward.setIcon(this.icon);
      } catch {
        // incase child is not sqm-timeline-entry
      }
    });

    const vanillaStyle = `
		:host{
			display: block;   
		}

		::slotted(*:not(:only-child):not(:last-child)) {
			margin-bottom: var(--sl-spacing-xx-large);
		}
	`;

    return (
      <div>
        <style type="text/css">{vanillaStyle}</style>
        <slot />
      </div>
    );
  }
}
