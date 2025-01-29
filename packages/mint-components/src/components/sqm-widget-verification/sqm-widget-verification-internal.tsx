import {
  isDemo,
  useLazyQuery,
  useParentState,
  useSetParent,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState, withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import {
  SHOW_CODE_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_PARENT_NAMESPACE,
} from "./keys";
import { getProps } from "../../utils/utils";
import { extractProps } from "../tax-and-cash/sqm-tax-and-cash/extractProps";
import { gql } from "graphql-request";
import { useEffect } from "@saasquatch/universal-hooks";

const USER_LOOKUP = gql`
  query checkUserVerification {
    viewer {
      ... on User {
        id
        accountId
        email
        emailVerified
        managedIdentity {
          email
          emailVerified
        }
      }
    }
  }
`;

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
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);
  const [loading, setLoading] = useState(true);
  const [fetch] = useLazyQuery(USER_LOOKUP);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch({});
        if (!res || res instanceof Error) throw new Error();

        if (res?.viewer?.emailVerified) setContext(true);
        else if (res?.viewer?.managedIdentity?.emailVerified) setContext(true);
      } catch (e) {
        console.error("Could not fetch user information:", e);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const onVerification = () => {
    setContext(true);
  };

  return { showCode, onVerification, loading };
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
    const { showCode, onVerification, loading } = isDemo()
      ? useDemoWidgetVerificationInternal()
      : useWidgetVerificationInternal();

    // TODO: Shoelace spinner is throwing errors
    if (loading) return <div></div>;
    // if (loading) {
    //   return <sl-spinner style="font-size: 2rem;"></sl-spinner>;
    // }

    if (showCode) {
      return (
        <sqm-code-verification
          onVerification={onVerification}
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
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

  const onVerification = () => {
    setContext(true);
  };

  return { showCode, onVerification, loading: false };
}
