import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { StatContainerView } from "./sqm-stat-container-view";
import { getProps } from "../../utils/utils";
import { Spacing } from "../../global/mixins";

/**
 * @uiName Stat Container
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero", "sqb-program-section", "sqb-conditional-section"]
 * @validChildren ["sqm-big-stat"]
 * @slots [{"name":"", "title":"Stats"}]
 * @exampleGroup Statistics
 * @example Container with Three Stats - <sqm-stat-container space="xxx-large" display="flex"><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/rewardBalance/CREDIT/POINT/value/global"><p>Points Balance</p></sqm-big-stat><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/integrationRewardsCountFiltered/AVAILABLE/global"><p>Giftcards Earned</p></sqm-big-stat><sqm-big-stat flex-reverse="true" alignment="left" stat-type="/referralsCount"><p>Referrals</p></sqm-big-stat></sqm-stat-container>
 */
@Component({
  tag: "sqm-stat-container",
  shadow: true,
})
export class StatContainer {
  @State()
  ignored = true;

  /**
   * @uiName Space between stats
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() space: Spacing = "xxx-large";

  /**
   * @undocumented
   * @uiName Display
   * @uiType string
   * @uiEnum ["grid", "flex"]
   * @uiEnumNames ["Grid", "Flex"]
   */
  @Prop() display: "grid" | "flex" = "flex";

  /**
   * Hide the seperating border between stats
   * @uiName Hide border
   * @uiType boolean
   */
  @Prop() hideBorder?: boolean;

  /**
   * Controls the alignment of the flexbox
   *
   * @uiName Alignment
   * @uiType string
   * @uiEnum ["left", "right", "center"]
   * @uiEnumNames ["Left", "Right", "Center"]
   */
  @Prop() alignment?: "left" | "right" | "center" = "center";

  /**
   * @uiName Gap
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() gap: Spacing = "x-large";

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
