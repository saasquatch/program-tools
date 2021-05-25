import { h, Component, Host, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useRouter } from "./useRouter";

/**
 * @uiName Router (for pages)
 */
@Component({
  tag: "sqm-router",
  styleUrl: "sqm-router.css",
})
export class SqmRouter {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { callbacks } = useRouter();
    return (
      <Host>
        <div ref={callbacks.setSlot} style={{ display: "none" }}>
          <slot />
        </div>
        <div style={{ display: "contents" }} ref={callbacks.setContainer}></div>
      </Host>
    );
  }
}
