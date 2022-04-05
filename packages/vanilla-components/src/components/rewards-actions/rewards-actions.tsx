import { h, Component, Prop } from "@stencil/core";

/**
 * @uiName Reward Actions
 */
@Component({
  tag: "sqh-rewards-actions",
  styleUrl: "rewards-actions.scss",
})
export class RewardsActions {
  /**
   * Text inside the previous button
   *
   * @uiName Previous Button Text
   */
  @Prop() previoustext: string = "Previous";
  /**
   * Text inside the hide button
   *
   * @uiName Hide Button Text
   */
  @Prop() hidetext: string = "Hide";
  /**
   * Text inside the next button
   *
   * @uiName Next Button Text
   */
  @Prop() nexttext: string = "Next";

  render() {
    return (
      <div class="squatch-referrals-actions">
        <button
          class="btn btn-default disabled"
          data-scroll-element="#squatch-referrals-scroll"
          data-scroll-increment="-3"
        >
          {this.previoustext}
        </button>

        <button
          class="btn btn-default"
          data-close-panel="#squatch-panel"
          data-scroll-reset="#squatch-referrals-scroll"
        >
          {this.hidetext}
        </button>

        <button
          class="btn btn-default disabled"
          data-scroll-element="#squatch-referrals-scroll"
          data-scroll-increment="3"
        >
          {this.nexttext}
        </button>
      </div>
    );
  }
}
