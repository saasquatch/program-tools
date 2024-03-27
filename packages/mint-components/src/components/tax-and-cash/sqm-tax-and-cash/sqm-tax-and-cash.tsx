import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { useParentState } from "../../../utils/useParentState";
import { getProps } from "../../../utils/utils";
import LoadingView from "./LoadingView";
import { TAX_CONTEXT_NAMESPACE } from "./data";
import { extractProps } from "./extractProps";
import { UseTaxAndCashResultType, useTaxAndCash } from "./useTaxAndCash";
import { isDemo } from "@saasquatch/component-boilerplate";
import { ErrorView } from "./ErrorView";

/**
 * @uiName Tax and Cash
 * @exampleGroup Tax and Cash
 * @example Tax and Cash Multi Step Form - <sqm-tax-and-cash></sqm-tax-and-cash>
 */
@Component({
  tag: "sqm-tax-and-cash",
  shadow: true,
})
export class TaxAndCashMonolith {
  /*---------------------------------------------------------------------------------
    !IMPORTANT!: Make sure to also change the prop names in the respective component
  -----------------------------------------------------------------------------------*/

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    STEP 1 PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /**
   * @uiName First name field label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_firstName: string = "First name";
  /**
   * @uiName Last name field label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_lastName: string = "Last name";
  /**
   * @uiName Email field label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_email: string = "Email";
  /**
   * @uiName Country field label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_country: string = "Country";
  /**
   * @uiName Currency field label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_currency: string = "Currency";
  /**
   * @uiName Currency field help text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_currencyHelpText: string =
    "Choose your preferred payout currency";
  /**
   * @uiName Step 1 title
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_personalInformation: string = "Personal Information";
  /**
   Edit the property called terms and conditions text to change what's displayed for {termsAndConditionsLink}.
   * @uiName Terms and conditions checkbox
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_allowBankingCollection: string =
    "I have read the {termsAndConditionsLink} and allow impact.com to collect my tax and banking information";
  /**
   * The text link that appears in the terms and conditions checkbox
   * @uiName Terms and conditions text
   * @uiGroup Step 1 Properties
   * @uiWidget textArea
   */
  @Prop() step1_termsAndConditionsLabel: string = "terms and conditions";
  /**
   * Placeholder text displayed in the currency search dropdown
   * @uiName Currency field placeholder text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_searchForCurrencyText: string = "Search for currency..";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    STEP 2 PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /**
   * @uiName Step 2 title
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTax: string = "Indirect Tax";
  /**
   * Displayed under the title of this step.
   * @uiName Step 2 description
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   */
  @Prop() step2_indirectTaxDescription: string =
    "Indirect taxes (e.g. VAT, HST, GST) are transaction based taxes often applied to goods and services. Service providers are typically required to register with their tax authority and collect these taxes on behalf governments.";
  /**
   * Displayed with indirect tax registration options.
   * @uiName Indirect tax details section title
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxDetails: string = "Indirect tax details";
  /**
   * Displayed under the indirect tax details title.
   * @uiName Indirect tax details section description
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   */
  @Prop() step2_indirectTaxDetailsDescription: string =
    "Participants representing businesses based in countries that enforce indirect taxes (e.g. VAT, HST, GST) must add their indirect tax details to stay tax compliant.";
  /**
   * @uiName Registered for indirect tax option
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   *
   */
  @Prop() step2_otherRegion: string = "Registered for indirect tax";
  /**
   * Selecting this option will display fields to enter indirect tax details.
   * @uiName Registered for indirect tax option description
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_otherRegionSubtext: string =
    "If you’ve registered with your tax authority, add your information to stay tax compliant.";
  /**
   * @uiName Not registered for indirect tax option
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   */
  @Prop() step2_notRegistered: string = "Not registered for indirect tax";
  /**
   * Participants based in the US are  considered not registered.
   * @uiName Not registered for indirect tax option description
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_notRegisteredSubtext: string =
    "If you’ve never set up indirect tax with your tax authority, then you’re likely not considered registered.";
  /**
   * @uiName Region of indirect tax field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_selectedRegion: string = "Country / region of indirect tax";
  /**
   * @uiName Province field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_province: string = "Province";

  /**
   * @uiName Indirect tax number field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxNumber: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}}";
  /**
   * Displayed to participants registered for QST.
   * @uiName QST number field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_qstNumber: string = "QST number";
  /**
   * Displayed to participants registered for indirect tax in Quebec, Canada.
   * @uiName QST tax checkbox
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_isRegisteredQST: string = "I am registered for QST Tax";
  /**
   * Displayed to participants registered for indirect tax in Spain.
   * @uiName Spain income tax checkbox
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   */
  @Prop() step2_isRegisteredSubRegionIncomeTax: string =
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.";
  /**
   * Displayed to participants registered in Spain.
   * @uiName Sub-region of indirect tax field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_subRegion: string = "Sub-region";
  /**
   * @uiName Income tax field label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_subRegionTaxNumberLabel: string = "Income Tax Number";
  /**
   * Communicate that after this step, only Support can change personal and indirect tax information.
   * @uiName Submission confirmation alert
   * @uiGroup Step 2 Properties
   * @uiWidget textArea
   */
  @Prop() step2_cannotChangeInfoAlert: string =
    "Changes to your personal and indirect tax information can only be made through our Support team after you complete this step. Make sure these are correct before continuing.";
  /**
   * @uiName Missing indirect tax number error message
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxNumberError: string =
    "{taxType, select, GST {GST number} HST {HST number} VAT {VAT number} CT {CT number} SST {SST number} GENERAL {Indirect tax number}} is required";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    STEP 3 PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Step 3 title
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxForm: string = "Tax form";
  /**
   * Display the type of tax form that the participant must submit.
   * @uiName Tax form name
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormLabel: string = "{documentType} Tax Form";
  /**
   * @uiName Participant type field label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_participantType: string = "Participant type";
  /**
   * An option for the participant type field. Used to determine which W-8 form is required.
   * @uiName Business representative participant type label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_businessEntity: string = "I represent a business";
  /**
   * An option for the participant type field. Used to determine which W-8 form is required.
   * @uiName Individual participant type label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_individualParticipant: string =
    "I am an individual participant";
  /**
   * Displayed at the top of the page to participants based in the US.
   * @uiName W-9 tax form description
   * @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_taxFormDescription: string =
    "Participants based in the US need to submit a {documentType} form.";
  /**
   * Displayed at the top of the page to individuals joining a US program who reside outside the country.
   * @uiName W-8 BEN tax form description
   *  @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_taxFormDescriptionIndividualParticipant: string =
    "Participants residing outside of the US, joining the referral program of a US-based company, need to submit a {documentType} form.";
  /**
   * Displayed at the top of the page to participants representing a business.
   * @uiName W-8 BEN-E tax form description
   *  @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_taxFormDescriptionBusinessEntity: string =
    "Participants residing outside of the US who represent a business entity need to submit a {documentType} form.";
  /**
   * This appears inside the Docusign frame.
   * @uiName Docusign session expired message
   * @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_docusignExpired: string =
    "For your security and privacy, we automatically end your session after 20 minutes of inactivity. Please refresh and re-enter your tax information to continue.";
  /**
   * Remind participants their session will time out after 20 minutes of inactivity.
   * @uiName Docusign timed session message
   * @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_docusignSessionWarning: string =
    "For your security, we automatically end your session when you have not interacted with the form after 20 minutes.";
  /**
   * This appears inside the Docusign frame.
   * @uiName Docusign form error message
   * @uiGroup Step 3 Properties
   * @uiWidget textArea
   */
  @Prop() step3_docusignError: string =
    "There was a problem displaying this form. Please refresh the page. If this problem continues, contact Support.";
  /**
   * @uiName Refresh page button label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_refreshButton: string = "Refresh Page";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    STEP 4 PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Step 4 title
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAndPayouts: string = "Payouts";
  /**
   * @uiName Direct to bank payout option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_directlyToBankAccount: string = "Directly to my bank account";
  /**
   * @uiName PayPal payout option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_toPayPalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  /**
   * @uiName Threshold balance payment schedule option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentScheduleBalanceThreshold: string =
    "Pay me when my balance reaches a threshold";
  /**
   * @uiName Fixed day payment schedule option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentScheduleFixedDay: string =
    "Pay me on a fixed day of the month";
  /**
   * Let the participant choose what day of the month they’ll get paid
   * @uiName Payment day field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentDaySelectLabel: string = "Payment Day";

  /**
   * Participant use this field to select the balance at which they want to be paid
   * @uiName Payment threshold field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentThresholdSelectLabel: string = "Payment threshold";
  /**
   * One of two payment day options
   * @uiName First of month payday option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentDayFirstOfMonthLabelText: string = "1st of the month";
  /**
   * One of two payment day options
   * @uiName Fifteenth of month payday option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentDayFifteenthOfMonthLabelText: string =
    "15th of the month";
  /**
   * @uiName Payment method section header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentMethod: string = "Payment method";
  /**
   * @uiName Payment schedule section header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentSchedule: string = "Payment schedule";
  /**
   * @uiName Payment method section description
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_paymentMethodSubtext: string =
    "Payouts will be sent from our referral program provider, impact.com.";
  /**
   * Displayed to participants who choose PayPal as their payout method
   * @uiName PayPal email field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_payPalInputLabel: string = "PayPal email";
  /**
   * @uiName Bank country field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankLocationLabel: string = "Bank country location";
  /**
   * @uiName Beneficiary account field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_beneficiaryAccountNameLabel: string =
    "Beneficiary account name";

  /**
   * @uiName Bank account type field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankAccountTypeLabel: string = "Bank account type";

  /**
   * @uiName Checking account option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_checkingSelectItemLabel: string = "Checking";

  /**
   * Label text for the savings account type select item
   * @uiName Savings account options
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_savingsSelectItemLabel: string = "Savings";

  /**
   * @uiName Bank account number field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankAccountNumberLabel: string = "Bank account number";

  /**
   * @uiName IBAN field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_ibanLabel: string = "IBAN";

  /**
   * @uiName SWIFT code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_swiftCodeLabel: string = "SWIFT code";

  /**
   * @uiName Routing code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_routingCodeLabel: string =
    "{bankCountry, select, AU {BSB number} CA {Routing number} CZ {Bank code} HK {Clearing code} SG {Clearing code} US {ABA routing number} NZ {BSB number} ZA {Bank/Branch number} IN {IFSC} CNY {CNAPS} other {Routing code} }";

  /**
   * @uiName Bank name field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankNameLabel: string = "Bank name";

  /**
   * @uiName Classification entity field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_classificationEntityLabel: string = "Classification entity";

  /**
   * One of three options listed for the classification field
   * @uiName Business classification option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_businessSelectItemLabel: string = "Business";

  /**
   * One of three options listed for the classification field
   * @uiName Individual classification option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_individualSelectItemLabel: string = "Individual";

  /**
   * One of three options listed for the classification field
   * @uiName Foreign classification option
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_foreignSelectItemLabel: string = "Foreign";

  /**
   * @uiName Classification CPF field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_classificationCPFLabel: string = "Classification CPF";

  /**
   * @uiName Patronymic name field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_patronymicNameLabel: string = "Patronymic name";

  /**
   * @uiName VO code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_voCodeLabel: string = "VO code";

  /**
   * @uiName Agency code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_agencyCodeLabel: string = "Agency code";

  /**
   * @uiName Branch code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_branchCodeLabel: string = "Branch code";

  /**
   * Label text for the classification input field
   * @uiName Classification field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_classificationLabel: string = "Classification";

  /**
   * @uiName Taxpayer ID field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxPayerIdLabel: string = "Beneficiary INN";

  /**
   * @uiName Bank address field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankAddressLabel: string = "Bank address";
  /**
   * @uiName Bank city field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankCityLabel: string = "Bank city";
  /**
   * @uiName Bank province/state field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankStateLabel: string = "Bank Province / State";
  /**
   * @uiName  Bank postal code field label
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankPostalCodeLabel: string = "Bank postal code";
  /**
   * Alert text indicating participant cannot change info after it has been submitted
   * @uiName Cannot change info Alert text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_cannotChangeInfoAlert: string =
    "Your payout information can only be changed through our Support team after you complete this step. Make sure your payout method and schedule are correct before submitting.";

  /**
   * Default payment method to the participants’ bank account.
   * @uiName EFT withdrawal payment method
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_eftWithdrawalLabel: string = "EFT Withdrawal (free)";

  /**
   * @uiName FX Wire Processing fee text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_fxWireProcessingFeeLabel: string =
    "FX Wire (Processing Fee {currency}{defaultFxFee}.00)";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    DASHBOARD PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  /**
   * @uiName Active tax form badge label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextActive?: string = "Active";

  /**
   * @uiName Invalid tax form badge label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Displayed when the participant submitted their form but it is awaiting review.
   *
   * @uiName Not verified tax form badge label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextNotVerified?: string = "Not Verified";

  /**
   * Additional text displayed next to the tax form's status badge
   *
   * @uiName Active W-9 description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextSubmittedOn?: string =
    "Submitted on {dateSubmitted}.";
  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Active W-8 description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextSubmittedOnW8?: string =
    "Submitted on {dateSubmitted}. Valid for three years after submission.";

  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Tax form in review description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-9 error message title
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_taxAlertHeaderNotActiveW9?: string =
    "Your W9 tax form has personal information that doesn’t match your profile";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-8 error message title
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_taxAlertHeaderNotActiveW8?: string =
    "{documentType} tax form is invalid";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-9 error message description
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_taxAlertNotActiveMessageW9?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Part of the alert displayed at the top of the page.
   *
   * @uiName Inactive W-8 error message description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxAlertNotActiveMessageW8?: string =
    "Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new {documentType} form.";
  /**
   * Additional text displayed next to the tax form's status badge.
   *
   * @uiName Invalid tax form description
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_invalidForm?: string =
    "Make sure your information is correct and submit new form.";
  /**
   * @uiName Payout information section header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_bankingInformationSectionHeader: string =
    "Payout Information";
  /**
   * @uiName Tax document section header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxDocumentSectionHeader: string = "Tax documents";
  /**
   * Displayed under the tax document section header.
   *
   * @uiName Tax documents section description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxDocumentSectionSubHeader: string =
    "{documentType} tax form";
  /**
   * No other statuses or badges will be displayed in the tax form section in this case.
   *
   * @uiName Tax form not required text
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_noFormNeededSubtext: string =
    "Tax documents are only required if you are based in the US or joining the referral program of a US based brand.";
  /**
   *
   * @uiName Indirect tax section header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoSectionHeader: string = "Indirect tax";
  /**
   * If the participant is registered for indirect tax in Canada, display the province they’re registered in.
   *
   * @uiName Canadian province of indirect tax
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoCanada: string =
    "Registered in {province}, {country}";
  /**
   * If the participant is registered for indirect tax, display the country they’re registered in.
   *
   * @uiName Indirect tax country
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoOtherCountry: string =
    "Registered in {country}";
  /**
   * If the participant is registered for indirect tax in Spain, display the region they’re registered in.
   *
   * @uiName Spanish region of indirect tax
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoSpain: string =
    "Registered in {country}, {subRegion}";
  /**
   * @uiName Indirect tax tooltip
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_indirectTaxTooltipSupport: string =
    "To make changes to your indirect tax information, please contact Support.";
  /**
   * Displayed to participants who have submitted their indirect tax information.
   *
   * @uiName  Indirect tax details
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxDetails: string =
    "{indirectTaxType} number: {indirectTaxNumber}";
  /**
   * @uiName Submit new tax form button label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_newFormButton: string = "Submit new form";
  /**
   * @uiName Edit payment info button label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_editPaymentInformationButton: string =
    "Edit Payout Information";
  /**
   * @uiName Not registered for indirect tax text
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_notRegisteredForTax: string =
    "Not registered. Participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information.";
  /**
   * Displayed to participants registered in Quebec, Canada.
   * @uiName QST indirect tax details
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_qstNumber: string = "QST number: {qstNumber}";
  /**
   * @uiName Spain sub-region indirect tax number
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_subRegionTaxNumber: string =
    "Income tax number: {subRegionTaxNumber}";
  /**
   * @uiName Payout status badge
   * @uiGroup Dashboard Properties
   */
  @Prop()
  dashboard_statusBadgeText: string =
    "{badgeText, select, payoutToday {Payout Today} nextPayout {Next Payout} }";
  /**
   * Display participants' payout preference on the payout information card, indicating the balance at which they want to get paid.
   * @uiName Payout schedule by threshold text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_thresholdPayoutText: string =
    "Next payout occurs when balance is {thresholdBalance}";
  /**
   * Shown before the participant’s bank account information.
   * @uiName Bank account field label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_accountText: string = "Account";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Invoice number column title
   *  @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceColumnTitle: string = "Invoice";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Date column title
   *  @uiGroup Dashboard Properties
   */
  @Prop() dashboard_dateColumnTitle: string = "Date";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Earnings column title
   *  @uiGroup Dashboard Properties
   */
  @Prop() dashboard_earningsColumnTitle: string = "Earnings";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Taxed amount column title
   *  @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxedAmountColumnTitle: string = "Taxed Amount";
  /**
   * Displayed under the payout details card.
   * @uiName Payout from impact text
   * @uiWidget textArea
   */
  @Prop() dashboard_payoutFromImpact: string =
    "Your balance may take up to 24 hours to update. Payouts will be sent from our referral program provider, impact.com.";
  /**
   * Part of the Invoice table displayed at the bottom of the page.
   * @uiName Earnings after tax column title
   *  @uiGroup Dashboard Properties
   */
  @Prop() dashboard_earningsAfterTaxColumnTitle: string = "Earnings after tax";
  /**
   * @uiName Replace tax form modal header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_replaceTaxFormModalHeader: string =
    "Replace existing tax form";
  /**
   * @uiName Replace tax form modal body text
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop() dashboard_replaceTaxFormModalBodyText: string =
    "Submitting a new tax form will remove your existing form. Make sure to sign and complete your new tax form to prevent any issues with your next payout.";
  /**
   * Part of the alert displayed at the top of the page when there’s been an issue preventing payouts.
   * @uiName Payout error message title
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop()
  dashboard_errorTitleText: string = "Your payout is on hold ";
  /**
   * Part of the alert displayed at the top of the page when there’s been an issue preventing payouts.
   * @uiName Payout error message description
   * @uiGroup Dashboard Properties
   * @uiWidget textArea
   */
  @Prop()
  dashboard_errorDescriptionText: string =
    "If you’ve recently added your payout information, please wait while we verify your information. If it’s still on hold after a few days, please contact Support or check your inbox for an email from our referral program provider, impact.com.";

  /**
   * @uiName Invoice table description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceDescription: string =
    "View and download your invoices to report your earnings and stay tax compliant.";

  /**
   * @uiName Invoice table previous page button label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoicePrevLabel: string = "Prev";

  /**
   * @uiName Invoice table next page button label
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceMoreLabel: string = "Next";

  /**
   * @uiName Invoice table title
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceHeader: string = "Invoices";

  /**
   * @uiName Empty invoice table header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceEmptyStateHeader: string =
    "View your invoice details";

  /**
   * @uiName Empty invoice table description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invoiceEmptyStateText: string =
    "Refer a friend to view the status of your invoices and rewards earned";

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    GENERAL PROPS:
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  /**
   * @uiName Setup progress
   * @uiGroup General Form Properties
   */
  @Prop() formStep: string = "Step {step} of {count}";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message title
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message description
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Displayed under a field that is missing required information.
   * @uiName Empty form field error message
   * @uiGroup General Form Properties
   */
  @Prop() fieldRequiredError: string = "{fieldName} is required";
  /**
   * Displayed under a field when it has an invalid entry.
   * @uiName Form field error message
   * @uiGroup General Form Properties
   */
  @Prop() fieldInvalidError: string = "{fieldName} is invalid";
  /**
   * @uiName Continue button label
   * @uiGroup General Form Properties
   */
  @Prop() continueButton: string = "Continue";
  /**
   * @uiName Back button label
   * @uiGroup General Form Properties
   */
  @Prop() backButton: string = "Back";
  /**
   * @uiName Cancel button label
   * @uiGroup General Form Properties
   */
  @Prop() cancelButton: string = "Cancel";
  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert title
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";
  /**
   * Part of the alert displayed at the top of the page if the participant is already a registered partner on impact.com.
   * @uiName Participant is a partner alert description
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";
  /**
   * Placeholder text displayed in the country search dropdown
   * @uiName Country field placeholder text
   * @uiGroup General Form Properties
   */
  @Prop() searchForCountryText: string = "Search for country..";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message title
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message description
   * @uiGroup General Form Properties
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact Support.";
  /**
   * Displayed at the top of the page on all set up steps and on the dashboard.
   * @uiName Page description
   * @uiGroup General Form Properties
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   *
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseTaxAndCashResultType>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  // this field is required prop
  getGeneralStepTextProps(prefix: string) {
    const props = getProps(this);
    return {
      ...extractProps(props, prefix),
      generalErrorTitle: props.generalErrorTitle,
      generalErrorDescription: props.generalErrorDescription,
      fieldRequiredError: props.fieldRequiredError,
      fieldInvalidError: props.fieldInvalidError,
      continueButton: props.continueButton,
      backButton: props.backButton,
      cancelButton: props.cancelButton,
      isPartnerAlertHeader: props.isPartnerAlertHeader,
      isPartnerAlertDescription: props.isPartnerAlertDescription,
      loadingErrorAlertHeader: props.loadingErrorAlertHeader,
      loadingErrorAlertDescription: props.loadingErrorAlertDescription,
      taxAndPayoutsDescription: props.taxAndPayoutsDescription,
      searchForCountryText: props.searchForCountryText,
      formStep: props.formStep,
    };
  }

  render() {
    // const props = useTaxAndCash();
    const props = isDemo() ? useDemoTaxAndCash(this) : useTaxAndCash();

    // @ts-ignore
    if (this.demoData?.showTextProps) {
      const textProps = getProps(this);
      return (
        <div>
          {Object.keys(textProps)?.map((prop) => {
            if (prop === "demoData") return;
            return (
              <div>
                <b>{prop}:</b> {this[prop]}
                <hr />
              </div>
            );
          })}
        </div>
      );
    }

    switch (props.step) {
      case "/1":
        return (
          <sqm-user-info-form
            {...this.getGeneralStepTextProps("step1_")}
          ></sqm-user-info-form>
        );
      case "/2":
        return (
          <sqm-indirect-tax-form
            {...this.getGeneralStepTextProps("step2_")}
          ></sqm-indirect-tax-form>
        );
      case "/3":
        return (
          <sqm-docusign-form
            {...this.getGeneralStepTextProps("step3_")}
          ></sqm-docusign-form>
        );
      case "/4":
        return (
          <sqm-banking-info-form
            {...this.getGeneralStepTextProps("step4_")}
          ></sqm-banking-info-form>
        );
      case "/dashboard":
        return (
          <sqm-tax-and-cash-dashboard
            {...this.getGeneralStepTextProps("dashboard_")}
          ></sqm-tax-and-cash-dashboard>
        );
      case "/error":
        return (
          <ErrorView
            loadingErrorAlertHeader={this.loadingErrorAlertHeader}
            loadingErrorAlertDescription={this.loadingErrorAlertDescription}
          />
        );
    }

    return <LoadingView />;
  }
}

function useDemoTaxAndCash(props: TaxAndCashMonolith) {
  const [step, setStep] = useParentState<string>({
    namespace: TAX_CONTEXT_NAMESPACE,
    initialValue: "/1",
  });

  return deepmerge(
    {
      step,
      setStep,
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
