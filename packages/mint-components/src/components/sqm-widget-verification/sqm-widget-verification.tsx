import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { useWidgetVerification } from "./useWidgetVerification";
import { useParentState } from "@saasquatch/component-boilerplate";
import { SHOW_CODE_NAMESPACE } from "./keys";
import { WidgetEmailVerification } from "./sqm-email-check/sqm-email-check";

/**
 * @uiName Widget Verification Gate
 * @slots [{ "name": "verified", "title": "Verified Content" }]
 */
@Component({
  tag: "sqm-widget-verification",
  shadow: true,
})
export class WidgetVerification {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const [showCode, setShowCode] = useParentState<boolean>({
      namespace: SHOW_CODE_NAMESPACE,
      initialValue: false,
    });

    const props = useWidgetVerification();

    const Code = () => {
      return (
        <div ref={props.setCodeRef}>
          <input name="code" />
          <input name="code" />
          <input name="code" />
          <input name="code" />
          <input name="code" />
          <hr />
          <button onClick={props.onCheckCode}>Check code</button>
        </div>
      );
    };

    const verificationStep = () => {
      switch (showCode) {
        case false:
          return <sqm-email-check></sqm-email-check>;
        case true:
          return <Code />;
      }
    };

    return (
      <div>
        <h3>Cash Payouts</h3>
        {verificationStep()}
      </div>
    );
  }
}
