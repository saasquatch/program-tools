import { h, Component, Host, State } from "@stencil/core";
import { useStencilbook } from "@saasquatch/stencilbook";
import { withHooks } from "@saasquatch/stencil-hooks";
import { HookStoryAddon } from "./HookStoryAddon";
import { CucumberAddon } from "./CucumberAddon";
import * as AccountDetails from "../sqp-account-details/AccountDetails.stories";
import * as RewardsTableColumn from "../sqp-status-column/StatusColumn.stories";
import * as ReferralTableColumn from "../sqp-rewards-column/ReferralRewardColumn.stories";
// Import and add all stories to this array
const stories = [AccountDetails, RewardsTableColumn, ReferralTableColumn];

/**
 * For internal documentation
 *
 * @undocumented
 */
@Component({
  tag: "sqp-stencilbook",
})
export class SQPStencilbook {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  render() {
    const { class: Style, children } = useStencilbook(stories, {
      h,
      title: "PayPal Components",
      addons: [HookStoryAddon, CucumberAddon],
    });
    return (
      <Host class={Style} onClick={{}}>
        {children}
      </Host>
    );
  }
}
