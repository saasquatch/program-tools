import { Component, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'sqh-stat-component',
  styleUrl: 'stat-component.scss'
})
export class StatComponent {
  @Element() elem: HTMLElement;
  @Prop() stattype: "referralsCount" | "referralsMonth" | "referralsWeek" | "rewardsCount" | "rewardsMonth" | "rewardsWeek" | null
  @Prop() statvalue: number = 0;
  @Prop() statdescription: string;
  @Event() statTypeUpdated: EventEmitter;

  componentWillUpdate() {
    this.statTypeUpdatedHandler(this.elem)
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