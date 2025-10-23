import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @uiName Header Logo
 */
@Component({
  tag: "sqm-header-logo",
  shadow: true,
})
export class HeroImage {
  /**
   * @uiWidget ImageUpload
   * @format url
   * @uiName Logo image
   */
  @Prop() imageUrl?: string;
  /**
   * @uiName Logo text
   */
  @Prop() logoText?: string;
  /**
   * @uiName Logo text
   */
  @Prop() logoTextSize?: string = "24px";
  /**
   * @uiWidget color
   * @uiName Logo text
   */
  @Prop() logoTextColor?: string;

  /**
   * Page participants are navigated to after clicking the header logo.
   *
   * @uiName Redirect path
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Logo height
   */
  @Prop() height: number = 60;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <Host>
        <a href={this.nextPage} part="sqm-link">
          {this.imageUrl ? (
            <img style={{ height: `${this?.height}px` }} src={this?.imageUrl} />
          ) : (
            <h3
              style={{
                fontSize: this.logoTextSize,
                color: this.logoTextColor || "inherit",
              }}
            >
              {this.logoText}
            </h3>
          )}
        </a>
      </Host>
    );
  }
}
