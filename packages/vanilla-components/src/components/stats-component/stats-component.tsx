import { Component, Prop} from '@stencil/core';
import FormatJs from '../../services/FormatJs';

@Component({
  tag: 'stats-component',
  styleUrl: 'stats-component.scss'
})
export class StatsComponent {
  @Prop() text: string;
  @Prop() friendsReferred: string = `{value, plural, =0 {Nobody} one {Person} other {People}} Referred`;
  @Prop() rewardsEarned: string = `{value, plural, one {Reward} other {Rewards}} Earned`;
  @Prop() rewardsPending: string = `{value, plural, one {Reward} other {Rewards}} Pending`;

  componentDidLoad() {
    console.log('did load');
  }

  render() {
    const data = {
      referrals: 2,
      rewards: 1,
      pending: 1
    }
    return (
      <div class="squatch-stats">
        <div class="squatch-stats-item">
          <div class="squatch-stats-title">{data.referrals}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.friendsReferred, {value:data.referrals})}</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title text-green">{data.rewards}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.rewardsEarned, {value:data.rewards})}</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title">{data.pending}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.rewardsPending, {value:data.pending})}</span>
        </div>

        <div style={{clear:"both"}}></div>
      </div>
    );
  }
}