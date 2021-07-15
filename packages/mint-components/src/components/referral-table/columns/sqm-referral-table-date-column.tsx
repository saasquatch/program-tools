import { useHost } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { Component, h, Method, Host, State, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-date-column",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableDateColumn {
  @State()
  ignored = true;

  @Prop() dateLabel: string = "Date Converted";
  @Prop() dateShown: string = "dateConverted";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data) {
    return (
      <sqm-referral-table-date-cell
        date={data[this.dateShown]}
      ></sqm-referral-table-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.dateLabel;
  }

  render() {
    useReferralTableDate(this);

    return <Host style={{ display: "none" }} />;
  }
}

function useReferralTableDate(props) {
  const host = useHost();
  useEffect(() => {
    host.dispatchEvent(
      new CustomEvent("attributeUpdated", {
        detail: true,
        bubbles: true,
        composed: true,
      })
    );
  }, [props.dateLabel, props.dateShown]);
}
