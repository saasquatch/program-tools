import { h, Component, Prop } from "@stencil/core";

@Component({
  tag: "sqh-rewards-actions",
  styleUrl: "rewards-actions.scss",
})
export class RewardsActions {
  @Prop() previoustext: string = "Previous";
  @Prop() hidetext: string = "Hide";
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
