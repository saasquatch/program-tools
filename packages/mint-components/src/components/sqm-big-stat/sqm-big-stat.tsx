import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { BigStatView, BigStatViewProps } from "./sqm-big-stat-view";
import { useBigStat } from "./useBigStat";
import { useDemoBigStat } from "./useDemoBigStat";
import { isDemo, useHost } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";

/**
 *
 * @uiName User Stat
 * @slots [{"name":"","title":"Stat Text"}]
 * @slotEditor richText
 * @exampleGroup Statistics
 * @example Points Balance - <sqm-big-stat flex-reverse="true" alignment="left" stat-type="/rewardBalance/CREDIT/POINT/value/global"><p>Points Balance</p></sqm-big-stat>
 * @example GiftCards Earned - <sqm-big-stat flex-reverse="true" alignment="left" stat-type="/integrationRewardsCountFiltered/AVAILABLE/global"><p>Giftcards Earned</p></sqm-big-stat>
 * @example Referrals - <sqm-big-stat flex-reverse="true" alignment="left" stat-type="/referralsCount"><p>Referrals</p></sqm-big-stat>
 */
@Component({
  tag: "sqm-big-stat",
  shadow: true,
})
export class BigStat {
  /**
   * Select what type of stat to display. Manual paths are also supported.
   *
   * @uiWidget statTypeSelectWidget
   * @uiName Stat Type
   * @required
   * @uiWidgetOptions {"version": 1.1}
   */
  @Prop() statType: string;

  /**
   * Controls the order of the stat value & description column
   *
   * @uiName Flex Reverse
   */
  @Prop() flexReverse?: boolean = false;
  /**
   * Controls the alignment of the flexbox
   *
   * @uiName Alignment
   * @uiType string
   * @uiEnum ["left", "right", "center"]
   * @uiEnumNames ["Left", "Right", "Center"]
   */
  @Prop() alignment?: "left" | "right" | "center";

  /**
   * The ID of the program that is used to scope stats. Defaults to the program context when no ID is specified.
   *
   * @uiName Program ID
   * @uiWidget programSelector
   */
  @Prop() programId?: string;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<BigStatViewProps>;

  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const { props, label } = isDemo() ? useDemoBigStat(this) : useBigStat(this);
    const host = useHost();
    const hasLabel = !!host.innerHTML?.trim();
    const labelSlot = <slot name="label">{hasLabel ? <slot /> : label}</slot>;

    return <BigStatView {...props} labelSlot={labelSlot}></BigStatView>;
  }
}
