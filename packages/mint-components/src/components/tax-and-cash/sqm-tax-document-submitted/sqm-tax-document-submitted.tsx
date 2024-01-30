import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import { taxFormDocumentSubmittedText as defaults } from "../sqm-user-info-form/defaultTextCopy";
import { TaxDocumentSubmittedView } from "./sqm-tax-document-submitted-view";
import { useTaxDocumentSubmitted } from "./useTaxDocumentSubmitted";

@Component({ tag: "sqm-tax-document-submitted", shadow: true })
export class TaxDocumentSubmitted {
  @Prop() statusTextActive?: string = defaults.statusTextActive;
  @Prop() statusTextNotActive?: string = defaults.statusTextNotActive;
  @Prop() statusTextNotVerified?: string = defaults.statusTextNotVerified;
  @Prop() statusTextExpired?: string = defaults.statusTextExpired;
  @Prop() badgeTextSubmittedOn?: string = defaults.badgeTextSubmittedOn;
  @Prop() badgeTextAwaitingReview?: string = defaults.badgeTextAwaitingReview;
  @Prop() badgeTextExpiredOn?: string = defaults.badgeTextExpiredOn;
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
