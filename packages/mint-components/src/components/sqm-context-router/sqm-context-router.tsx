import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, State, h } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { useContextRouter } from "./useContextRouter";

/**
 * @uiName Context Router
 * @slots [{"name":"","title":"Routes"}]
 */
@Component({
  tag: "sqm-context-router",
  styleUrl: "sqm-context-router.css",
})
export class SqmContextRouter {
  @State()
  ignored = true;

  @Prop()
  contextName: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { callbacks } = useContextRouter(getProps(this));
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
