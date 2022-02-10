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
   */
  @Prop() icon: "gift" | "circle" = "gift";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    //@ts-ignore
    const rewards: TimelineReward[] = useChildElements();

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

		// ::slotted(*:not(:only-child):not(:first-child)) * {
		// 	background: yellow;
		// }

		// ::slotted(*:not(:only-child):not(:first-child))::before {
		// 	display: block;
		// 	content: "";
		// 	position: relative;
		// 	height: 65px;
		// 	width: 4px;
		// 	top: -15px;
		// 	left: 50px;
		// 	margin-top: -44px;
		// 	margin-bottom: -15px;
		// 	border-radius: 4px;
		// 	background: red;
		// }
	`;

    return (
      <div>
        <style type="text/css">{vanillaStyle}</style>
        <slot />
      </div>
    );
  }
}
