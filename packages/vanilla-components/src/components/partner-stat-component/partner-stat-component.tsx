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
   */
  //STAT TYPE UIOPTIONS ARE NEEDED HERE
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
