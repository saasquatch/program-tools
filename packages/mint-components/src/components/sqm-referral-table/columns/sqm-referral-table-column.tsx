import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, getElement, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableGenericColumn implements ReferralTableColumn{
  @Prop() columnTitle: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  
  @Method()
  async renderCell(_:Referral) {
    // this is insecure, <script> tags can be added
    return (
      <sqm-referral-table-cell
        inner-template={getElement(this).innerHTML}
      ></sqm-referral-table-cell>
    );
  }

  @Method()
  async renderLabel() {
    return Promise.resolve(this.columnTitle);
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return (
      <Host style={{ display: "none" }}>
        <slot />
      </Host>
    );
  }
}
