import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentSubmittedView,
} from "./sqm-tax-document-submitted-view";
import {
  UseTaxDocumentSubmittedResult,
  useTaxDocumentSubmitted,
} from "./useTaxDocumentSubmitted";
import { DemoData } from "../../../global/demo";
import deepmerge from "deepmerge";

/**
 * @uiName Tax and Cash Status Dashboard
 */
@Component({ tag: "sqm-tax-document-submitted", shadow: true })
export class TaxDocumentSubmitted {
  /**
   * Status text displayed in badge when tax document is Active
   *
   * @uiName Status text
   */
  @Prop() statusTextActive?: string = "Active";

  /**
   * Status text displayed in badge when tax document is Not Active
   *
   * @uiName Status text
   */
  @Prop() statusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Status text displayed in badge when tax document is Not Verified
   *
   * @uiName Status text
   */
  @Prop() statusTextNotVerified?: string = "Not Verified";

  /**
   * Status text displayed in badge when tax document is Expired
   *
   * @uiName Status text
   */
  @Prop() statusTextExpired?: string = "Expired";

  /**
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextSubmittedOn?: string = "Submitted on {dateSubmitted}";

  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Description text which appears beside badge showing the form has expired
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextExpiredOn?: string = "Expired on {dateExpired}.";

  /**
   * Description text which appears beside badge showing the form expiring soon
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextExpiringSoon?: string = ", expiring on {dateExpired}.";

  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Not active alert header
   */
  @Prop() taxAlertHeaderNotActive?: string =
    "Your {documentType} tax form has personal information that doesn't match your profile.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expired alert header
   */
  @Prop() taxAlertHeaderExpiredOn?: string =
    "Your {documentType} tax form has expired.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expiring soon alert header
   */
  @Prop() taxAlertHeaderExpiringSoon?: string =
    "Your {documentType} tax form expires on {dateExpired}";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Tax alert message
   */
  @Prop() taxAlertMessage?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Expiring soon tax alert message
   */
  @Prop() taxAlertMessageExpiringSoon: string =
    "Please submit a new {documentType} form to continue receiving your rewards";
  /**
   * Description text displayed next to the badge in the tax documents status
   *
   * @uiName Invalid form description text
   */
  @Prop() invalidForm?: string =
    "Ensure your information matches your profile and resubmit a new document.";
  /**
   * Header text displayed above the banking information card
   *
   * @uiName Banking information header
   */
  @Prop() bankingInformationSectionHeader: string = "Banking Information";
  /**
   * Header text displayed above the tax documents status
   *
   * @uiName Tax document section header
   */
  @Prop() taxDocumentSectionHeader: string = "Tax documents";
  /**
   * Sub header text displayed above the tax documents status
   *
   * @uiName Tax documents sub header
   */
  @Prop() taxDocumentSectionSubHeader: string = "{documentType} Tax Form";
  /**
   * Subtext displayed at the bottom of the page if there are no tax documents to show
   *
   * @uiName No form needed subtext
   */
  @Prop() noFormNeededSubtext: string =
    "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support.";
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName No form needed subtext
   */
  @Prop() newFormButton: string = "Submit New document";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseTaxDocumentSubmittedResult>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);
    return {
      ...props,
      error: {
        generalDescription: props.generalErrorDescription,
        generalTitle: props.generalErrorTitle,
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoTaxDocumentSubmitted(this)
      : useTaxDocumentSubmitted(this);

    return (
      <Host>
        <TaxDocumentSubmittedView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
        />
      </Host>
    );
  }
}
function useDemoTaxDocumentSubmitted(
  props: TaxDocumentSubmitted
): UseTaxDocumentSubmittedResult {
  return deepmerge(
    {
      states: {
        dateSubmitted: undefined,
        documentType: undefined,
        status: undefined,
        noFormNeeded: true,
        dateExpired: undefined,
        expiresSoon: false,
        disabled: false,
        loading: false,
      },
      callbacks: {
        onClick: () => console.debug("check step"),
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
