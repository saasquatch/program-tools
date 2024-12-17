import {
  isDemo,
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import { SHOW_CODE_NAMESPACE, VERIFICATION_EMAIL_NAMESPACE } from "./keys";
import { getProps } from "../../utils/utils";
import { extractProps } from "../tax-and-cash/sqm-tax-and-cash/extractProps";

function useWidgetVerificationInternal() {
  const userIdentity = useUserIdentity();
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: userIdentity?.email,
  });

  return { showCode };
}

@Component({
  tag: "sqm-widget-verification-internal",
  shadow: true,
})
export class WidgetVerificationInternal {
  @Prop() emailStep_verifyEmailHeaderText: string;
  @Prop() emailStep_sendCodeErrorHeader: string;
  @Prop() emailStep_sendCodeErrorDescription: string;
  @Prop() emailStep_emailLabel: string;
  @Prop() emailStep_sendCodeText: string;
  @Prop() emailStep_emailValidationErrorText: string;
  @Prop() codeStep_verifyCodeHeaderText: string;
  @Prop() codeStep_reverifyCodeHeaderText: string;
  @Prop() codeStep_resendCodeText: string;
  @Prop() codeStep_resendCodeLabel: string;
  @Prop() codeStep_codeResentSuccessfullyText: string;
  @Prop() codeStep_invalidCodeText: string;
  @Prop() codeStep_verifyText: string;
  @Prop() codeStep_networkErrorMessage: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getStepTextProps(prefix: string) {
    const props = getProps(this);
    return extractProps(props, prefix);
  }

  render() {
    const { showCode } = isDemo()
      ? useDemoWidgetVerificationInternal()
      : useWidgetVerificationInternal();

    if (showCode) {
      return (
        <sqm-code-verification
          {...this.getStepTextProps("codeStep_")}
        ></sqm-code-verification>
      );
    }

    return (
      <sqm-email-verification
        {...this.getStepTextProps("emailStep_")}
      ></sqm-email-verification>
    );
  }
}

function useDemoWidgetVerificationInternal() {
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: undefined,
  });

  return { showCode };
}
