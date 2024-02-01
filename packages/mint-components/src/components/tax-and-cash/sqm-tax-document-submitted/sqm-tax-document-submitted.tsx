import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import { taxFormDocumentSubmittedText as defaults } from "../sqm-user-info-form/defaultTextCopy";
import { TaxDocumentSubmittedView } from "./sqm-tax-document-submitted-view";
import { useTaxDocumentSubmitted } from "./useTaxDocumentSubmitted";

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

  @Prop() taxAlertHeaderNotActive?: string = defaults.taxAlertHeaderNotActive;
  @Prop() taxAlertHeaderExpiredOn?: string = defaults.taxAlertHeaderExpiredOn;
  @Prop() taxAlertHeaderExpiringSoon?: string =
    defaults.taxAlertHeaderExpiringSoon;
  @Prop() taxAlertMessage?: string = defaults.taxAlertMessage;
  @Prop() taxAlertMessageExpiringSoon: string =
    defaults.taxAlertMessageExpiringSoon;
  @Prop() invalidForm?: string = defaults.invalidForm;
  @Prop() bankingInformationSectionHeader: string =
    defaults.bankingInformationSectionHeader;

  @Prop() taxDocumentSectionHeader: string = defaults.taxDocumentSectionHeader;
  @Prop() taxDocumentSectionSubHeader: string =
    defaults.taxDocumentSectionSubHeader;
  @Prop() newFormButton: string = defaults.newFormButton;
  @Prop() generalErrorTitle: string = defaults.error.generalTitle;
  @Prop() generalErrorDescription: string = defaults.error.generalDescription;
  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = useTaxDocumentSubmitted(getProps(this));

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
