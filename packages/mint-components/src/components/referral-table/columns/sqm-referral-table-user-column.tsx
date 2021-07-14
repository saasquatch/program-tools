import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Host, State } from "@stencil/core";

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

@Component({
  tag: "sqm-referral-table-user-column",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableUserColumn {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  @Method()
  async renderCell(data) {
    return <span>{`${data.firstName} ${data.lastName}`}</span>;
  }

  @Method()
  async renderLabel() {
    return "Customer";
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
