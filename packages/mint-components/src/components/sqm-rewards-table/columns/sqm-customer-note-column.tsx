import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Customer Note Column
 */
@Component({
  tag: "sqm-rewards-table-customer-note-column",
  shadow: true,
})
export class RewardTableCustomerNoteColumn implements RewardTableColumn {
  /**
   * @uiName Customer Note Column Title
   */
  @Prop() columnTitle: string = "Note";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward[], locale: string) {
    const reward = data?.[0];

    console.log("reward column - locale", { locale });
    console.log("REWARD", reward);
    return (
      <sqm-rewards-table-customer-note-cell
        note={reward?.meta?.message}
        locale={locale}
      ></sqm-rewards-table-customer-note-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
