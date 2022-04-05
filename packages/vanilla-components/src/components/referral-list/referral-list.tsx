import { h, Component, Prop, State } from "@stencil/core";
import { css } from "emotion";
import { uuid } from "../../utilities";
import { API } from "../../services/WidgetHost";

/**
 * @uiName Referral List
 */
@Component({
  tag: "sqh-referral-list",
  styleUrl: "referral-list.scss",
})
export class ReferralList {
  /**
   * Hide or show the component
   *
   * @uiName Hide Referral List
   */
  @Prop() ishidden: boolean;
  /**
   * Shown inside the paginate more button
   *
   * @uiName Paginate More Text
   */
  @Prop() paginatemore: string;
  /**
   * Shown inside the paginate less button
   *
   * @uiName Paginate Less Text
   */
  @Prop() paginateless: string;
  /**
   * Shown when referral list is empty
   *
   * @uiName Empty Referrals Text
   */
  @Prop() noreferralsyet: string;
  /**
   * Text color of the referred users name
   *
   * @uiName Referral Name Color
   */
  @Prop() referralnamecolor: string;
  /**
   * Text color of the referral status
   *
   * @uiName Referral Text Color
   */
  @Prop() referraltextcolor: string;
  /**
   * Text shown when the referred users name is unknown
   *
   * @uiName Unknown User Text
   */
  @Prop() unknownuser: string;
  /**
   * Show or hide expired rewards
   *
   * @uiName Show Expiry
   */
  @Prop() showexpiry: boolean;
  /**
   * Show the customer note for a referral
   *
   * @uiName Show Customer Note
   */
  @Prop() shownotes: boolean;
  /**
   * Shown when reward is redeemed
   *
   * @uiName Redeemed Value
   */
  @Prop() redeemedvalue: string;
  /**
   * Show or hide the referrer
   *
   * @uiName Show Referrer
   * @uiGroup referrerProps
   */
  @Prop() showreferrer: boolean;
  /**
   * Text explaining who referred you to the program
   *
   * @uiName Referrer Content
   * @uiGroup referrerProps
   */
  @Prop() referrercontent: string;
  /**
   * Referred Text shown in reward column
   *
   * @uiName Referrer Value
   * @uiGroup referrerProps
   */
  @Prop() referrervalue: string;
  /**
   * Color of the successful reward icon and the text value
   *
   * @uiName Reward Color
   * @uiGroup convertedReferralProps
   */
  @Prop() rewardcolor: string;
  /**
   * Color of the customer note
   *
   * @uiName Reward Color
   * @uiGroup convertedReferralProps
   */
  @Prop() customernotecolor: string;
  /**
   * Show value of the first earned reward inside the rewards column
   *
   * @uiName Use First Reward
   * @uiGroup convertedReferralProps
   */
  @Prop() usefirstreward: boolean;
  /**
   * Content shown when a referral is converted
   *
   * @uiName Converted Content
   * @uiGroup convertedReferralProps
   */
  @Prop() convertedcontent: string;
  /**
   * Value shown in the rewards column
   *
   * @uiName Value Content
   * @uiGroup convertedReferralProps
   */
  @Prop() valuecontent: string;
  /**
   * Color of the pending icon and text
   *
   * @uiName Pending Color
   * @uiGroup pendingReferralProps
   */
  @Prop() pendingcolor: string;
  /**
   * Pending content shown in the user column
   *
   * @uiName Pending Content
   * @uiGroup pendingReferralProps
   */
  @Prop() pendingcontent: string;
  /**
   * Pending content shown alongside the icon in the referral column
   *
   * @uiName Pending Value
   * @uiGroup pendingReferralProps
   */
  @Prop() pendingvalue: string;
  /**
   * Color of the expired icon and text
   *
   * @uiName Expired Color
   * @uiGroup expiredRewardProps
   */
  @Prop() expiredcolor: string;
  /**
   * Expired content shown in the user column
   *
   * @uiName Expired Content
   * @uiGroup expiredRewardProps
   */
  @Prop() expiredcontent: string;
  /**
   * Expired content shown alongside the icon in the referral column
   *
   * @uiName Expired Value
   * @uiGroup expiredRewardProps
   */
  @Prop() expiredvalue: string;
  /**
   * Reward expiry ICU message
   *
   * @uiName Expires Value
   * @uiGroup expiredRewardProps
   */
  @Prop() expiresvalue: string;
  /**
   * Color of the cancelled icon and text
   *
   * @uiName Cancelled Color
   * @uiGroup cancelledRewardProps
   */
  @Prop() cancelledcolor: string;
  /**
   * Cancelled text content shown in the user column
   *
   * @uiName Cancelled Content
   * @uiGroup cancelledRewardProps
   */
  @Prop() cancelledcontent: string;
  /**
   * Cancelled text content shown alongside the icon in the referral column
   *
   * @uiName Cancelled Value
   * @uiGroup cancelledRewardProps
   */
  @Prop() cancelledvalue: string;
  /**
   * When true, the local gets set by using the value passed to the referral component
   *
   * @uiName Internationalization
   * @uiGroup internationalizationProps
   */
  @Prop() internationalization: boolean;

  @State() referrals: Referral[];
  @State() referralsCount: number;
  @State() referredBy: any;
  @State() rewards: Array<any>;
  @State() loading: boolean;
  @State() offset: number = 0;
  @State() locale: string;

  constructor() {
    this.loading = true;
  }

  componentWillLoad() {
    if (!this.ishidden) {
      return this.getReferrals(this.showreferrer)
        .then((res) => {
          this.referrals = res.referrals.data;
          this.referredBy = res.referredByReferral;
          this.referralsCount = res.referrals.totalCount;
          this.loading = false;
          this.locale = res.locale;
        })
        .catch((e) => {
          this.onError(e);
        });
    }
  }

  getReferrals(showReferrer: boolean, offset: number = 0) {
    return API.graphql.getReferrals(showReferrer, offset);
  }

  paginate(offset, event) {
    if (this.loading) return null;
    let { referralsCount } = this;
    if (this.showreferrer && this.referredBy) referralsCount++;
    if (offset >= referralsCount || offset < 0) return null;
    this.loading = true;
    const { target } = event;
    target.innerText = "...";
    this.getReferrals(this.showreferrer, offset).then((res) => {
      target.innerText =
        offset > this.offset ? this.paginatemore : this.paginateless;
      this.referrals = res.referrals.data;
      this.offset = offset;
      this.loading = false;
    });
  }

  onError(e: Error) {
    console.error(e);
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
      referrervalue: this.referrervalue,
      valuecontent: this.valuecontent,
      expiredcontent: this.expiredcontent,
      expiredvalue: this.expiredvalue,
      expiresvalue: this.expiresvalue,
      redeemedvalue: this.redeemedvalue,
      showexpiry: this.showexpiry,
      shownotes: this.shownotes,
      cancelledvalue: this.cancelledvalue,
      cancelledcontent: this.cancelledcontent,
    };

    if (this.referrals) {
      referralsRow = this.referrals.map((ref) => {
        const referraltype =
          ref.rewards.length > 0 || ref.dateConverted ? "converted" : "pending";
        return (
          <sqh-referral-component
            id={uuid()}
            referral={ref}
            referralvariables={referralvariables}
            referraltype={referraltype}
            unknownuser={this.unknownuser}
            locale={this.internationalization ? this.locale : "en-US"}
          ></sqh-referral-component>
        );
      });
    }

    if (this.referrals.length < 3 && this.referredBy && this.showreferrer) {
      referredByRow = (
        <sqh-referral-component
          id={uuid()}
          referral={this.referredBy}
          referralvariables={referralvariables}
          referraltype="referrer"
          unknownuser={this.unknownuser}
          locale={this.internationalization ? this.locale : "en-US"}
        ></sqh-referral-component>
      );
    }

    const clz = css`
      .squatch-referrals-icon.icon-ok-circled {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-icon.icon-attention {
        color: ${this.pendingcolor};
      }
      .squatch-referrals-value {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-value.pending {
        color: ${this.pendingcolor};
      }
      .squatch-referrals-value.referrer {
        color: ${this.rewardcolor};
      }
      .squatch-referrals-value.expired {
        color: ${this.expiredcolor};
      }
      .squatch-value-contents.expired {
        color: ${this.expiredcolor};
      }
      .squatch-referrals-icon.icon-attention.expired {
        color: ${this.expiredcolor};
      }
      .squatch-referrals-value.cancelled {
        color: ${this.cancelledcolor};
      }
      .squatch-value-contents.cancelled {
        color: ${this.cancelledcolor};
      }
      .squatch-referrals-icon.icon-attention.cancelled {
        color: ${this.cancelledcolor};
      }
      .squatch-referrals-heading {
        color: ${this.referralnamecolor};
      }
      .squatch-referrals-description,
      .squatch-referrals-value-content {
        color: ${this.referraltextcolor};
      }
      .squatch-customer-note {
        color: ${this.customernotecolor || "darkslategray"};
      }
      .squatch-referrals-scroll-action {
        font-family: ${"inherit"};
      }
    `;

    const totalReferralsCount =
      this.showreferrer && this.referredBy
        ? this.referralsCount + 1
        : this.referralsCount;

    return !this.ishidden && totalReferralsCount > 0 ? (
      // Referral List when not hidden and 1 or more referrals
      <div class={`squatch-referrals ${clz}`}>
        <div class="squatch-referrals-scroll-container">
          {referralsRow}
          {referredByRow}
        </div>
        <div class="squatch-referrals-scroll-action-container">
          <button
            class={`
                squatch-referrals-scroll-action previous ${
                  this.loading
                    ? "disabled"
                    : this.offset === 0
                    ? "disabled"
                    : ""
                }
              `}
            onClick={(event) => this.paginate(this.offset - 3, event)}
          >
            {this.paginateless}
          </button>
          <button
            class={`
                squatch-referrals-scroll-action view-more ${
                  this.loading
                    ? "disabled"
                    : this.showreferrer && this.referredBy
                    ? this.offset >= this.referralsCount - 2
                      ? "disabled"
                      : ""
                    : this.offset >= this.referralsCount - 3
                    ? "disabled"
                    : ""
                }
              `}
            view-more
            onClick={(event) => this.paginate(this.offset + 3, event)}
          >
            {this.paginatemore}
          </button>
        </div>
      </div>
    ) : (
      // 'No Referrals Yet' button if this.referralCount < 1
      <div class="squatch-referrals-scroll-action-container">
        <button disabled class="squatch-no-referrals-yet">
          {this.noreferralsyet}
        </button>
      </div>
    );
  }
}
