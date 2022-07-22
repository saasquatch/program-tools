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
   * @uiName Logo Image
   */
  @Prop() imageUrl: string;

  /**
   * Page participants are navigated to after clicking the header logo.
   *
   * @uiName Redirect Path
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Logo Height
   */
  @Prop() height: number = 60;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <Host>
        <a href={this.nextPage}>
          <img style={{ height: `${this?.height}px` }} src={this?.imageUrl} />
        </a>
      </Host>
    );
  }
}
