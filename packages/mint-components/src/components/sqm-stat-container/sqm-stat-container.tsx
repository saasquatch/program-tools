import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { StatContainerView } from "./sqm-stat-container-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Stat Container
 * @slots [{"name":"","title":"Stats"}]
 * @exampleGroup Statistics
 * @example Container with Three Stats - <sqm-stat-container space="xxx-large" display="flex"><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/rewardBalance/CREDIT/POINT/value/global">Points Balance</sqm-big-stat><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/integrationRewardsCountFiltered/AVAILABLE/global">Giftcards Earned</sqm-big-stat><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/referralsCount">Referrals</sqm-big-stat></sqm-stat-container>
 */
@Component({
  tag: "sqm-stat-container",
  shadow: true,
})
export class StatContainer {
  @State()
  ignored = true;

  /**
   * @uiName Space Between Stats
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() space: Spacing = "xxx-large";

  /**
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   * @uiEnumNames ["Grid", "Flex"]
   */
  @Prop() display: "grid" | "flex" = "grid";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <StatContainerView {...getProps(this)}>
        <slot />
      </StatContainerView>
    );
  }
}
