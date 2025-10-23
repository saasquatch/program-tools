import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { Referral, Referrer } from "../../../saasquatch";
import { useRequestRerender } from "../../../tables/re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

/**
 * @uiName Referral Table User Column
 * @validParents ["sqm-referral-table"]
 * @exampleGroup Referrals
 * @example Referral Table User Column - <sqm-referral-table-user-column column-title="Customer" anonymous-user="Anonymous User" deleted-user="Deleted User"></sqm-referral-table-user-column>
 */
@Component({
  tag: "sqm-referral-table-user-column",
  shadow: true,
})
export class ReferralTableUserColumn implements ReferralTableColumn {
  /**
   * @uiName User column title
   */
  @Prop() columnTitle: string = "Customer";
  /**
   * Name displayed for unknown users
   *
   * @uiName Anonymous user text
   */
  @Prop() anonymousUser: string = "Anonymous User";
  /**
   * Name displayed for deleted users
   *
   * @uiName Deleted user text
   */
  @Prop() deletedUser: string = "Deleted User";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    let name: string;
    if (!data?.referredUser && !data?.referrerUser) {
      name = this.deletedUser;
    } else if (
      !data?.referredUser?.firstName &&
      !data?.referredUser?.lastName &&
      !data?.referrerUser?.firstName &&
      !data?.referrerUser?.lastName
    ) {
      name = this.anonymousUser;
    } else if (data?.referrerUser) {
      name = `${data?.referrerUser?.firstName} ${data?.referrerUser?.lastName}`;
    } else {
      name = `${data?.referredUser?.firstName} ${data?.referredUser?.lastName}`;
    }

    return (
      <sqm-referral-table-user-cell name={name}></sqm-referral-table-user-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  @Method()
  async renderReferrerCell(data: Referrer) {
    let name: string;

    if (!data) {
      name = this.deletedUser;
    } else if (!data?.referrerUser?.firstName && !data.referrerUser?.lastName) {
      name = this.anonymousUser;
    } else {
      name = `${data?.referrerUser?.firstName} ${data?.referrerUser?.lastName}`;
    }

    return (
      <sqm-referral-table-user-cell name={name}></sqm-referral-table-user-cell>
    );
  }

  render() {
    useRequestRerender([
      this.deletedUser,
      this.anonymousUser,
      this.columnTitle,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
