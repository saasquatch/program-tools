import { Component, Prop, State} from '@stencil/core';
import FormatJs from '../../services/FormatJs';
import { API } from '../../services/WidgetHost';

const userStatsFragment = `
  referralsMonth: referrals(filter:{
    dateReferralStarted_timeframe: "this_month"
  }) {
    totalCount
  }
  rewards {
    totalCount
  }
  referrals(offset: $offset) {
    totalCount
  }
`;

@Component({
  tag: 'sqh-stats-component',
  styleUrl: 'stats-component.scss'
})
export class StatsComponent {
  @Prop() ishidden: boolean = false;
  @Prop() text: string;
  @Prop() referralscounttext: string = `{value, plural, one {Friend} other {Friends}} Referred`;
  @Prop() rewardscounttext: string = `{value, plural, one {Reward} other {Rewards}} Earned`;
  @Prop() referralsmonthtext: string = `{value, plural, one {Referral} other {Referrals}} this month`;
  @State() referralsCount: number;
  @State() rewardsCount: number;
  @State() referralsMonth: number;

  componentWillLoad() {
    return this.getUserStats().then(res => {
      console.log('res', res);
      this.referralsMonth = res.data.user.referralsMonth.totalCount;
      this.referralsCount = res.data.user.referrals.totalCount;
      this.rewardsCount = res.data.user.rewards.totalCount;
    }).catch(e => {
      this.onError(e);
    });
  }

  componentDidLoad() {
    console.log('did load');
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  getUserStats(offset = 0) {
    return API.graphql.getUserFragment(userStatsFragment, { offset });
  }

  render() {
    return this.ishidden
    ? ''
    : (
      <div class="squatch-stats">
        <div class="squatch-stats-item">
          <div class="squatch-stats-title">{this.referralsCount}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.referralscounttext, {value:this.referralsCount})}</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title text-green">{this.rewardsCount}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.rewardscounttext, {value:this.rewardsCount})}</span>
        </div>

        <div class="squatch-stats-item">
          <div class="squatch-stats-title">{this.referralsMonth}</div>

          <span class="squatch-stats-description">{FormatJs.format(this.referralsmonthtext, {value:this.referralsMonth})}</span>
        </div>

        <div style={{clear:"both"}}></div>
      </div>
    );
  }
}