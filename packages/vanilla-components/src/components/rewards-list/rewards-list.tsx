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
  referredBy {
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
  tag: 'rewards-list',
  styleUrl: 'rewards-list.scss'
})
export class RewardsList {
  @Prop() userIsReferred: boolean = false;
  @Prop() showReferrer: boolean = true;
  @Prop() rewardsHeading: string = `{value, select, CENTS {Cents} MONTH {Month} % {value} other {value}}`;
  @State() referrals: Array<any>;
  @State() referredBy: Object;
  @State() rewards: Array<any>;
  @State() loading: boolean;

  constructor() {
    if (API) {
      this.loading = true;
      this.getUserPayLoad().then(res => {
        console.log('res', res);
        this.referrals = res.data.user.referrals.data;
        this.referredBy = res.data.user.referredBy;
        this.rewards = res.data.user.rewards.data;
        this.loading = false;
      }).catch(e => {
        this.onError(e);
      });
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
    
    if(this.loading) {
      content = 'Is loading';
    } else { 
      if (this.rewards) {
        content = (
          <div>
            {this.rewards.map((r, index) => {
                let i = this.referredBy && this.showReferrer ? `${index + 1}` : `${index}`;
                return (
                  <tr id={i}>
                    <td>
                      <img class="img-circle squatch-referrals-avatar" src='http://www.gravatar.com/avatar/3a99ddeabe3bcca7f64938b753005735?s=40&d=mm&r=pg'></img>

                      <div class="squatch-referrals-heading">
                        {r.name}
                      </div>

                      <div class="squatch-referrals-description">
                        Arbitrary Reward
                      </div>
                    </td> 
                    
                    <td class="hidden-sm">
                      <div class="squatch-referrals-heading">
                        Signed up
                      </div>
                      <div class="squatch-referrals-description" data-moment="true">{FormatJs.format(`{value, date, medium}`, {value:r.dateGiven})}</div>
                    </td> 

                    <td>
                      <i class="icon squatch-referrals-icon icon-ok-circled text-green"></i>

                      <div class="squatch-referrals-heading hidden-sm">
                        {r.unit == 'CENTS'
                          ? `$${r.value/100}`
                          : `${r.value} ${r.unit}`
                        }
                      </div>

                      <div class="squatch-referrals-description hidden-sm text-green">
                        Reward Given
                      </div>
                    </td>
                  </tr>
                );
              })}
          </div>
        )
      }
    }
    return (
      <div class="squatch-referrals" id="squatch-referrals-scroll" data-scroll-offset="0" data-scroll-limit="{{nonCancelledReferralAndRewardsListLength}}">

        <table class="squatch-referrals-list">
          <tbody>
            {this.referredBy && this.showReferrer
              ? <tr id="0">was Referred</tr>
              : ''
            }

            {content}

            {/* <tr id="{{#if options.showReferrer}}{{#if ../referredBy.dateReferred}}{{#if ../referredBy.hasCancelledReferredReward}}{{math @index}}{{else}}{{math @index '+ 1'}}{{/if}}{{else}}{{math @index}}{{/if}}{{else}}{{math @index}}{{/if}}">
              <referral-item></referral-item>
            </tr> */}


            {/* <tr id="{{#if options.showReferrer}}{{#if ../referredBy.dateReferred}}{{#if ../referredBy.hasCancelledReferredReward}}{{math @index '+' referralsLength}}{{else}}{{math @index '+ 1 +' referralsLength}}{{/if}}{{else}}{{math @index '+' referralsLength}}{{/if}}{{else}}{{math @index '+' referralsLength}}{{/if}}">
              <reward-item></reward-item>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}