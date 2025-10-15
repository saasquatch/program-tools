import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Prop } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { parseStates } from "../../../utils/parseStates";
import { getProps } from "../../../utils/utils";
import { TaxAndCashDashboardView } from "./sqm-tax-and-cash-dashboard-view";
import {
  useTaxAndCashDashboard,
  UseTaxAndCashDashboardResult,
} from "./useTaxAndCashDashboard";

/**
 * @uiName Tax and Cash Status Dashboard
 */
@Component({ tag: "sqm-tax-and-cash-dashboard", shadow: true })
export class TaxAndCashDashboard {
  /**
   * @uiName Active tax form badge label
   */
  @Prop() statusTextActive?: string = "Active";

  /**
   * @uiName Invalid tax form badge label
   */
  @Prop() statusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Displayed when the participant submitted their form but it is awaiting review.
   *
   * @uiName Not verified tax form badge label
   */
  @Prop() statusTextNotVerified?: string = "Not Verified";

  /**
   * Displayed when the participant has not submitted their required tax form.
   *
   * @uiName Required tax form badge label
   */
  @Prop() statusTextRequired?: string = "Required";

  /**
   * Additional text displayed next to the tax form's status badge
   *
   * @uiName Required tax form description
   */
  @Prop() requiredTaxForm?: string =
    "Your payouts are on hold until you submit a {taxFormType} tax form.";

  /**
   * Additional text displayed next to the tax form's status badge
   *
   * @uiName Active W-9 description
   */
  @Prop() badgeTextSubmittedOn?: string = "Submitted on {dateSubmitted}.";
  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Active W-8 description
   */
  @Prop() badgeTextSubmittedOnW8?: string =
    "Submitted on {dateSubmitted}. Valid for three years after submission.";
  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Tax form in review description
   */
  @Prop() badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-9 error message title
   * @uiWidget textArea
   */
  @Prop() taxAlertHeaderNotActiveW9?: string =
    "Your W-9 tax form has personal information that doesn’t match your profile";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-8 error message title
   * @uiWidget textArea
   */
  @Prop() taxAlertHeaderNotActiveW8?: string =
    "{documentType} tax form is invalid";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-9 error message description
   * @uiWidget textArea
   */
  @Prop() taxAlertNotActiveMessageW9?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-8 error message description
   */
  @Prop() taxAlertNotActiveMessageW8?: string =
    "Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new {documentType} form.";
  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Invalid tax form description
   * @uiWidget textArea
   */
  @Prop() invalidForm?: string =
    "Make sure your information is correct and submit new form.";
  /**
   * @uiName Payout information section header
   */
  @Prop() bankingInformationSectionHeader: string = "Payout information";
  /**
   * @uiName Tax document section header
   */
  @Prop() taxDocumentSectionHeader: string = "Tax documents";
  /**
   * Displayed under the tax document section header.
   *
   * @uiName Tax documents section description
   */
  @Prop() taxDocumentSectionSubHeader: string = "{documentType} tax form";

  /**
   *
   * @uiName Indirect tax section header
   */
  @Prop() indirectTaxInfoSectionHeader: string = "Indirect tax";
  /**
   * If the participant is registered for indirect tax in Canada, display the province they’re registered in.
   *
   * @uiName Canadian province of indirect tax
   */
  @Prop() indirectTaxInfoCanada: string = "Registered in {province}, {country}";
  /**
   * If the participant is registered for indirect tax, display the country they’re registered in.
   *
   * @uiName Indirect tax country
   */
  @Prop() indirectTaxInfoOtherCountry: string = "Registered in {country}";
  /**
   * If the participant is registered for indirect tax in Spain, display the region they’re registered in.
   *
   * @uiName Spanish region of indirect tax
   */
  @Prop() indirectTaxInfoSpain: string = "Registered in {country}, {subRegion}";
  /**
   * @uiName Indirect tax tooltip
   * @uiWidget textArea
   */
  @Prop() indirectTaxTooltipSupport: string =
    "To make changes to your indirect tax information, please contact our Support team.";
  /**
   * Displayed to participants who have submitted their indirect tax information.
   *
   * @uiName Indirect tax details
   */
  @Prop() indirectTaxDetails: string =
    "{indirectTaxType} number: {indirectTaxNumber}";
  /**
   * @uiName Submit new tax form button label
   */
  @Prop() newFormButton: string = "Submit new form";
  /**
   *
   * @uiName Edit payment info button label
   */
  @Prop() editPaymentInformationButton: string = "Edit Payout Information";
  /**
   * @uiName Not registered for indirect tax text
   * @uiWidget textArea
   */
  @Prop() notRegisteredForTax: string =
    "Not registered for indirect tax. If you’ve previously registered with your tax authority, contact our {supportLink} to add your information to stay tax compliant.";
  /**
   * Displayed to participants registered in Quebec, Canada.
   * @uiName QST indirect tax details
   */
  @Prop() qstNumber: string = "QST number: {qstNumber}";
  /**
   * @uiName Spain sub-region indirect tax number
   */
  @Prop() subRegionTaxNumber: string =
    "Income tax number: {subRegionTaxNumber}";

  /**
   * @uiName Payout status badge
   */
  @Prop()
  statusBadgeText: string =
    "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  /**
   * Display participants' payout preference on the payout information card, indicating the balance at which they want to get paid.
   * @uiName Payout schedule by threshold text
   */
  @Prop() thresholdPayoutText: string =
    "Next payout occurs when balance is {thresholdBalance}";

  /**
   * Shown before the participant’s bank account information.
   * @uiName Bank account field label
   */
  @Prop() accountText: string = "Account";
  /**
   * Part of the alert displayed at the top of the page when there’s been an issue preventing payouts.
   * @uiName Payout error message title
   * @uiWidget textArea
   */
  @Prop() payoutHoldAlertHeader: string = "Your payout is on hold";
  /**
   * Part of the alert displayed at the top of the page when there’s been an issue preventing payouts.
   * @uiName Payout error message description
   * @uiWidget textArea
   */
  @Prop() payoutHoldAlertDescription: string =
    "Please contact our {supportLink} or check your inbox for an email from our referral program provider, impact.com.";
  /**
   * Text displayed for existing publishers that do not have saved banking information.
   * @uiName Payout missing information subtext
   */
  @Prop() payoutMissingInformationText: string =
    "Missing banking information, go to Impact.com to resolve.";
  /**
   * Part of the alert displayed at the top of the page when the user needs to verify their identity.
   * @uiName Verification required alert message title
   * @uiWidget textArea
   */
  @Prop() verificationRequiredHeader: string = "Verify your identity";
  /**
   * Part of the alert displayed at the top of the page when the user needs to verify their identity
   * @uiName Verification required alert message description
   * @uiWidget textArea
   */
  @Prop() verificationRequiredDescription: string =
    "Complete your verification to start receiving your cash rewards. It should only take a few minutes verify. If you run in to an issue verifying your identity contact our {supportLink}.";
  /**
   * @uiName Verification required internal alert header
   */
  @Prop() verificationRequiredInternalHeader: string =
    "Identity Verification in Progress";
  /**
   * @uiName Verification required internal alert description
   */
  @Prop() verificationRequiredInternalDescription: string =
    "Identity verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortly. If you don't hear from us contact our {supportLink}.";
  /**
   * @uiName Verification review internal alert header
   */
  @Prop() verificationReviewInternalHeader: string =
    "Identity Verification Under Review";
  /**
   * @uiName Verification review internal alert description
   */
  @Prop() verificationReviewInternalDescription: string =
    "Identity verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly. If you don't hear from us contact our {supportLink}.";
  /**
   * @uiName Verification failed internal alert header
   */
  @Prop() verificationFailedInternalHeader: string =
    "Identity Verification Unsuccessful";
  /**
   * @uiName Verification failed internal alert description
   */
  @Prop() verificationFailedInternalDescription: string =
    "Identity verification has failed. Our team is reviewing the report and will contact you with further information. If you don't hear from us contact our {supportLink}.";
  /**
   * Part of the alert displayed at the top of the page when the user needs to verify their identity.
   * @uiName Verification required alert button text
   */
  @Prop() verificationRequiredButtonText: string = "Start Verification";
  /**
   * @uiName W-9 payment threshold alert header
   */
  @Prop() w9RequiredHeader: string = "Your next payout is on hold";
  /**
   * @uiName W-9 payment threshold alert description
   */
  @Prop() w9RequiredDescription: string =
    "You have surpassed the $600 threshold requiring a W-9 form or have multiple accounts with impact.com. To remove the hold, please submit your W-9 form.";
  /**
   * @uiName Account review alert header
   */
  @Prop() accountReviewHeader: string = "Your account is under review";
  /**
   * @uiName Account review alert description
   */
  @Prop() accountReviewDescription: string =
    "This process takes 48 hours, payouts are on hold until it's completed. You will receive an email from our referral provider, Impact.com, if any issues arise.  It contains details on how to resolve this issue. If you need further assistance, please reach out to our {supportLink}.";
  /**
   * @uiName Terms and Conditions text
   */
  @Prop() termsAndConditions: string = "Terms and Conditions";
  /**
   * @uiName W-9 payment threshold alert button text
   */
  @Prop() w9RequiredButtonText: string = "Submit W-9";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message title
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message description
   * @uiWidget textArea
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact our {supportLink}.";
  /**
   * Displayed under the payout details card.
   * @uiName Payout from impact text
   * @uiWidget textArea
   */
  @Prop() payoutFromImpact: string =
    "Your balance may take up to 24 hours to update. Payouts will be sent from our referral program provider, impact.com.";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message title
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message description
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact our {supportLink}.";

  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Invoice number column title
   */
  @Prop() invoiceColumnTitle: string = "Invoice";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Date column title
   */
  @Prop() dateColumnTitle: string = "Date";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Earnings column title
   */
  @Prop() earningsColumnTitle: string = "Earnings";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Indirect tax column title
   */
  @Prop() indirectTaxColumnTitle: string = "Indirect tax";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Earnings after tax column title
   */
  @Prop() earningsAfterTaxColumnTitle: string = "Earnings after tax";

  /** @uiName Invoice table description  */
  @Prop() invoiceDescription: string =
    "View and download your invoices to report your earnings and stay tax compliant.";

  /** @uiName Invoice table previous page button label  */
  @Prop() invoicePrevLabel: string = "Prev";

  /** @uiName Invoice table next page button label  */
  @Prop() invoiceMoreLabel: string = "Next";

  /** @uiName Invoice table title */
  @Prop() invoiceHeader: string = "Invoices";

  /** @uiName Empty invoice table header  */
  @Prop() invoiceEmptyStateHeader: string = "View your invoice details";

  /** @uiName Empty invoice table description  */
  @Prop() invoiceEmptyStateText: string =
    "Refer a friend to view the status of your invoices and rewards earned";
  /**
   * @uiName Replace tax form modal header
   */
  @Prop() replaceTaxFormModalHeader: string = "Replace existing tax form";
  /**
   * @uiName Replace tax form modal body text
   */
  @Prop() replaceTaxFormModalBodyText: string =
    "Submitting a new tax form will remove your existing form. Make sure to sign and complete your new tax form to prevent any issues with your next payout.";
  /**
   * @uiName Support link text
   */
  @Prop() supportLink: string = "support team";
  /**
   * @uiName Cancel button label
   */
  @Prop() cancelButton: string = "Cancel";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseTaxAndCashDashboardResult>;

  /**
   * @undocumented
   * @componentState { "title": "Payouts on hold", "props": { "states": { "payoutStatus": "HOLD" } }, "uiGroup": "Dashboard Properties" }
   */
  @Prop() stateController?: string = "{}";

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
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoTaxAndCashDashboard(this)
      : useTaxAndCashDashboard(this);

    return (
      <Host>
        <TaxAndCashDashboardView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
          slots={{
            payoutDetailsCardSlot: (
              <sqm-payout-details-card
                {...this.getTextProps()}
              ></sqm-payout-details-card>
            ),
          }}
        />
      </Host>
    );
  }
}
function useDemoTaxAndCashDashboard(
  props: TaxAndCashDashboard
): UseTaxAndCashDashboardResult {
  const stateController = parseStates(props.stateController);

  // @ts-ignore
  return deepmerge(
    {
      states: {
        dateSubmitted: "today",
        documentType: "W9",
        documentTypeString: "W-9",
        status: "ACTIVE",
        country: "United States",
        indirectTaxNumber: "55555555",
        indirectTaxType: "Indirect Tax",
        noFormNeeded: false,
        disabled: false,
        loading: false,
        showNewFormDialog: false,
        hasHold: false,

        subRegion: "CA",
        subRegionTaxNumber: undefined,
        qstNumber: undefined,
        isBusinessEntity: false,
        province: undefined,
        notRegistered: true,
        loadingError: false,

        payoutStatus: "DONE",
        veriffLoading: false,
        canEditPayoutInfo: true,
      },
      callbacks: {
        onClick: () => console.debug("check step"),
        onEditPayoutInfo: () => console.debug("payout info"),
        onNewFormCancel: () => console.log("hide"),
        onNewFormClick: () => console.log("show"),
        onVerifyClick: () => console.log("verify"),
      },
      text: props.getTextProps(),
      slots: {
        payoutDetailsCardSlot: (
          <sqm-payout-details-card
            demoData={{
              states: {
                badgeStatus: "nextPayout",
              },
            }}
          ></sqm-payout-details-card>
        ),
      },
    },
    stateController || props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
