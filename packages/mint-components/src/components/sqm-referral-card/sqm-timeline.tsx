import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { useChildElements } from "../../tables/useChildElements";
import { TimelineReward } from "./sqm-timeline-reward";

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
   * @uiName Gift Icon
   */
  @Prop() gift: boolean = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    //@ts-ignore
    const rewards: TimelineReward[] = useChildElements();

    rewards.forEach((reward) => (reward.gift = this.gift));

    const vanillaStyle = `
		:host{
			display: block;   
		}
		::slotted(*:not(:first-child))::before {
			display: block;
			position: relative;
			content: "";
			background: var(--sl-color-primary-300);
			height: 90px;
			width: 4px;
			top: 12px;
			left: 10px;
			margin-top: -44px;
			margin-bottom: 8px;
			border-radius: 4px;
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