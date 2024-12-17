import { useParentState } from "@saasquatch/component-boilerplate";
import { useHost, withHooks } from "@saasquatch/stencil-hooks";
import { useCallback, useEffect, useState } from "@saasquatch/universal-hooks";
import { Component, h, Host, Prop } from "@stencil/core";
import debugFn from "debug";
import { VERIFICATION_EVENT_KEY, VERIFICATION_PARENT_NAMESPACE } from "./keys";
import { getProps } from "../../utils/utils";
const debug = debugFn("sq:widget-verification");

function useTemplateChildren({ parent, callback }) {
  const parentObserver = new MutationObserver(listenForTemplateChanges);
  const childTemplateObserver = new MutationObserver(callback);

  parentObserver.observe(parent, {
    childList: true,
    // We only care about immediate children templates
    subtree: false,
  });
  listenForTemplateChanges({ addedNodes: parent.querySelectorAll("template") });

  function listenForTemplateChanges(mutationList) {
    // Be smart, only look at the mutation list
    mutationList.addedNodes?.forEach((t) => {
      childTemplateObserver.observe(t.content, {
        childList: true,
        attributes: true,
        // Look deep into the templates for re-rendering
        subtree: true,
      });
    });
  }

  return () => {
    parentObserver.disconnect();
    childTemplateObserver.disconnect();
  };
}

/**
 * @uiName Widget Verification Gate
 * @slots [{"name":"not-verified","title":"Not verified template"},{"name":"verified","title":"Verified template"}]
 * @canvasRenderer always-replace
 * @exampleGroup Widget Verification
 * @example Widget Verification Gate - <sqm-widget-verification><template slot="verified"><sqm-tax-and-cash></sqm-tax-and-cash></template></sqm-widget-verification>
 */
@Component({
  tag: "sqm-widget-verification",
})
export class WidgetVerification {
  // ! Any updated must be reflected in sqm-widget-verification-internal AND sqm-email-verification AND sqm-code-verification
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                EMAIL STEP PROPS
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Verify email widget header text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_verifyEmailHeaderText: string =
    "Start by verifying your email. We’ll send you a code through our referral provider, impact.com.";
  /**
   * @uiName Send code to email alert header
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeErrorHeader: string =
    "There was an error sending your code.";
  /**
   * @uiName Send code to email alert description
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeErrorDescription: string =
    "Please try again. If this problem continues, contact our program support team.";
  /**
   * @uiName Email input label
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_emailLabel: string = "Email";
  /**
   * @uiName Send code button text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_sendCodeText: string = "Send code";
  /**
   * @uiName Send code button text
   * @uiGroup Email Verification Step
   */
  @Prop()
  emailStep_emailValidationErrorText: string = "Please enter a valid email";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                EMAIL STEP PROPS
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Verify code widget header text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_verifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * @uiName Reverify code widget header text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_reverifyCodeHeaderText: string =
    "Enter the code sent to {email} from our referral provider, impact.com.";
  /**
   * Text displayed under verify button
   * @uiName Resend code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_resendCodeText: string =
    "Didn't receive your code? {resendCodeLink}";
  /**
   * The link that appears in the resend code link
   * @uiName Resend code label
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_resendCodeLabel: string = "Resend code";
  /**
   * Link text displayed under verify button
   * @uiName Resend code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_codeResentSuccessfullyText: string =
    "Another code has been sent to {email}";
  /**
   * Error text displayed under verification input
   * @uiName Invalid code text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_invalidCodeText: string =
    "Please check your code and try again. If you’re still having trouble, try resending your code.";
  /**
   * @uiName Verify code button text
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_verifyText: string = "Verify";
  /**
   * Displayed when the email verification fails due to a network error. The participant can try refreshing the page.
   * @uiName Network error message
   * @uiGroup Code Verification Step
   */
  @Prop() codeStep_networkErrorMessage: string =
    "An error occurred while verifying your email. Please refresh the page and try again.";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                CODE STEP PROPS
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const [context, setContext] = useParentState<{ token: string } | undefined>(
      {
        namespace: VERIFICATION_PARENT_NAMESPACE,
        initialValue: undefined,
      }
    );

    const authToken = context?.token;

    const [container, setContainer] = useState<HTMLDivElement>(undefined);
    const [slot, setSlot] = useState<HTMLDivElement>(undefined);

    if (!authToken) debug("No user identity available");

    const updateTemplates = useCallback(() => {
      const isAuth = !!authToken;
      const templates = slot.querySelectorAll<HTMLTemplateElement>(`template`);
      const template = Array.from(templates).find(
        (t) => t.slot === (isAuth ? "verified" : "not-verified")
      );

      if (template) {
        // use outerHTML if template's innerHTML is unset (only happens in Stencilbook)
        const newContent =
          template.innerHTML || template.firstElementChild.outerHTML;

        // if template contents are an exact match
        if (newContent === container.innerHTML) {
          debug("don't rerender");
        } else if (template) {
          container.innerHTML = newContent;
        }
      }

      const plopTargets = Array.from(slot.children).filter(
        (el) => el.tagName === "RAISINS-PLOP-TARGET"
      );

      // if editing in raisins
      if (plopTargets.length) {
        const loggedInPlopTargets = plopTargets.filter(
          (el) => el.slot === "verified"
        );

        const loggedOutPlopTargets = plopTargets.filter(
          (el) => el.slot === "not-verified"
        );

        loggedOutPlopTargets.forEach((target: HTMLElement, i) => {
          if (isAuth) {
            target.style.display = "none";
            return;
          }
          // Place last plop target at the bottom of the parent
          if (i === loggedOutPlopTargets.length - 1) {
            target.style.bottom = "0px";
            target.style.left = "0px";
            target.style.right = "0px";
            target.style.position = "absolute";
          }

          target.style.height = "25px";
        });

        loggedInPlopTargets.forEach((target: HTMLElement, i) => {
          if (!isAuth) {
            target.style.display = "none";
            return;
          }
          // Place last plop target at the bottom of the parent
          if (i === loggedInPlopTargets.length - 1) {
            target.style.bottom = "0px";
            target.style.left = "0px";
            target.style.right = "0px";
            target.style.position = "absolute";
          }

          target.style.height = "25px";
        });
      }
    }, [container, slot, authToken]);

    useEffect(() => {
      if (!container || !slot) {
        debug("DOM not ready:");
        return;
      }

      // Run on first render
      updateTemplates();

      return useTemplateChildren({ parent: slot, callback: updateTemplates });
    }, [slot, container, authToken]);

    useEffect(() => {
      const host = useHost();
      const callback = (e: CustomEvent) => {
        e.stopPropagation();
        setContext({ token: e.detail.token });
      };
      host.addEventListener(VERIFICATION_EVENT_KEY, callback);

      return () => {
        host.removeEventListener(VERIFICATION_EVENT_KEY, callback);
      };
    }, []);

    return (
      <Host>
        <div ref={setSlot} style={{ display: "contents" }}>
          <template slot="not-verified">
            <sqm-widget-verification-internal
              {...getProps(this)}
            ></sqm-widget-verification-internal>
          </template>
          <slot name="not-verified"></slot>
          <slot name="verified" />
        </div>
        <div ref={setContainer}>
          <slot name="shown"></slot>
        </div>
      </Host>
    );
  }
}
