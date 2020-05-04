import { h, Component, Prop, Element } from "@stencil/core";
import {
  shadeColor,
  detectMobileSafari,
  detectMobileChrome,
} from "../../utilities";
import { css } from "emotion";

@Component({
  tag: "sqh-share-button",
  styleUrl: "share-button.scss",
})
export class ShareButton {
  @Prop() displayrule: string;
  @Prop() text: string;
  @Prop() backgroundcolor: string;
  @Prop() textcolor: string;
  @Prop() icon: string;
  @Prop() buttonClassName: string;
  @Prop() iconhorizontal: number;
  @Prop() iconvertical: number;
  @Prop() iconsize: number;
  @Prop() type: string;
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
