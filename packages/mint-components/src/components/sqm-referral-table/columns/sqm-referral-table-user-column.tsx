import { Component, h, Method, Host, State, Prop } from "@stencil/core";

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

@Component({
  tag: "sqm-referral-table-user-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableUserColumn {
  @State()
  ignored = true;

  @Prop() columnTitle: string = "Customer";
  /**
   * @uiName Name displayed for anonymous users
   */
  @Prop() anonymousUser: string = "Anonymous User";
  /**
   * @uiName Name displayed for deleted users
   */
  @Prop() deletedUser: string = "Deleted User";

  @Method()
  async renderCell(data) {
    let name: string;
    if (!data) {
      name = this.deletedUser;
    } else if (!data?.firstName && !data.lastName) {
      name = this.anonymousUser;
    } else {
      name = `${data?.firstName} ${data?.lastName}`;
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
    return <Host style={{ display: "none" }} />;
  }
}
