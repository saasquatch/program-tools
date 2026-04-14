import {
  isDemo,
  useParentState,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { parseStates } from "../../utils/parseStates";
import { getProps } from "../../utils/utils";
import { extractProps } from "../tax-and-cash/sqm-tax-and-cash/extractProps";
import {
  SHOW_CODE_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_PARENT_NAMESPACE,
} from "./keys";
import { useWidgetVerification } from "./useWidgetVerification";
import { createStyleSheet } from "../../styling/JSS";

/**
 * @uiName Widget Verification Flow
 * @exampleGroup Widget Verification
 * @example Widget Verification - <sqm-widget-verification></sqm-widget-verification>
 */
@Component({
  tag: "sqm-widget-verification",
  shadow: true,
})
export class WidgetVerification {
  // ! Any updated must be reflected in sqm-widget-verification-internal AND sqm-email-verification AND sqm-code-verification AND sqm-partner-info-modal
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                  GENERAL PROPS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName General widget header text with partner creation
   * @uiGroup General Text
   */
  @Prop()
  general_widgetHeaderWithPartnerCreation = "Let's get you ready for rewards";
  /**
   * @uiName General verify widget header text
   * @uiGroup General Text
   */
  @Prop()
  general_verifyEmailHeader = "Verify your email";
  /**
   * @uiName General verify widget description text
   * @uiGroup General Text
   */
  @Prop()
  general_verifyEmailDescription =
    "To get your cash paid out directly to your bank account, please complete your account setup";
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
                  CODE STEP PROPS
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
                  PARTNER CREATION STEP PROPS
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName New partner header
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_modalHeader: string = "Let's get you ready for rewards";
  /**
   * @uiName Existing partner header
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_modalHeaderExistingPartner: string =
    "We found an existing account";
  /**
   * @uiName New partner description
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_descriptionNewPartner: string =
    "Confirm your country and currency now to get your future rewards faster.";
  /**
   * @uiName Existing partner description
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_descriptionExistingPartner: string =
    "We found an account with this email on our referral program provider, impact.com. Please confirm your country and currency now to get your future rewards faster.";
  /**
   * @uiName Existing partner support description
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_supportDescriptionExistingPartner: string =
    "If this is a mistake, please contact Support or sign up for this referral program with a different email.";
  /**
   * @uiName Country label
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_countryLabel: string = "Country";
  /**
   * @uiName Currency label
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_currencyLabel: string = "Currency";
  /**
   * @uiName Submit button label
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_submitButtonLabel: string = "Submit";
  /**
   * @uiName Confirm button label
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_confirmButtonLabel: string = "Confirm";
  /**
   * @uiName Search country placeholder
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_searchCountryPlaceholder: string = "Search for a country";
  /**
   * @uiName Search currency placeholder
   * @uiGroup Partner Creation Step
   */
  @Prop()
  createPartnerStep_searchCurrencyPlaceholder: string = "Search for a currency";
  /**
   * @uiName Network error text
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_networkErrorText: string =
    "An error occurred. Please try again.";
  /**
   * @uiName Missing fields error text
   * @uiGroup Partner Creation Step
   * @uiWidget textArea
   */
  @Prop()
  createPartnerStep_missingFieldsErrorText: string =
    "Please select both a country and currency.";

  /**
   * @undocumented
   * @componentState { "title": "Step 1: Enter email", "props": { "showCode": false }, "dependencies": ["sqm-email-verification"], "uiGroup": "Email Verification Step" }
   * @componentState { "title": "Step 2: Enter code", "props": { "showCode": true }, "dependencies": ["sqm-code-verification"], "uiGroup": "Code Verification Step" }
   * @componentState { "title": "Step 3: Create Partner", "props": { "showPartnerModal": true }, "dependencies": ["sqm-partner-info-modal"], "uiGroup": "Partner Creation Step" }
   */
  @Prop() stateController: string = "{}";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getStepTextProps<T extends string>(prefix: T) {
    const props = getProps(this);
    return extractProps(props, prefix);
  }

  render() {
    const props = isDemo()
      ? useDemoWidgetVerificationInternal(this)
      : useWidgetVerification();

    if (props.loading) return <sl-spinner></sl-spinner>;

    // for handling state previews in content editor
    const partnerState =
      typeof props["sqm-partner-info-modal_stateController"] === "string"
        ? parseStates(props["sqm-partner-info-modal_stateController"])
        : props["sqm-partner-info-modal_stateController"];
    if (props.showPartnerModal && partnerState?.states?.open === false) {
      return <div></div>;
    }

    const style = {
      Dialog: {
        "&::part(panel)": {
          maxWidth: "480px",
        },
        "&::part(body)": {
          padding: "0 var(--sl-spacing-x-large)",
          fontSize: "var(--sl-font-size-small)",
          overflow: "visible",
        },
        "&::part(footer)": {
          display: "flex",
          flexDirection: "column",
          gap: "var(--sl-spacing-small)",
        },
        "&::part(overlay)": {
          background: "rgba(0, 0, 0, 0.5)",
        },
      },
      DialogTitle: {
        fontSize: "var(--sl-font-size-x-large)",
        fontWeight: "600",
        padding: "var(--sl-spacing-x-large) 0 0 0",
        margin: "0",
      },
    };

    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    // const generalText = this.getStepTextProps("general_");
    const partnerText = this.getStepTextProps("createPartnerStep_");

    const dialogLabel = this.general_widgetHeaderWithPartnerCreation;

    const renderStepContent = () => {
      if (props.showPartnerModal) {
        return (
          <sqm-partner-info-modal
            inModal
            {...partnerText}
            stateController={
              props["sqm-partner-info-modal_stateController"] || "{}"
            }
          ></sqm-partner-info-modal>
        );
      }
      if (props.showCode) {
        return (
          <sqm-code-verification
            onVerification={props.onVerification}
            {...this.getStepTextProps("codeStep_")}
            {...extractProps(props, "sqm-code-verification_")}
          ></sqm-code-verification>
        );
      }
      return (
        <sqm-email-verification
          {...this.getStepTextProps("emailStep_")}
          {...extractProps(props, "sqm-email-verification_")}
        ></sqm-email-verification>
      );
    };

    return (
      <div>
        <style type="text/css">{styleString}</style>
        <sl-dialog
          class={sheet.classes.Dialog}
          noHeader
          open={true}
          label={dialogLabel}
          onSl-request-close={(e: any) => {
            e.preventDefault();
          }}
          onSl-hide={(e: any) => {
            if (e.target?.tagName === "SL-DIALOG") {
              e.preventDefault();
            }
          }}
        >
          <h2 class={sheet.classes.DialogTitle}>{dialogLabel}</h2>
          {renderStepContent()}
        </sl-dialog>
      </div>
    );
  }
}

function useDemoWidgetVerificationInternal(props: WidgetVerification) {
  const [showCode, setShowCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });
  const [email, setEmail] = useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: undefined,
  });
  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);

  const states = parseStates(props.stateController);
  const formatted = Object.keys(states).reduce(
    (prev, key) =>
      key === "sqm-widget-verification"
        ? { ...prev, ...states[key] }
        : { ...prev, [`${key}_stateController`]: states[key] },
    {},
  );

  const onVerification = () => {
    setContext(true);
  };

  return deepmerge(
    {
      showCode,
      showPartnerModal: false,
      onVerification,
      onPartnerModalComplete: () => {},
      loading: false,
    },
    formatted || {},
    { arrayMerge: (_, a) => a },
  );
}
