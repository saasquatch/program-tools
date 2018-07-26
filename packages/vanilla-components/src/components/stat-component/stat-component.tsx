import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'sqh-stat-component',
  styleUrl: 'stat-component.scss'
})
export class StatComponent {
  @Prop() stattype: "referralsCount" | "referralsMonth" | "referralsWeek" | "rewardsCount" | "rewardsMonth" | "rewardsWeek" | null
  @Prop() statvalue: number = 0;
  @Prop() statdescription: string;

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