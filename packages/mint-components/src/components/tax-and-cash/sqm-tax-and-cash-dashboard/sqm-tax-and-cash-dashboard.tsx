import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { TaxAndCashDashboardView } from "./sqm-tax-and-cash-dashboard-view";
import {
  UseTaxAndCashDashboardResult,
  useTaxAndCashDashboard,
} from "./useTaxAndCashDashboard";
import { Upcoming } from "../sqm-payout-details-card/PayoutDetailsCard.stories";

/**
 * @uiName Tax and Cash Status Dashboard
 */
@Component({ tag: "sqm-tax-and-cash-dashboard", shadow: true })
export class TaxAndCashDashboard {
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
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextSubmittedOn?: string = "Submitted on {dateSubmitted}.";
  /**
   * Description text for W8 which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextSubmittedOnW8?: string =
    "Submitted on {dateSubmitted}. Valid for three years after submission.";
  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   */
  @Prop() badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Header displayed in not active W9 alert header at the top of the page.
   *
   * @uiName Not active W9 alert header
   */
  @Prop() taxAlertHeaderNotActiveW9?: string =
    "Your W9 tax form has personal information that doesn’t match your profile";
  /**
   * Header displayed in not active W9 alert header at the top of the page.
   *
   * @uiName Not active W8 alert header
   */
  @Prop() taxAlertHeaderNotActiveW8?: string =
    "{documentType} tax form is invalid";
  /**
   * Description text displayed in W9 alert body at the top of the page.
   *
   * @uiName Tax W9 alert message
   */
  @Prop() taxAlertNotActiveMessageW9?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Description text displayed in W8 alert body at the top of the page.
   *
   * @uiName Tax W8 alert message
   */
  @Prop() taxAlertNotActiveMessageW8?: string =
    "Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W8-BEN form.";
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
  @Prop() bankingInformationSectionHeader: string = "Payout information";
  /**
   * Header text displayed above the indirect tax preview section
   *
   * @uiName Indirect Tax Information Header
   */
  @Prop() indirectTaxInfoSectionHeader: string = "Indirect Tax";
  /**
   * Country/Province description text of indirect tax
   *
   * @uiName Indirect tax Canada description
   */
  @Prop() indirectTaxInfoCanada: string = "Registered in {province}, {country}";
  /**
   * Other country description text of indirect tax
   *
   * @uiName Indirect tax other country description
   */
  @Prop() indirectTaxInfoOtherCountry: string = "Registered in {country}";
  /**
   * Spain/Region description text of indirect tax
   *
   * @uiName Indirect tax Spain description
   */
  @Prop() indirectTaxInfoSpain: string = "Registered in {country}, {subRegion}";
  /**
   * Indirect tax tooltip text for support
   *
   * @uiName Indirect tax tooltip description
   */
  @Prop() indirectTaxTooltipSupport: string =
    "To make changes to your indirect tax information, please contact Support.";
  /**
   * Indirect tax number/type details
   *
   * @uiName Indirect tax details
   */
  @Prop() indirectTaxDetails: string =
    "{indirectTaxType} number: {indirectTaxNumber}";
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
    "Tax documents are only required if you are based in the US or joining the referral program of a US based brand.";
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName No form needed subtext
   */
  @Prop() newFormButton: string = "Submit New Form";
  /**
   * Text displayed in the edit Indirect Tax button
   *
   * @uiName Edit Indirect Tax button
   */
  @Prop() editIndirectTaxButton: string = "Edit Indirect Tax";
  /**
   * Text displayed in the edit Payment Information button
   *
   * @uiName Edit Payment Information button
   */
  @Prop() editPaymentInformationButton: string = "Edit Payout Information";
  /**
   * Text displayed when partner is not registered for Indirect Tax
   *
   * @uiName Not registered for Indirect Tax
   */
  @Prop() notRegisteredForTax: string =
    "Not registered. Participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information.";
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
   * Label text for the QST number
   * @uiName QST number input
   */
  @Prop() qstNumber: string = "QST Number: {qstNumber}";
  /**
   * Label text for the sub-region tax number
   * @uiName Sub-region tax number
   */
  @Prop() subRegionTaxNumber: string =
    "Income Tax Number: {subRegionTaxNumber}";
  /**
   * Sub text describing how payouts are provided from impact.com
   * @uiName Payout from impact text
   */
  @Prop() payoutFromImpact: string =
    "Payouts will be sent from our referral program provider, impact.com";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseTaxAndCashDashboardResult>;

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
      ? useDemoTaxAndCashDashboard(this)
      : useTaxAndCashDashboard(this);

    return (
      <Host>
        <TaxAndCashDashboardView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
          slots={{ payoutDetailsCardSlot: <Upcoming /> }}
        />
      </Host>
    );
  }
}
function useDemoTaxAndCashDashboard(
  props: TaxAndCashDashboard
): UseTaxAndCashDashboardResult {
  return deepmerge(
    {
      states: {
        dateSubmitted: undefined,
        documentType: undefined,
        documentTypeString: "",
        status: undefined,
        noFormNeeded: true,
        expiresSoon: false,
        disabled: false,
        loading: false,
      },
      callbacks: {
        onClick: () => console.debug("check step"),
        onEditPayoutInfo: () => console.debug("payout info"),
      },
      slots: {
        paymentDetailsCardSlot: <Upcoming />,
      },
      text: props.getTextProps(),
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
