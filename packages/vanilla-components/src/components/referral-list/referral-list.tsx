import { Component, Prop, State} from '@stencil/core';
import FormatJs from '../../services/FormatJs';
import { uuid } from '../../utilities';

const API: MyAPI = window["WidgetHost"];
const userFragment = `referrals(limit: 10, offset: $offset) {
  count
  totalCount
  data {
    id
    dateReferralStarted
    dateReferralPaid
    dateReferralEnded
    referrerReward {
      type
      value
      unit
      name
    }
    moderationStatus
    referredUser {
      firstName
      lastName
    }
    rewards {
      prettyValue
    }
  }
}
referredByReferral {
  referrerUser {
    firstName
    lastName
  }
  dateReferralStarted
  rewards {
    prettyValue
  }
}`;

@Component({
  tag: 'sqh-referral-list',
  styleUrl: 'referral-list.scss'
})
export class ReferralList {
  @Prop() showreferrer: boolean = true;
  @Prop() dateformatting: string = `{value, date, medium}`;
  @Prop() rewardcolor: string = "#4BB543";
  @Prop() pendingcolor: string = "#DDDDDD";
  @Prop() usefirstreward: boolean = false;
  @State() referrals: Referral[];
  @State() referralsCount: number;
  @State() referredBy: any;
  @State() rewards: Array<any>;
  @State() loading: boolean;

  constructor() {
    this.loading = true;
    this.getUserPayLoad().then(res => {
      console.log('res', res);
      this.referrals = res.data.user.referrals.data;
      this.referralsCount = res.data.user.referrals.totalCount;
      this.referredBy = res.data.user.referredByReferral;
      this.loading = false;
    }).catch(e => {
      this.onError(e);
    });
  }

  addStyle() {
    const el = document.getElementById("squatch-referrals-style");
    const css = `
      .squatch-referrals-icon.icon-ok-circled {
        color: ${ this.rewardcolor };
      }
      .squatch-referrals-icon.icon-attention {
        color: ${ this.pendingcolor };
      }
      .squatch-referrals-value {
        color: ${ this.rewardcolor };
        font-size: 20px;
      }
      .squatch-referrals-value.pending {
        color: ${ this.pendingcolor };
        font-size: 15px;
      }
    `;
    
    if (el) {
      el.textContent = css;
    } else {
      const style = document.createElement("style")
      style.setAttribute('id', 'squatch-referrals-style');
      style.textContent = css;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }

  componentDidLoad() {
    this.addStyle();
  }

  componentWillUpdate() {
    this.addStyle();
  }

  getUserPayLoad(offset = 0) {
    return API.graphql.getUserFragment(userFragment, { offset });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.loading = false;
  }

  render() {
    let content;
    let referredByRow;
    let referralsRow;
    
    if(this.loading) {
      content = 'Is loading';
    } else { 
      if (this.referrals) {
        referralsRow = (
          this.referrals.map((ref) => {
            const { 
              dateReferralStarted,
              referredUser: { firstName: name = 'Anonymous' },
              rewards
            } = ref;
            const date = FormatJs.formatRelative(dateReferralStarted.toString());
            const content = rewards.length > 0
              ? 'Paid User, signed up {date}'
              : 'Trial User, signed up {date}'
            const referral = {
              name,
              content: FormatJs.format(content, { date }),
              value: rewards.length > 0
                ? rewards[0].prettyValue
                : 'Reward Pending',
              hasreward: rewards.length > 0
            }
            return (
              <sqh-referral-component id={ uuid() } { ...referral } ></sqh-referral-component>
            );
          })
        );
      }
      if (this.referredBy && this.showreferrer) {
        const { 
          dateReferralStarted,
          referrerUser: { firstName: name = 'Anonymous' },
          rewards
        } = this.referredBy;
        const date = FormatJs.formatRelative(dateReferralStarted.toString());
        const content = 'Referred You {date}';
        const referral = {
          name,
          content: FormatJs.format(content, { date }),
          value: rewards.length > 0
            ? rewards[0].prettyValue
            : 'Reward Pending',
          hasreward: rewards.length > 0
        }
        referredByRow = (
          <sqh-referral-component id={ uuid() } { ...referral } ></sqh-referral-component>
        );
      }
    }

    return (
      <div class="squatch-referrals" id="squatch-referrals-scroll" data-scroll-offset="0" data-scroll-limit={this.referralsCount}>
        {referralsRow}
        {referredByRow}
        {content}
      </div>
    );
  }
}