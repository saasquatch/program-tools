import { h, Component, Host, State } from "@stencil/core";
import { withHooks } from "@saasquatch/stencil-hooks";
import { useRouter } from "./useRouter";

/**
 * @uiName Router
 * @validParents ["sqm-portal-container","div","sqm-divided-layout","sqm-brand","template","sqm-hero","sqm-tab", "sqb-program-section", "sqb-conditional-section"]
 * @validChildren ["sqm-route"]
 * @slots [{"name":"","title":"Routes"}]
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
