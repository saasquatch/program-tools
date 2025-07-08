import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop } from "@stencil/core";

/**
 * @uiName Header Logo
 * @validParents ["sqm-portal-frame","div","sqm-brand"]
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
  @Prop() imageUrl: string;

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
          <img style={{ height: `${this?.height}px` }} src={this?.imageUrl} />
        </a>
      </Host>
    );
  }
}
