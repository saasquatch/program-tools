import { Component, h, Prop } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { LinkButtonView } from "./sqm-link-button-view";

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

  render() {
    return (
      <LinkButtonView {...getProps(this)}>
        <slot />
      </LinkButtonView>
    );
  }
}

//TODO: Write a hook to resolve ICU strings
