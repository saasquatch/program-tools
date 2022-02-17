import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { useChildElements } from "../../tables/useChildElements";
import { TimelineReward } from "./sqm-timeline-entry";

/**
 * @uiName Timeline
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
