import { Component, Prop, State} from '@stencil/core';
import { uuid } from '../../utilities';

const API: MyAPI = window["WidgetHost"];
const userFragment = `referrals(limit: 3, offset: $offset) {
  count
  totalCount
  data {
    id
    dateReferralStarted
    dateReferralPaid
    dateReferralEnded
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

const userReferralsFragment = `
  referrals(limit: 3, offset: $offset) {
    data {
      dateReferralStarted
      referredUser {
        firstName
      }
      rewards {
        prettyValue
      }
    }
  }
`

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
  @Prop() paginatemore: string = "View More";
  @Prop() paginateless: string = "Previous";
  @State() referrals: Referral[];
  @State() referralsCount: number;
  @State() referredBy: any;
  @State() rewards: Array<any>;
  @State() loading: boolean;
  @State() offset: number = 0;

  constructor() {
    this.loading = true;
  }

  componentWillLoad() {
    return this.getUserPayLoad().then(res => {
      console.log('res', res);
      this.referrals = res.data.user.referrals.data;
      this.referredBy = res.data.user.referredByReferral;
      this.referralsCount = this.showreferrer && this.referredBy
      ? res.data.user.referrals.totalCount + 1
      : res.data.user.referrals.totalCount;
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

  getReferrals(offset = 0) {
    return API.graphql.getUserFragment(userReferralsFragment, { offset })
  }

  paginate(offset) {
    if (offset >= this.referralsCount || offset < 0) return null;
    this.getReferrals(offset)
    .then(res => {
      this.referrals = res.data.user.referrals.data;
      this.offset = offset;
    });
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
    this.loading = false;
  }

  render() {
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
    
    if (this.referrals) {
      referralsRow = (
        this.referrals.map((ref) => {
          const referraltype = ref.rewards.length > 0 ? 'converted' : 'pending'
          return (
            <sqh-referral-component id={ uuid() } referral={ ref } referralvariables={ referralvariables } referraltype={ referraltype }></sqh-referral-component>
          );
        })
      );
    }
    if (this.referrals.length < 3 && this.referredBy && this.showreferrer) {
      referredByRow = (
        <sqh-referral-component id={ uuid() } referral={ this.referredBy } referralvariables={ referralvariables } referraltype='referrer'></sqh-referral-component>
      );
    }

    return (
      this.hidden 
      ? ''
      : (
        <div class="squatch-referrals">
          <div class="squatch-referrals-scroll-container">
            {referralsRow}
            {referredByRow}
          </div>
          <div class="squatch-referrals-scroll-action-container">
            <button class={`squatch-referrals-scroll-action previous ${this.offset === 0 ? "disabled" : ""}`} onClick={() => this.paginate(this.offset - 3)}>{this.paginateless}</button>
            <button class={`squatch-referrals-scroll-action view-more ${this.offset >= this.referralsCount - 3 ? "disabled" : ""}`} view-more onClick={() => this.paginate(this.offset + 3)}>{this.paginatemore}</button>
          </div>
        </div>
      )
    );
  }
}