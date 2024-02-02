import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import { taxFormDocumentSubmittedText as defaults } from "../sqm-user-info-form/defaultTextCopy";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentSubmittedView,
} from "./sqm-tax-document-submitted-view";
import { useTaxDocumentSubmitted } from "./useTaxDocumentSubmitted";
import { isDemo } from "@saasquatch/component-boilerplate";

@Component({ tag: "sqm-tax-document-submitted", shadow: true })
export class TaxDocumentSubmitted {
  /**
   * Status text displayed in badge when tax document is Active
   *
   * @uiName Status text
   */
  @Prop() statusTextActive?: string = defaults.statusTextActive;

  /**
   * Status text displayed in badge when tax document is Not Active
   *
   * @uiName Status text
   */
  @Prop() statusTextNotActive?: string = defaults.statusTextNotActive;

  /**
   * Status text displayed in badge when tax document is Not Verified
   *
   * @uiName Status text
   */
  @Prop() statusTextNotVerified?: string = defaults.statusTextNotVerified;

  /**
   * Status text displayed in badge when tax document is Expired
   *
   * @uiName Status text
   */
  @Prop() statusTextExpired?: string = defaults.statusTextExpired;

  /**
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextSubmittedOn?: string = defaults.badgeTextSubmittedOn;

  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextAwaitingReview?: string = defaults.badgeTextAwaitingReview;

  /**
   * Description text which appears beside badge showing the form has expired
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextExpiredOn?: string = defaults.badgeTextExpiredOn;

  /**
   * Description text which appears beside badge showing the form expiring soon
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextExpiringSoon?: string = defaults.badgeTextExpiringSoon;

  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Not active alert header
   */
  @Prop() taxAlertHeaderNotActive?: string = defaults.taxAlertHeaderNotActive;
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expired alert header
   */
  @Prop() taxAlertHeaderExpiredOn?: string = defaults.taxAlertHeaderExpiredOn;
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expiring soon alert header
   */
  @Prop() taxAlertHeaderExpiringSoon?: string =
    defaults.taxAlertHeaderExpiringSoon;
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Tax alert message
   */
  @Prop() taxAlertMessage?: string = defaults.taxAlertMessage;
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Expiring soon tax alert message
   */
  @Prop() taxAlertMessageExpiringSoon: string =
    defaults.taxAlertMessageExpiringSoon;
  /**
   * Description text displayed next to the badge in the tax documents status
   *
   * @uiName Invalid form description text
   */
  @Prop() invalidForm?: string = defaults.invalidForm;
  /**
   * Header text displayed above the banking information card
   *
   * @uiName Banking information header
   */
  @Prop() bankingInformationSectionHeader: string =
    defaults.bankingInformationSectionHeader;
  /**
   * Header text displayed above the tax documents status
   *
   * @uiName Tax document section header
   */
  @Prop() taxDocumentSectionHeader: string = defaults.taxDocumentSectionHeader;
  /**
   * Sub header text displayed above the tax documents status
   *
   * @uiName Tax documents sub header
   */
  @Prop() taxDocumentSectionSubHeader: string =
    defaults.taxDocumentSectionSubHeader;
  /**
   * Subtext displayed at the bottom of the page if there are no tax documents to show
   *
   * @uiName No form needed subtext
   */
  @Prop() noFormNeededSubtext: string = defaults.noFormNeededSubtext;
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName No form needed subtext
   */
  @Prop() newFormButton: string = defaults.newFormButton;
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string = defaults.error.generalTitle;
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string = defaults.error.generalDescription;
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDemoTaxDocumentSubmitted(getProps(this))
      : useTaxDocumentSubmitted(getProps(this));

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
): TaxDocumentSubmittedProps {
  return {
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
    text: {
      ...props,
      error: {
        generalDescription: props.generalErrorDescription,
        generalTitle: props.generalErrorTitle,
      },
    },
  };
}
