import { h, Component, Prop, Element } from "@stencil/core";
import {
  shadeColor,
  detectMobileSafari,
  detectMobileChrome,
} from "../../utilities";
import { css } from "emotion";

/**
 * @uiName Share Button
 */
@Component({
  tag: "sqh-share-button",
  styleUrl: "share-button.scss",
})
export class ShareButton {
  /**
   * Show or hide button depending on what type of device the user is on
   *
   * @uiName Share Button Display Rule
   */
  @Prop() displayrule: string;
  /**
   * Text inside the share button
   *
   * @uiName Share Button Text
   */
  @Prop() text: string;
  /**
   * Background color of the share button
   *
   * @uiName Share Button Background Color
   */
  @Prop() backgroundcolor: string;
  /**
   * Color of the text inside the share button
   *
   * @uiName Share Button Text Color
   */
  @Prop() textcolor: string;
  /**
   * Share button icon
   *
   * @uiName Share Button Icon
   */
  @Prop() icon: string;
  /**
   * CSS Class name used to style the share button
   *
   * @uiName Share Button Class Name
   */
  @Prop() buttonClassName: string;
  /**
   * Number to horizontally align the share button icon
   *
   * @uiName Share Button Icon Horizontal
   */
  @Prop() iconhorizontal: number;
  /**
   * Number to vertically align the share button icon
   *
   * @uiName Share Button Icon Vertical
   */
  @Prop() iconvertical: number;
  /**
   * Size of the Share button icon
   *
   * @uiName Share Button Icon Size
   */
  @Prop() iconsize: number;
  /**
   * Type of the share button
   *
   * @uiName Share Button Type
   */
  @Prop() type: string;
  /**
   * URL redirect location
   *
   * @uiName URL
   */
  @Prop() url: string;

  @Element() button: HTMLElement;

  clickHandler(e) {
    if (window["widgetIdent"].env === "demo") {
      e.preventDefault();
      return;
    }
    // checking for null on closest 'a' tag makes click handler avoid firing when margin is clicked
    var anchor = e.target.closest("a");
    if (anchor !== null && this.buttonClassName !== "email-share") {
      e.preventDefault();

      const url = this.url;
      const target = "_blank";
      const features = "status=0,width=680,height=580";
      window.open(url, target, features);
    }
  }

  componentDidLoad() {
    let el = this.button;
    el.addEventListener("click", this.clickHandler.bind(this), false);
  }

  render() {
    const isMobileiOS = detectMobileSafari() || detectMobileChrome();
    const target = isMobileiOS ? "_parent" : "_blank";
    const iconClass = `icon icon-${this.icon}`;

    const style = css`
      background-color: ${this.backgroundcolor};
      border: 1px solid ${this.backgroundcolor};
      color: ${this.textcolor};

      &:hover {
        background: ${shadeColor(this.backgroundcolor, 10)};
        border-color: ${shadeColor(this.backgroundcolor, 12)};
        color: ${this.textcolor};
      }

      &:focus {
        color: ${this.textcolor};
      }
      .icon-${this.icon} {
        left: ${this.iconhorizontal}px;
        top: ${this.iconvertical}px;
        font-size: ${this.iconsize}em;
      }
    `;

    const classes = [
      `squatch-share-btn`,
      this.buttonClassName,
      this.displayrule,
      style,
    ].join(" ");

    return (
      <a class={classes} href={this.url} target={target}>
        <i class={iconClass}></i>
        <span class="share-btn-text">{this.text}</span>
      </a>
    );
  }
}
