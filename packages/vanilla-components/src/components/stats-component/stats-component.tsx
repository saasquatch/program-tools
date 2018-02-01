import { Component, Prop, State} from '@stencil/core';
import FormatJs from '../../services/FormatJs';

@Component({
  tag: 'stats-component',
  styleUrl: 'stats-component.scss'
})
export class StatsComponent {
  @Prop() text: string;
  @Prop() friendsReferred: string = `{value, plural, one {Person} other {People}} Referred`;
  @State() rewardsEarned: string;
  @State() rewardsPending: string;

  componentDidLoad() {
    console.log('did load');
  }

  render() {
    return (
      <div class="squatch-stats">
        <div class="squatch-stats-item">
          <div class="squatch-stats-title">8</div>

          <span class="squatch-stats-description">{FormatJs.format(this.friendsReferred, {value:1})}</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title text-green">7</div>

          <span class="squatch-stats-description">Rewards Earned</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title">2</div>

          <span class="squatch-stats-description">Rewards Pending</span>
        </div>
      </div>
    );
  }
}