import { Component, Prop, State} from '@stencil/core';
import { css } from 'emotion';
import { uuid } from '../../utilities';
import { API } from '../../services/WidgetHost';

@Component({
  tag: 'sqh-referral-list',
  styleUrl: 'referral-list.scss'
})
export class ReferralList {
  // referral list props
  @Prop() ishidden: boolean = false;
  @Prop() paginatemore: string;
  @Prop() paginateless: string;
  @Prop() referralnamecolor: string;
  @Prop() referraltextcolor: string;
  // referrer props
  @Prop() showreferrer: boolean = true;
  @Prop() referrercontent: string;
  // converted referral props
  @Prop() rewardcolor: string;
  @Prop() usefirstreward: boolean = false;
  @Prop() convertedcontent: string;
  @Prop() valuecontent: string;
  // pending referral props
  @Prop() pendingcolor: string;
  @Prop() pendingcontent: string;
  @Prop() pendingvalue: string;
  // state
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
    return this.getReferrals().then(res => {
      console.log('res', res);
      this.referrals = res.data.user.referrals.data;
      this.referredBy = res.data.user.referredByReferral;
      this.referralsCount = res.data.user.referrals.totalCount;
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

  getReferrals(offset = 0) {
    return API.graphql.getReferrals(offset);
  }

  paginate(offset) {
    let { referralsCount } = this;
    if (this.showreferrer && this.referredBy) referralsCount++;
    if (offset >= referralsCount || offset < 0) return null;
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

    const clz = css`
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
      .squatch-referrals-heading {
        color: ${ this.referralnamecolor };
      }
      .squatch-referrals-description,
      .squatch-referrals-value-content {
        color: ${ this.referraltextcolor };
      }
    `

    return (
      this.ishidden 
      ? ''
      : (
        <div class={`squatch-referrals ${clz}`}>
          <div class="squatch-referrals-scroll-container">
            {referralsRow}
            {referredByRow}
          </div>
          <div class="squatch-referrals-scroll-action-container">
            <button class={`squatch-referrals-scroll-action previous ${this.offset === 0 ? "disabled" : ""}`} onClick={() => this.paginate(this.offset - 3)}>{this.paginateless}</button>
            <button 
              class={`
                squatch-referrals-scroll-action view-more ${
                  this.showreferrer && this.referredBy
                    ? this.offset >= this.referralsCount - 2
                      ? "disabled"
                      : ""
                    : this.offset >= this.referralsCount - 3
                      ? "disabled"
                      : ""
                }
              `} view-more onClick={() => this.paginate(this.offset + 3)}>{this.paginatemore}</button>
          </div>
        </div>
      )
    );
  }
}