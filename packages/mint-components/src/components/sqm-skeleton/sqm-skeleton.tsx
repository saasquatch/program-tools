import { h, Component, State, Prop, Host } from "@stencil/core";

@Component({
  tag: "sqm-skeleton",
  shadow: true,
})
export class Skeleton {
  @State()
  ignored = true;

  /**
   * @uiName Height (in pixels or %)
   */
  @Prop() height?: string = "100%";

  /**
   * @uiName Width (in pixels or %)
   */
  @Prop() width?: string = "100%";

  disconnectedCallback() {}

  vanillaStyle = `
  sl-skeleton::part(indicator) {
    --sheen-color: var(--sqm-skeleton-animation-background);
    --color: var(--sqm-skeleton-background);
    border-radius: var(--sqm-border-radius-normal);
  }

  sl-skeleton::part(base) {
    height:${this.height};
    width:${this.width};
  }

  :host{
    display: block;
  }

  :host([hidden]) {
    display: none;
  }
  `;
  render() {
    console.log("This is the height", this.height);

    return (
      <div>
        <style type="text/css">{this.vanillaStyle}</style>
        <sl-skeleton></sl-skeleton>
      </div>
    );
  }
}
