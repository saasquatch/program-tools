import { h, Component, Prop, State } from "@stencil/core";
import { css } from "emotion";
import { uuid } from "../../utilities";
import { API } from "../../services/WidgetHost";

@Component({
  tag: "sqh-referral-list",
  styleUrl: "referral-list.scss",
})
export class ReferralList {
  // general in dropdown
  @Prop() ishidden: boolean;
  @Prop() paginatemore: string;
  @Prop() paginateless: string;
  @Prop() noreferralsyet: string;
  @Prop() referralnamecolor: string;
  @Prop() referraltextcolor: string;
  @Prop() unknownuser: string;
  @Prop() showexpiry: boolean;
  @Prop() shownotes: boolean;
  @Prop() redeemedvalue: string;
  // referrer props
  @Prop() showreferrer: boolean;
  @Prop() referrercontent: string;
  @Prop() referrervalue: string;
  // converted referral props
  @Prop() rewardcolor: string;
  @Prop() customernotecolor: string;
  @Prop() usefirstreward: boolean;
  @Prop() convertedcontent: string;
  @Prop() valuecontent: string;
  // pending referral props
  @Prop() pendingcolor: string;
  @Prop() pendingcontent: string;
  @Prop() pendingvalue: string;
  // expired reward props
  @Prop() expiredcolor: string;
  @Prop() expiredcontent: string;
  @Prop() expiredvalue: string;
  @Prop() expiresvalue: string;
  // cancelled reward props
  @Prop() cancelledcolor: string;
  @Prop() cancelledcontent: string;
  @Prop() cancelledvalue: string;
  //internationalization props
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
      return this.getReferrals()
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

  getReferrals(offset = 0) {
    return API.graphql.getReferrals(offset);
  }

  paginate(offset, event) {
    if (this.loading) return null;
    let { referralsCount } = this;
    if (this.showreferrer && this.referredBy) referralsCount++;
    if (offset >= referralsCount || offset < 0) return null;
    this.loading = true;
    const { target } = event;
    target.innerText = "...";
    this.getReferrals(offset).then((res) => {
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
