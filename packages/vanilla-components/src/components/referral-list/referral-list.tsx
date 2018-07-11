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
      rewards {
        value
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
}`;

@Component({
  tag: 'sqh-referral-list',
  styleUrl: 'referral-list.scss'
})
export class ReferralList {
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
        dateReferralStarted: 1508150601440,
        dateReferralPaid: null,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Jorge',
          lastName: 'Conde',
          imageUrl: null,
        },
        rewards: {
          count: 1,
          totalCount: 1,
          data: [
            {
              id: '123',
              type: 'CREDIT',
              value: 1000,
              unit: 'CENTS',
              name: 'Dollar Credit',
              dateGiven: 1508150601479,
              dateExpires: null,
              dateCancelled: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: '$',
            }
          ]
        },
      },
      {
        id: '342',
        dateReferralStarted: 1508150982134,
        dateReferralPaid: null,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Eric',
          lastName: 'Mason',
          imageUrl: null,
        },
        rewards: {
          count: 3,
          totalCount: 3,
          data: [
            {
              id: '234',
              type: 'CREDIT',
              value: 1000,
              unit: 'CENTS',
              name: 'Dollar Credit',
              dateGiven: 1508150601479,
              dateExpires: null,
              dateCancelled: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: '$',
            },
            {
              id: '345',
              type: 'CREDIT',
              value: 1000,
              unit: 'CENTS',
              name: 'Dollar Credit',
              dateGiven: 1508150982172,
              dateExpires: null,
              dateCancelled: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: '$',
            },
            {
              id: '456',
              type: 'CREDIT',
              value: 1000,
              unit: 'CENTS',
              name: 'Dollar Credit',
              dateGiven: 1508151280974,
              dateExpires: null,
              dateCancelled: null,
              fuelTankCode: null,
              fuelTankType: null,
              currency: '$',
            },
          ]
        },
      },
      {
        id: '678',
        dateReferralStarted: 1508151280937,
        dateReferralPaid: null,
        dateReferralEnded: null,
        moderationStatus: null,
        referredUser: {
          firstName: 'Logan',
          lastName: 'Volkers',
          imageUrl: null,
        },
        rewards: {
          count: 0,
          totalCount: 0,
          data: []
        },
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
          this.referrals.map((ref, index) => {
            let i = this.referredBy && this.showreferrer ? `${index + 1}` : `${index}`;
            return (
              <div>
                <sqh-referral-component id={ i } referral={ ref }></sqh-referral-component>
              </div>
            );
          })
        );
      }if (this.referredBy && this.showreferrer) {
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
        {referredByRow}
        {referralsRow}
        {content}
      </div>
    );
  }
}