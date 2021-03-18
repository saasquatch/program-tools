import { Component, h, Prop } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { BigStatView } from "./big-stat-view";
import { BigStatHook, useBigStat } from "./useBigStat";
import { isDemo } from "../../utils/isDemo";

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
  @Prop() type: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props, label } = isDemo()
      ? useDemoBigState(this)
      : useBigStat(this);
    return (
      <BigStatView {...props}>
        <slot>{label}</slot>
      </BigStatView>
    );
  }
}

function useDemoBigState(props: BigStat): BigStatHook {
  // TODO: Infer a smarter value and label from Stat type??
  return {
    props: {
      statvalue: props.type === "number" ? "$10,000" : "10 points",
    },
    // create label from first part of path only using formatting 
    // "/rewardBalance/CREDIT/CASH_USD/prettyValue" => "Reward Balance"
    label:
      /^\/(\w+)/
        .exec(props.type)[1]
        ?.replace(/^([a-z])/, (_, c) => c.toUpperCase())
        ?.replace(/([a-z])([A-Z])/, "$1 $2") ?? "Demo Label",
  };
}
