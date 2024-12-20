import { Component, h, Host, Prop } from "@stencil/core";
import { EmptyStateView } from "./sqm-empty-view";

/**
 * @uiName Empty State Content
 * @validParents ["sqm-referral-table","sqm-rewards-table","sqm-leaderboard","sqm-reward-exchange-list"]
 */
@Component({
  tag: "sqm-empty",
  shadow: true,
})
export class Empty {
  /**
   * @uiWidget ImageUpload
   * @format url
   * @uiName Image */
  @Prop() emptyStateImage?: string =
    "https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png";

  /** @uiName Title  */
  @Prop() emptyStateHeader: string;

  /**
   * @uiName Description
   * @uiWidget textArea
   */
  @Prop() emptyStateText: string;

  /**
   * @uiName Description
   * @uiWidget textArea
   */
  @Prop() supportText?: string;

  render() {
    return (
      <Host slot="empty">
        <EmptyStateView
          emptyStateImage={this.emptyStateImage}
          emptyStateHeader={this.emptyStateHeader}
          emptyStateText={this.emptyStateText}
          supportText={this.supportText}
        />
      </Host>
    );
  }
}
