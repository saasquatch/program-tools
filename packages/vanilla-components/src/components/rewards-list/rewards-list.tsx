import { Component, Prop, State} from '@stencil/core';
import FormatJs from '../../services/FormatJs';

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
        imageUrl
      }
    }
  }
  referredByReferral {
    referredUser {
      firstName
      lastName
      imageUrl
    }
    dateReferralStarted
  }
  rewards {
    count
    totalCount
    data {
      id
      type
      value
      unit
      name
      dateGiven
      dateExpires
      dateCancelled
      fuelTankCode
      fuelTankType
      currency
    }
  }`;

@Component({
  tag: 'sqh-rewards-list',
  styleUrl: 'rewards-list.scss'
})
export class RewardsList {
  @Prop() userisreferred: boolean = false;
  @Prop() showreferrer: boolean = true;
  @Prop() dateformatting: string = `{value, date, medium}`;
  @State() referrals: Referral[];
  @State() referralsCount: number;
  @State() referredBy: any;
  @State() rewards: Array<any>;
  @State() loading: boolean;

  constructor() {
    if (this.userisreferred) {
      this.loading = true;
      this.getUserPayLoad().then(res => {
        console.log('res', res);
        this.referrals = res.data.user.referrals.data;
        this.referralsCount = res.data.user.referrals.totalCount;
        this.referredBy = res.data.user.referredByReferral;
        this.rewards = res.data.user.rewards.data;
        this.loading = false;
      }).catch(e => {
        this.onError(e);
      });
    } else {
      this.referrals = [{
        id: '123',
        dateReferralStarted: 98123472,
        dateReferralPaid: 9123401923,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Jorge',
          lastName: 'Conde',
          imageUrl: null,
        }
      },
      {
        id: '342',
        dateReferralStarted: 981234372,
        dateReferralPaid: 912401923,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Eric',
          lastName: 'Mason',
          imageUrl: null,
        }
      },
      {
        id: '678',
        dateReferralStarted: 981223472,
        dateReferralPaid: 91234019423,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Logan',
          lastName: 'Volkers',
          imageUrl: null,
        }
      }
      ];
      this.referralsCount = 3;
      this.referredBy = null;
      this.rewards = [];
      this.loading = false;
    }
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
          this.referrals.map((r, index) => {
            let i = this.referredBy && this.showreferrer ? `${index + 1}` : `${index}`;
            return (
              <tr id={i}>
                {/* <referral-component></referral-component> */}
                <td>
                  <img class="img-circle squatch-referrals-avatar" src={r.referredUser.imageUrl 
                    ? r.referredUser.imageUrl 
                    : `http://www.gravatar.com/avatar/3a99ddeabe3bcca7f64938b753005735?s=40&d=mm&r=pg`
                  }></img>

                  <div class="squatch-referrals-heading">{r.referredUser.firstName}</div>

                  <div class="squatch-referrals-description">
                    <span class="hidden-sm">
                      {r.dateReferralPaid
                      ? `Paid User`
                      : `Trial User`
                      }
                    </span>

                    <span class="hidden-md text-green">
                      $10
                    </span>
                  </div>
                </td>

                <td class="hidden-sm">
                  <div class="squatch-referrals-heading">
                    {r.dateReferralPaid
                    ? `Signed Up`
                    : `Referred`
                    }
                  </div>

                  <div class="squatch-referrals-description" data-moment="true">{FormatJs.format(this.dateformatting, {value:r.dateReferralStarted})}</div>
                </td>

                <td>
                  <i class={r.dateReferralPaid ? `icon squatch-referrals-icon icon-ok-circled text-green` : `icon squatch-referrals-icon icon-ok-circled text-yellow`}></i>

                  <div class="squatch-referrals-heading hidden-sm">
                    {/* TODO: logic here */}
                    $10
                  </div>

                  <div class="squatch-referrals-description hidden-sm">
                    {r.dateReferralPaid
                    ? `Free Credit`
                    : `Credit Pending`
                    }
                  </div>
                </td>
              </tr>
            );
          })
        );
      }

      if (this.rewards) {
        content = (
          this.rewards.map((r, index) => {
            let i = this.referredBy && this.showreferrer ? `${index + this.referralsCount + 1}` : `${index + this.referralsCount}`;
            return (
              <tr id={i}>
                {/* <reward-component></reward-component> */}
                <td>
                  <img class="img-circle squatch-referrals-avatar" src='http://www.gravatar.com/avatar/3a99ddeabe3bcca7f64938b753005735?s=40&d=mm&r=pg'></img>

                  <div class="squatch-referrals-heading">
                    {r.name}
                  </div>

                  <div class="squatch-referrals-description">
                    No Referral
                  </div>
                </td> 
                
                <td class="hidden-sm">
                  <div class="squatch-referrals-heading">
                    Signed up
                  </div>
                  <div class="squatch-referrals-description" data-moment="true">{FormatJs.format(this.dateformatting, {value:r.dateGiven})}</div>
                </td> 

                <td>
                  <i class="icon squatch-referrals-icon icon-ok-circled text-green"></i>

                  <div class="squatch-referrals-heading hidden-sm">
                    {r.unit == 'CENTS'
                      ? `$${r.value/100}`
                      : (r.unit == 'MONTH') 
                      ? FormatJs.format(`${r.value} {value, plural, =0 {Nothing} one {Month} other {Months}}`, {value:r.value})
                      : (r.unit == '%') 
                      ? `${r.value}${r.unit}`
                      : `${r.value} ${r.unit}`
                    }
                  </div>

                  <div class="squatch-referrals-description hidden-sm text-green">
                    Reward Given
                  </div>
                </td>
              </tr>
            );
          })
        );
      }

      if (this.referredBy && this.showreferrer) {
        referredByRow = (
          <tr id="0">
            <td>
              {this.referredBy.referredUser.imageUrl 
              ? <img class="img-circle squatch-referrals-avatar" src={this.referredBy.referredUser.imageUrl}></img>
              : <img class="img-circle squatch-referrals-avatar" src="http://www.gravatar.com/avatar/3a99ddeabe3bcca7f64938b753005735?s=40&d=mm&r=pg"></img>
              }

              <div class="squatch-referrals-heading">{this.referredBy.referredUser.firstName}</div>

              <div class="squatch-referrals-description">
                <span class="hidden-sm">
                  Referring User
                </span>

                <span class="hidden-md text-green">
                  $10
                </span>
              </div>
            </td>

            <td class="hidden-sm">
              <div class="squatch-referrals-heading">
                Referred You
              </div>

              <div class="squatch-referrals-description" data-moment="true">{FormatJs.format(this.dateformatting, {value:this.referredBy.dateReferralStarted})}</div>
            </td>

            <td>

            <i class="icon squatch-referrals-icon icon-ok-circled text-green"></i>

            <div class="squatch-referrals-heading hidden-sm">
              {/* TODO: logic here */}
              $10
            </div>

            <div class="squatch-referrals-description hidden-sm text-green">
              Free Credit
            </div>
            </td>
          </tr>
        );
      }
    }

    return (
      <div class="squatch-referrals" id="squatch-referrals-scroll" data-scroll-offset="0" data-scroll-limit={this.referralsCount}>

        <table class="squatch-referrals-list">
          <tbody>
            {referredByRow}

            {referralsRow}

            {content}
          </tbody>
        </table>
      </div>
    );
  }
}