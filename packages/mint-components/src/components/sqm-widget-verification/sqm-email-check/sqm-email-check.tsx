import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { useEmailCheck } from "./useEmailCheck";

/**
 * @uiName Widget Verification Gate
 */
@Component({
  tag: "sqm-email-check",
  shadow: true,
})
export class WidgetEmailVerification {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const props = useEmailCheck();
    return (
      <div>
        <form onSubmit={props.submitEmail}>
          <input type="email" name="email" required />
          <button type="submit">{props.loading ? "Loading" : "Verify"}</button>
        </form>
      </div>
    );
  }
}
