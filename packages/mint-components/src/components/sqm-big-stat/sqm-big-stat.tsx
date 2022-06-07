import { Component, h, Prop, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { BigStatView, BigStatViewProps } from "./sqm-big-stat-view";
import { useBigStat } from "./useBigStat";
import { useDemoBigStat } from "./useDemoBigStat";
import { isDemo, useHost } from "@saasquatch/component-boilerplate";
import { DemoData } from "../../global/demo";
import { FontSize } from "../../global/mixins";

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
   * @default
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
   * @uiName Stat Color
   * @uiWidget color
   */
  @Prop() statColor?: string = "var(--sl-color-gray-800)";

  /**
   * @uiName Stat Description Color
   * @uiWidget color
   */
  @Prop() statDescriptionColor?: string = "var(--sl-color-gray-600)";

  /**
   * @uiName Stat Font Size
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() statFontSize?: FontSize = "x-large";

  /**
   * @uiName Stat Description Font Size
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() statDescriptionFontSize?: FontSize = "small";

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
    console.log(props);
    const host = useHost();
    const hasLabel = !!host.innerHTML?.trim();
    const labelSlot = <slot name="label">{hasLabel ? <slot /> : label}</slot>;

    return <BigStatView {...props} labelSlot={labelSlot}></BigStatView>;
  }
}
