import { Component, Prop, Event, EventEmitter, Element, Watch } from '@stencil/core';

@Component({
  tag: 'sqh-stat-component',
  styleUrl: 'stat-component.scss'
})
export class StatComponent {
  @Element() elem: HTMLElement;
  @Prop() stattype: "referralsCount" | "referralsMonth" | "referralsWeek" | "rewardsCount" | "rewardsMonth" | "rewardsWeek" | "rewardBalance" | null
  @Prop() rewardbalancepath: string;
  @Prop() statvalue: string = "0";
  @Prop() statdescription: string;
  @Event() statTypeUpdated: EventEmitter;

  @Watch('stattype')
  watchHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) this.statTypeUpdatedHandler(this.elem)
  }

  statTypeUpdatedHandler(stat: HTMLElement) {
    this.statTypeUpdated.emit(stat);
  }

  render() {
    return (
      this.stattype
      ? (
        <div>
          <div class="stat-value">{this.statvalue}</div>
          <div class="stat-description">{this.statdescription}</div>
        </div>
      )
      : ''
    );
  }
}