import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { BigStatView } from "./big-stat-view";
import { useBigStat } from "./useBigStat";
import { useDemoBigStat } from "./useDemoBigStat";
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 *
 * @uiName Big Stat
 * @slot the description of the component
 */
@Component({
  tag: "sqm-big-stat",
  styleUrl: "big-stat.css",
  shadow: true,
})
export class BigStat {
  // uiEnum ["/rewardBalance/CREDIT/CASH_CAD/prettyPendingCredit",
  //  "/rewardBalance/CREDIT/CASH_CAD/prettyValue",
  //  "/rewardBalance/CREDIT/CASH_CAD/prettyRedeemedCredit",
  //  "/rewardBalance/CREDIT/CASH_USD/prettyPendingCredit",
  //  "/rewardBalance/CREDIT/CASH_USD/prettyValue",
  //  "/rewardBalance/CREDIT/CASH_USD/prettyRedeemedCredit"]
  /**
   * Select what type of stat to display. Manual paths are also supported.
   *
   * @uiWidget StatTypeSelectWidget
   * @uiName Stat Type
   */
  @Prop() statType: string;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props, label } = isDemo() ? useDemoBigStat(this) : useBigStat(this);
    return (
      <BigStatView {...props}>
        <slot>{label}</slot>
      </BigStatView>
    );
  }
}
