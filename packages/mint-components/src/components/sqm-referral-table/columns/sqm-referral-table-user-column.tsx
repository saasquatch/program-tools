import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-user-column",
  shadow: true,
})
export class ReferralTableUserColumn implements ReferralTableColumn {
  @Prop() columnTitle: string = "Customer";
  /**
   * @uiName Name displayed for anonymous users
   */
  @Prop() anonymousUser: string = "Anonymous User";
  /**
   * @uiName Name displayed for deleted users
   */
  @Prop() deletedUser: string = "Deleted User";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    let name: string;
    if (!data?.referredUser) {
      name = this.deletedUser;
    } else if (!data?.referredUser?.firstName && !data?.referredUser?.lastName) {
      name = this.anonymousUser;
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

  render() {
    useRequestRerender([
      this.deletedUser,
      this.anonymousUser,
      this.columnTitle,
    ]);
    return <Host style={{ display: "none" }} />;
  }
}
