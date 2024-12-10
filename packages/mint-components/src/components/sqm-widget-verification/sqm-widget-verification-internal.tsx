import {
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h } from "@stencil/core";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "./keys";

@Component({
  tag: "sqm-widget-verification-internal",
  shadow: true,
})
export class WidgetVerificationInternal {
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
      initialValue: userIdentity?.email,
    });

    if (showCode) {
      return <sqm-code-verification></sqm-code-verification>;
    }

    return <sqm-email-verification></sqm-email-verification>;
  }
}
