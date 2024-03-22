import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { RewardTableColumn } from "./RewardTableColumn";

/**
 * @uiName Reward Table Customer Note Column
 * @validParents ["sqm-rewards-table"]
 * @exampleGroup Rewards
 * @example Reward Table Customer Note Column - <sqm-rewards-table-customer-note-column column-title="Note"></sqm-rewards-table-customer-note-column>
 */
@Component({
  tag: "sqm-rewards-table-customer-note-column",
  shadow: true,
})
export class RewardTableCustomerNoteColumn implements RewardTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string = "Note";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Reward, options?: { locale: string }) {
    const reward = data;
    return (
      <sqm-rewards-table-customer-note-cell
        note={reward?.meta?.message}
        locale={options?.locale}
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
