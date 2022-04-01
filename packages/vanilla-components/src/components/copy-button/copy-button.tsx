import { h, Component, Prop, State } from "@stencil/core";
import { shadeColor, addClass, removeClass } from "../../utilities";
import { css } from "emotion";
import { API } from "../../services/WidgetHost";
import Clipboard from "clipboard";
/**
 * @uiName Copy Button
 */
@Component({
  tag: "sqh-copy-button",
  styleUrl: "copy-button.scss",
})
export class CopyButton {
   /**
   * Hide the component
   *
   * @uiName Is Hidden
   */
  @Prop() ishidden: boolean;
  /**
   * Text shown inside the copy button.
   *
   * @uiName Text
   */
  @Prop() text: string;
  /**
   * Sets a maximum width on the copy button.
   *
   * @uiName Width
   */
  @Prop() width: number;
  /**
   * Background color & border color of the copy button.
   *
   * @uiName Background Color
   */
  @Prop() backgroundcolor: string;
  /**
   * Configure border radius with pixel amount
   *
   * @uiName Border Radius
   */
  @Prop() borderradius: number;
  /**
   * Color of text inside the copy button.
   *
   * @uiName Text Color
   */
  @Prop() textcolor: string;
  /**
   * Font size of the copy button text. 
   *
   * @uiName Font Size
   */
  @Prop() fontsize: number;
  /**
   * Text shown when the code is successfully copied to the users clipboard. 
   *
   * @uiName Copy Success
   */
  @Prop() copysuccess: string;
  /**
   * Text shown when the button has failed to copy the code to the users clipboard. 
   *
   * @uiName Copy Failure
   */
  @Prop() copyfailure: string;
  /**
   * rewardkey is used to get the fuel tank code for a user. 
   *
   * @uiName Reward Key
   */
  @Prop() rewardkey: string;
  /**
   * Font size of the fuel tank code. 
   *
   * @uiName Code Font Size
   */
  @Prop() codefontsize: number;
  /**
   * Text color of the fuel tank code.
   *
   * @uiName Code Font Color
   */
  @Prop() codefontcolor: string;

  @State() fueltankcode: string;

  componentWillLoad() {
    if (!this.ishidden) {
      return API.graphql
        .getFueltankCode(this.rewardkey)
        .then((res) => {
          const fuelTank =
            res.rewards.data.length > 0
              ? res.rewards.data[0].fuelTankCode
              : null;
          this.fueltankcode =
            fuelTank || res.referredByReferral.referrerUser.referralCode;
        })
        .catch((e) => {
          this.onError(e);
        });
    }
  }

  onError(e: Error) {
    console.log("Error loading via GraphQL.", e);
  }

  notify(clipboardNotification, notificationText) {
    const notification = document.getElementById(
      clipboardNotification.slice(1)
    );
    notification.textContent = notificationText;

    addClass(notification, "in");

    setTimeout(() => {
      removeClass(notification, "in");
    }, 1400);
  }

  notifySuccess(e: Clipboard.Event) {
    this.notify(
      (e.trigger as HTMLElement).dataset.clipboardNotification,
      this.copysuccess
    );
  }

  notifyFailure(e: Clipboard.Event) {
    this.notify(
      (e.trigger as HTMLElement).dataset.clipboardNotification,
      this.copyfailure
    );
  }

  componentDidLoad() {
    const clipboard = new Clipboard("button");
    clipboard.on("success", this.notifySuccess.bind(this));
    clipboard.on("error", this.notifyFailure.bind(this));
  }

  render() {
    const style = css`
      max-width: ${this.width}px;
      background-color: ${this.backgroundcolor};
      border: ${this.backgroundcolor};
      color: ${this.textcolor};
      border-radius: ${this.borderradius}px;
      font-size: ${this.fontsize}px;

      &:hover {
        background-color: ${shadeColor(this.backgroundcolor, 10)};
        border-color: ${shadeColor(this.backgroundcolor, 12)};
        color: ${this.textcolor};
      }

      &:focus {
        color: ${this.textcolor};
      }
    `;

    const code = css`
      text-align: center;
      font-weight: bold;
      font-size: ${this.codefontsize};
      color: ${this.codefontcolor};
    `;
    const classes = [`sqh-copy-button`, style].join(" ");

    return (
      !this.ishidden && (
        <div>
          <div class={code}>{this.fueltankcode}</div>
          <div class="sqh-align-button">
            <span class="label fade" id="squatch-copy-notification">
              {this.copysuccess}
            </span>
            <button
              class={classes}
              data-clipboard-text={this.fueltankcode}
              data-clipboard-notification="#squatch-copy-notification"
            >
              {this.text}
            </button>
          </div>
        </div>
      )
    );
  }
}
