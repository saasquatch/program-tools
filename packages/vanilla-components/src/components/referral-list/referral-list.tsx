import { h, Component, Prop, State } from "@stencil/core";
import { css } from "emotion";
import { uuid } from "../../utilities";
import { API } from "../../services/WidgetHost";

/**
 * @uiName Referral List
 * @canvasRenderer always-replace
 * @exampleGroup Referrals
 * @example Referral List - <sqh-referral-list ishidden="false" showreferrer="true" usefirstreward="false" referralnamecolor="darkslategray" referraltextcolor="lightgray" rewardcolor="#4BB543" pendingcolor="lightgray" pendingvalue="Reward Pending" referrervalue="Referred" referrercontent="Referred you {date}" convertedcontent="Signed up, referred {date}" pendingcontent="Trial user, referred {date}" pendingvalue="Referral pending" valuecontent="and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}" expiredcolor="lightgray" expiredvalue="Expired Reward" expiredcontent="Signed up, referred {date}" cancelledcolor="#C81D05" cancelledvalue="Cancelled Reward" cancelledcontent="Signed up, referred {date}" paginatemore="View More" paginateless="Previous" noreferralsyet="No Referrals Yet..." unknownuser="Your Friend"></sqh-referral-list>
 */
@Component({
  tag: "sqh-referral-list",
  styleUrl: "referral-list.scss",
})
export class ReferralList {
  /**
   * @undocumented
   * @uiName Hide Referral List
   */
  @Prop() ishidden: boolean;
  /**
   * Shown inside the paginate more button.
   *
   * @uiName Paginate More Text
   * @default View More
   */
  @Prop() paginatemore: string;
  /**
   * Shown inside the paginate less button.
   *
   * @uiName Paginate Less Text
   * @default Previous
   */
  @Prop() paginateless: string;
  /**
   * Shown when referral list is empty.
   *
   * @uiName Empty Referrals Text
   * @default No Referrals Yet...
   */
  @Prop() noreferralsyet: string;
  /**
   * Text color of the referred user's name.
   *
   * @uiName Referral Name Color
   * @uiWidget color
   * @format color
   * @default darkslategray
   */
  @Prop() referralnamecolor: string;
  /**
   * @uiName Referral Status Text Color
   * @uiWidget color
   * @format color
   * @default lightgray
   */
  @Prop() referraltextcolor: string;
  /**
   * Text shown when the referred user's name is unknown.
   *
   * @uiName Unknown User Text
   * @default Your Friend
   */
  @Prop() unknownuser: string;
  /**
   * @uiName Show Expired Rewards
   */
  @Prop() showexpiry: boolean;
  /**
   * @uiName Show Customer Note
   */
  @Prop() shownotes: boolean;
  /**
   * Shown when reward is redeemed.
   *
   * @uiName Redeemed Text
   * @uiGroup Converted Referrals
   * @default Redeemed
   */
  @Prop() redeemedvalue: string;
  /**
   * Show referral and reward information on who referred you.
   *
   * @uiName Show Referred By
   * @uiGroup Referrer
   */
  @Prop() showreferrer: boolean;
  /**
   * Text explaining who referred you to the program.
   *
   * @uiName Referrer Description
   * @uiGroup Referrer
   * @default Referred you {date}
   */
  @Prop() referrercontent: string;
  /**
   * Referred Text shown in reward column.
   *
   * @uiName Referrer Text
   * @uiGroup Referrer
   * @default Referred
   */
  @Prop() referrervalue: string;
  /**
   * Color of the successful reward icon and text in the rewards column.
   *
   * @uiName Reward Color
   * @uiGroup Converted Referrals
   * @uiWidget color
   * @format color
   * @default #4BB543
   */
  @Prop() rewardcolor: string;
  /**
   * @uiName Customer Note Color
   * @uiGroup Converted Referrals
   * @uiWidget color
   * @format color
   */
  @Prop() customernotecolor: string;
  /**
   * Show the value of the first earned reward inside the rewards column.
   *
   * @uiName Use First Reward
   * @uiGroup Converted Referrals
   */
  @Prop() usefirstreward: boolean;
  /**
   * Description shown in the referral column when a referral is converted.
   *
   * @uiName Converted Description
   * @uiGroup Converted Referrals
   * @default Signed up, referred {date}
   */
  @Prop() convertedcontent: string;
  /**
   * ICU message shown in the rewards column. See [ICU messages](https://unicode-org.github.io/icu/userguide/format_parse/messages/) for more details.
   *
   * @uiName Value Content
   * @uiGroup Converted Referrals
   * @uiWidget textArea
   * @default and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}
   */
  @Prop() valuecontent: string;
  /**
   * Color of the pending reward icon and text in the rewards column.
   *
   * @uiName Pending Color
   * @uiGroup Pending Referrals
   * @uiWidget color
   * @format color
   * @default lightgray
   */
  @Prop() pendingcolor: string;
  /**
   * Pending description shown in the referral column.
   *
   * @uiName Pending Description
   * @uiGroup Pending Referrals
   * @default Trial user, referred {date}
   */
  @Prop() pendingcontent: string;
  /**
   * Pending text shown alongside the icon in the rewards column.
   *
   * @uiName Pending Text
   * @uiGroup Pending Referrals
   * @default Referral pending
   */
  @Prop() pendingvalue: string;
  /**
   * Color of the expired reward icon and text in the rewards column.
   *
   * @uiName Expired Color
   * @uiGroup Expired Rewards
   * @uiWidget color
   * @format color
   * @default lightgray
   */
  @Prop() expiredcolor: string;
  /**
   * Expired text shown in the referral column.
   *
   * @uiName Expired Description
   * @uiGroup Expired Rewards
   * @default Signed up, referred {date}
   */
  @Prop() expiredcontent: string;
  /**
   * Expired text shown alongside the icon in the rewards column.
   *
   * @uiName Expired Text
   * @uiGroup Expired Rewards
   * @default Expired Reward
   */
  @Prop() expiredvalue: string;
  /**
   * Reward expiry ICU message
   *
   * @uiName Expires Text
   * @uiGroup Expired Rewards
   */
  @Prop() expiresvalue: string;
  /**
   * Color of the cancelled icon and text in the rewards column.
   *
   * @uiName Cancelled Color
   * @uiGroup Cancelled Rewards
   * @uiWidget color
   * @format color
   * @default #C81D05
   */
  @Prop() cancelledcolor: string;
  /**
   * Content shown in the referral column for a cancelled reward.
   *
   * @uiName Cancelled Referral Description
   * @uiGroup Cancelled Rewards
   * @default Signed up, referred {date}
   */
  @Prop() cancelledcontent: string;
  /**
   * Text shown alongside the icon in the rewards column for a cancelled reward.
   *
   * @uiName Cancelled Reward Text
   * @uiGroup Cancelled Rewards
   * @default Cancelled Reward
   */
  @Prop() cancelledvalue: string;
  /**
   * Use the value passed to the referral component to set the locale of the user.
   *
   * @uiName Internationalization
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
