import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { ButtonType, LinkButtonView } from "./sqm-link-button-view";

/**
 * @uiName Link Button
 * @exampleGroup Common Components
 * @example Link Button - <sqm-link-button link="www.example.com" open-in-new-tab="true">Click here</sqm-link-button>
 */
@Component({
  tag: "sqm-link-button",
  shadow: true,
})
export class LinkButton {
  /**
   * @required
   * @uiName Link
   */
  @Prop() link: string;
  /**
   * @uiName Open link in new tab
   */
  @Prop() openInNewTab: boolean = false;
  /**
   * @uiName Button type
   * @uiType string
   * @uiEnum ["default", "primary", "success", "neutral", "warning", "danger"]
   */
  @Prop() buttonType?:
    | "default"
    | "primary"
    | "success"
    | "neutral"
    | "warning"
    | "danger" = "primary";
  /**
   * @uiName Button text
   * @uiType string
   */
  @Prop() buttonText?: string = "Click here";

  // clickHandler(e) {
  //   // if (window["widgetIdent"].env === "demo") {
  //   //   e.preventDefault();
  //   //   return;
  //   // }
  //     e.preventDefault();

  //     const url = this.link;
  //     const target = "_blank";
  //     window.open(url, target);

  // }

  // componentDidLoad() {
  //   let el = this;
  //   el.addEventListener("click", this.clickHandler.bind(this), false);
  // }

  render() {
    const url = this.link;
    const target = this.openInNewTab ? "_blank" : "_parent";
    window.open(url, target);
    return <LinkButtonView {...getProps(this)}></LinkButtonView>;
  }
}

//TODO: Write a hook to resolve ICU strings
