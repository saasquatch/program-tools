import { Component, Prop, State} from '@stencil/core';
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
  @Prop() hidden: boolean = false;
  @Prop() showreferrer: boolean = true;
  @Prop() rewardcolor: string = "#4BB543";
  @Prop() pendingcolor: string = "#DDDDDD";
  @Prop() usefirstreward: boolean = false;
  @Prop() referrercontent: string = "Referred You {date}";
  @Prop() convertedcontent: string = "Paid User, signed up {date}";
  @Prop() pendingcontent: string = "Trial User, signed up {date}";
  @Prop() pendingvalue: string = "Reward Pending";
  @Prop() valuecontent: string = "and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}";
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

    const referralvariables = {
      usefirstreward: this.usefirstreward,
      referrercontent: this.referrercontent,
      convertedcontent: this.convertedcontent,
      pendingcontent: this.pendingcontent,
      pendingvalue: this.pendingvalue,
      valuecontent: this.valuecontent,
    }
    
    if(this.loading) {
      content = 'Is loading';
    } else { 
      if (this.referrals) {
        referralsRow = (
          this.referrals.map((ref) => {
            return (
              <sqh-referral-component id={ uuid() } referral={ ref } referralvariables={ referralvariables } ></sqh-referral-component>
            );
          })
        );
      }
      if (this.referredBy && this.showreferrer) {
        referredByRow = (
          <sqh-referral-component id={ uuid() } referral={ this.referredBy } referralvariables={ referralvariables } ></sqh-referral-component>
        );
      }
    }

    return (
      this.hidden 
      ? ''
      : (
        <div class="squatch-referrals" id="squatch-referrals-scroll" data-scroll-offset="0" data-scroll-limit={this.referralsCount}>
          {referralsRow}
          {referredByRow}
          {content}
        </div>
      )
    );
  }
}