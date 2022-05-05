import {
  h,
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
} from "@stencil/core";
import { css } from "emotion";

/**
 * @uiName Stat Component
 * @canvasRenderer always-replace
 * @exampleGroup Statistics
 * @example Referral Count - <sqh-stat-component ishidden="false" statcolor="#4caf50" stattype="/referralsCount" statdescription="Friends Referred" paddingtop="10" paddingbottom="10"></sqh-stat-component>
 * @example Reward Count - <sqh-stat-component ishidden="false" stattype="/rewardsCount" statdescription="Total Rewards" paddingtop="10" paddingbottom="10" statcolor="#000000"></sqh-stat-component>
 * @example Credit Earned - <sqh-stat-component ishidden="false" stattype="/rewardBalance/CREDIT/CENTS/prettyAssignedCredit" statdescription="Credit earned" paddingtop="10" paddingbottom="10" statcolor="#000000"></sqh-stat-component>
 * @example Points Earned - <sqh-stat-component statcolor="#000000" stattype="/rewardBalance/CREDIT/POINT/totalAssignedCredit" statdescription="Points Earned" paddingtop="10" paddingbottom="10"></sqh-stat-component>
 */
@Component({
  tag: "sqh-stat-component",
  styleUrl: "stat-component.scss",
})
export class StatComponent {
  @Element() elem: HTMLElement;
  /**
   * Hide or show the component
   *
   * @uiName Hide Stat
   */
  @Prop() ishidden: boolean;
  /**
   * Type of stat being displayed. e.g /rewardsCount
   * @uiName Stat Type
   * @uiWidget statTypeSelector
   * @required
   */
  //STAT TYPE UIOPTIONS ARE NEEDED HERE
  @Prop() stattype: string;
  /**
   * Value shown inside stat
   *
   * @uiName Stat Value
   */
  @Prop() statvalue: string;
  /**
   * Description shown underneath stat value
   *
   * @uiName Stat Description
   */
  @Prop() statdescription: string;
  /**
   * Text color of the stat
   *
   * @uiName Stat Color
   * @uiWidget color
   * @format color
   */
  @Prop() statcolor: string;

  @Event() statTypeUpdated: EventEmitter;
  @Event() statAdded: EventEmitter;

  componentWillLoad() {
    this.statAddedHandler(this.elem);
  }

  @Watch("stattype")
  stattypeHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) this.statTypeUpdatedHandler(this.elem);
  }

  statAddedHandler(stat: HTMLElement) {
    this.statAdded.emit(stat);
  }

  statTypeUpdatedHandler(stat: HTMLElement) {
    this.statTypeUpdated.emit(stat);
  }

  render() {
    const clz = css`
      color: ${this.statcolor};
    `;

    return (
      !this.ishidden && (
        <div class={clz}>
          <div class="stat-value">{this.statvalue}</div>
          <div class="stat-description">{this.statdescription}</div>
        </div>
      )
    );
  }
}
