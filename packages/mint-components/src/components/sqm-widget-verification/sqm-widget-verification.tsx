import {
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "./keys";

/**
 * @uiName Widget Verification Gate
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
    const userIdentity = useUserIdentity();
    const [showCode, setShowCode] = useParentState<boolean>({
      namespace: SHOW_CODE_NAMESPACE,
      initialValue: false,
    });
    const [email, setEmail] = useParentState<string | undefined>({
      namespace: VERIFICATION_EMAIL_NAMESPACE,
      initialValue: userIdentity?.managedIdentity?.email,
    });

    const verificationStep = () => {
      switch (showCode) {
        case false:
          return <sqm-email-verification></sqm-email-verification>;
        case true:
          return <sqm-code-verification></sqm-code-verification>;
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
