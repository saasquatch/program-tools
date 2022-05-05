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
 * @uiName Partner Stat
 * @canvasRenderer always-replace
 * @exampleGroup Statistics
 * @example Pending CASH/CAD - <sqh-partner-stat-component statcolor="#000000" stattype="/rewardBalance/CREDIT/CASH_CAD/prettyPendingCredit" statdescription="Pending Balance" paddingtop="10" paddingbottom="10"></sqh-partner-stat-component>
 * @example Available CASH/CAD - <sqh-partner-stat-component stattype="/rewardBalance/CREDIT/CASH_CAD/prettyValue" statdescription="Available Balance" paddingtop="10" paddingbottom="10" statcolor="#4CAF50"></sqh-partner-stat-component>
 * @example Redeemed CASH/CAD - <sqh-partner-stat-component stattype="/rewardBalance/CREDIT/CASH_CAD/prettyRedeemedCredit" statdescription="Redeemed Balance" paddingtop="10" paddingbottom="10" statcolor="#000000"></sqh-partner-stat-component>
 */
@Component({
  tag: "sqh-partner-stat-component",
  styleUrl: "partner-stat-component.scss",
})
export class PartnerStatComponent {
  @Element() elem: HTMLElement;
  /**
   * Hide or show the component
   *
   * @uiName Hide Stat
   */
  @Prop() ishidden: boolean;
  /**
   * Used to query the stats for a user
   *
   * @uiName Stat Type
   * @uiWidget statTypeSelector
   * @required
   * @minLength 1
   */
  @Prop() stattype: string;
  /**
   * Value of the stat
   *
   * @uiName Stat Value
   */
  @Prop() statvalue: string;
  /**
   * Description of the stat
   *
   * @uiName Stat Description
   */
  @Prop() statdescription: string;
  /**
   * Color of the stat value and description
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
