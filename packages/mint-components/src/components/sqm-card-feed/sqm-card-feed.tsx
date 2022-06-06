import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { CardFeedView } from "./sqm-card-feed-view";

/**
 * @uiName Card Feed
 * @slots [{"name":"","title":"Cards"}]
 * @exampleGroup Rewards
 * @example Task Card Feed - <sqm-card-feed gap="24" width="347"> <sqm-task-card reward-amount="20" goal="1" card-title="Complete a Survey" description="Fill out our NPS survey and get 100 points for giving us honest feedback." button-text="Take survey" reward-unit="Points" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" finite="0" starts-on-message="Starts {startDate}" > </sqm-task-card> <sqm-task-card reward-amount="250" goal="500" show-progress-bar card-title="Spend $500" description="Earn 150 points when you spend $500 or more." button-text="See plans" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" progress-bar-unit="$" finite="0" reward-unit="Points" starts-on-message="Starts {startDate}" > </sqm-task-card> <sqm-task-card goal="1" reward-amount="50" card-title="Follow Us on Twitter" description="Earn 50 points when you follow us on Twitter!" button-text="Follow" button-link="https://twitter.com/" open-new-tab="true" event-key="socialFollow" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" finite="0" reward-unit="Points" starts-on-message="Starts {startDate}" > </sqm-task-card> <sqm-task-card reward-amount="1" reward-unit="Free Month" goal="1" card-title="Upgrade Your Plan" description="Receive one free month for being a committed customer when you upgrade your plan." button-text="Upgrade" completed-text="Completed {finite, select, 0 {{count, plural, =1 {{count} time} other {{count} times}}} other {{count}/{finite} times}}" ended-message="Ended {endDate}" expiry-message="Ends {endDate}" open-new-tab="false" finite="0" starts-on-message="Starts {startDate}" > </sqm-task-card> </sqm-card-feed>
 */
@Component({
  tag: "sqm-card-feed",
  shadow: true,
})
export class CardFeed {
  @State()
  ignored = true;

  /**
   * @uiName Card Width
   */
  @Prop()
  width: number = 347;

  /**
   * @uiName Column Gap
   * @uiType number
   */
  @Prop() gap: number = 24;

  /**
   * @uiName Card Background Color
   * @uiType color
   */
  @Prop() cardBackgroundColor?: string;

  /**
   * @uiName Card Text Color
   * @uiType color
   */
  @Prop() cardTextColor?: string;

  /**
   * @uiName Card Border Color
   * @uiType color
   */
  @Prop() cardBorderColor?: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <CardFeedView {...getProps(this)}>
        <slot />
      </CardFeedView>
    );
  }
}
