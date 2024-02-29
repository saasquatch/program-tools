import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { useParentState } from "../../../utils/useParentState";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "./data";
import { UseTaxAndCashResultType, useTaxAndCash } from "./useTaxAndCash";
import { extractProps } from "./extractProps";
import { isDemo } from "@saasquatch/component-boilerplate";

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
  // !: Make sure to also change the prop names in the respective component

  /**
   * * USER INFO FORM PROPS:
   **/

  /**
   * Label text for first name input
   * @uiName First name label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_firstName: string = "First name";
  /**
   * Label text for last name input
   * @uiName Last name label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_lastName: string = "Last name";
  /**
   * Label text for email input
   * @uiName Email label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_email: string = "Email";
  /**
   * Label text for country input
   * @uiName Country label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_country: string = "Country";
  /**
   * Label text for currency input
   * @uiName Currency label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_currency: string = "Currency";
  /**
   * Label text for tax and banking collection checkbox
   * @uiName Tax and banking label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_allowBankingCollection: string = "I agree to the terms";
  /**
   * Heading text for the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox heading
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_taxAndBankingCollection: string = "Continue";
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_formStep: string = "Step 1 of 4";
  /**
   * Heading text shown above the forms inputs.
   * @uiName Form heading text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_personalInformation: string = "Personal Information";
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_businessEntity: string = "I represent a business entity";
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_individualParticipant: string =
    "I am an individual participant";
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_participantType: string = "Participant type";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_submitButton: string = "Continue";
  /**
   * Error text shown at the bottom of the first name input
   * @uiName First name input error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_firstNameError: string = "Enter a first name";
  /**
   * Error text shown at the bottom of the last name input
   * @uiName Last name input error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_lastNameError: string = "Enter a last name";
  /**
   * Error text shown at the bottom of the email input
   * @uiName Email input error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_emailError: string = "Enter a valid email";
  /**
   * Error text shown at the bottom of the country input
   * @uiName Country input error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_countryError: string = "Select a country";
  /**
   * Error text shown at the bottom of the currency input
   * @uiName Currency input error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_currencyError: string = "Select a currency";
  /**
   * Error text shown at the bottom of the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_allowBankingCollectionError: string = "This field is required";
  /**
   * Error text shown at the bottom of the participant type checkbox
   * @uiName Participant type checkbox error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_participantTypeError: string = "Select a participant type";

  /**
   * Alert header text shown in alert if user is already a registered partner
   * @uiName Participant is partner title
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Alert description text shown in alert if user is already a registered partner
   * @uiName Participant is partner description
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   * @uiGroup Step 1 Properties
   */
  @Prop() step1_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * * STEP 2 PROPS:
   */
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Indirect tax form step text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_formStep: string = "Step 2 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Indirect tax heading text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTax: string = "Indirect Tax";
  /**
   * Subtext shown at the top of the page
   * @uiName Indirect tax sub text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxDescription: string =
    "Indirect Taxes (e.g. VAT, HST, GST) are transactional based taxes that are required to be levied by service providers by most tax authorities.";
  /**
   * Heading text shown above the tax details radio buttons
   * @uiName Indirect tax details heading
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxDetails: string = "Indirect Tax Details";
  /**
   * Sub text shown above the tax details radio buttons
   * @uiName Indirect tax details sub text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxDetailsDescription: string =
    "Not sure if you are registered for indirect tax? Contact our Support team to find out more.";
  /**
   * Label text for the other region radio button
   * @uiName Other region radio button label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_otherRegion: string =
    "I am registered for Indirect Tax in a different Country / Region";
  /**
   * Label text for the not registered radio button
   * @uiName Not registered radio button label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_notRegistered: string = "I am not registered for Indirect Tax";
  /**
   * Label text for the Selected Region select input
   * @uiName Selected region select input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_selectedRegion: string = "Country / Region of Indirect Tax";
  /**
   * Label text for the Province select input
   * @uiName Province select input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_province: string = "Province";

  /**
   * Label text for the Indirect Tax Number input
   * @uiName Indirect Tax Number input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxNumber: string =
    "{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number} SST {SST Number} GENERAL {Indirect Tax Number}}";
  /**
   * Label text for the QST Tax Number input
   * @uiName QST Tax Number input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_qstNumber: string = "QST Number";
  /**
   * Label text for the QST checkbox
   * @uiName checkbox label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_isRegisteredQST: string = "I am registered for QST Tax";
  /**
   * Label text for Income Tax checkbox
   * @uiName Income Tax checkbox label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_isRegisteredSubRegionIncomeTax: string =
    "I am an individual registered for Income Tax purposes in Spain, and withholding tax will apply to any payments made to me.";
  /**
   * Label text for Sub-region select
   * @uiName for Sub-region select label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_subRegion: string = "Sub-region";
  /**
   * Label text for the Sub-region Income Tax Number input
   * @uiName Sub-region income Tax Number input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_subRegionTaxNumberLabel: string = "Income Tax Number";
  /**
   * Alert header text shown in alert if user is already a registered partner
   * @uiName Participant is partner title
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Alert description text shown in alert if user is already a registered partner
   * @uiName Participant is partner description
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_submitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_backButton: string = "Back";
  /**
   * Error text shown below the tax details radio buttons
   * @uiName Indirect tax details error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_taxDetailsError: string = "This field is required";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * Alert text indicating participant cannot change info after it has been submitted
   * @uiName Cannot change info Alert text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_cannotChangeInfoAlert: string =
    "Changes to your personal information and indirect tax can only be made through our Support team after you complete this step. Ensure these are correct before continuing.";

  /**
   * Error text shown below the Selected Region select input
   * @uiName Selected Region error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_selectedRegionError: string = "Country is required";
  /**
   * Error text shown below the Selected Region select input
   * @uiName Province error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_provinceError: string = "Province is required";
  /**
   * Error text shown below the Indirect Tax Number select input
   * @uiName Indirect Tax Number error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_indirectTaxNumberError: string =
    "{taxType, select, GST {GST Number} HST {HST Number} VAT {VAT Number} CT {CT Number} SST {SST Number} GENERAL {Indirect Tax Number}} is required";

  /**
   * Error text shown below the Sub-region Income Tax number input
   * @uiName Sub-region Income Tax error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_subRegionTaxNumberError: string =
    "Income Tax Number is required";
  /**
   * Error text shown below the QST Tax number input
   * @uiName QST Tax Number error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_qstTaxNumberError: string = "QST Tax Number is required";
  /**
   * * STEP 3 PROPS:
   */
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_formStep: string = "Step 3 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Tax form heading text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxForm: string = "Tax form";
  /**
   * Text shown at the top of the page next to the document type text
   * @uiName Tax form label text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormLabel: string = "{documentType} Tax Form";
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_participantType: string = "Participant type";
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_businessEntity: string = "I represent a company";
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_individualParticipant: string =
    "I am an individual participant";
  /**
   * Subtext shown at the top of the page next to the document type text
   * @uiName Tax form subtext
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormDescription: string =
    "Participants based in the US and partnering with US-based brands need to submit a {documentType} form.";
  /**
   * Subtext shown at the top of the page next to the document type text for individual participants
   * @uiName Tax form subtext
   *  @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormDescriptionIndividualParticipant: string =
    "Participants residing outside of the US, joining the referral program of a US-based company, need to submit a {documentType} form.";
  /**
   * Subtext shown at the top of the page next to the document type text for business entities
   * @uiName Tax form subtext
   *  @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormDescriptionBusinessEntity: string =
    "Participants residing outside of the US who represent a business entity need to submit a {documentType} form.";
  /**
   * Text shown in the link to the form for non US residents
   * @uiName Not based in US link text
   * @uiGroup Step 3 Properties
   */
  @Prop() stop3NotBasedInUS: string = "Not based in the US?";
  /**
   * Text shown in the banner above the document
   * @uiName Banner text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_banner: string =
    "For your security, we automatically end your session when you have not interacted with the form after 20 minutes.";
  /**
   * Heading text for the form submission checkbox
   * @uiName Form submission checkbox heading
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_checkboxLabel: string = "Form submission";
  /**
   * Label text for the form submission checkbox
   * @uiName Form submission checkbox label
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_checkboxDescription: string =
    "I have completed and submitted my tax form";
  /**
   * Text shown inside iframe when Docusign form expires
   * @uiName Expired Docusign form text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_docusignExpired: string =
    "For your security and privacy, we automatically end your session after 20 minutes of inactivity. Please refresh and re-enter your tax information to continue.";
  /**
   * Text inside iframe when Docusign form is completed
   * @uiName Docusign completed text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_docusignCompleted: string =
    "Your document has been completed and submitted.";
  /**
   * Text inside iframe when Docusign form throws error
   * @uiName Docusign error text
   * * @uiGroup Step 3 Properties
   */
  @Prop() step3_docusignError: string =
    "There was a problem displaying this form. Please refresh the page. If this problem continues, contact Support.";
  /**
   * Text shown inside of refresh button
   * @uiName Refresh button text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_refreshButton: string = "Refresh Page";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_submitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_backButton: string = "Back";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * The error message shown at the bottom of the page if the user has not checked the form submission checkbox
   *
   * @uiName Form submission error text
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_formSubmissionError: string = "This field is required";

  /**
   * STEP 4 PAYOUT INFORMATION FORM
   */
  /**
   * Subtext shown at the top of the page, used to show the current step of the tax form.
   * @uiName Form step text
   */
  @Prop() step4_formStep: string = "Step 4 of 4";

  /**
   * Heading text shown at the top of the page
   * @uiName Tax and Payouts heading text
   */
  @Prop() step4_taxAndPayouts: string = "Tax and Payouts";

  /**
   * Text shown at the top of the page next to the tax and payouts label text
   * @uiName Tax and Payouts label text
   */
  @Prop() step4_taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   * Text for the option to receive payments directly to a bank account
   * @uiName Directly to bank account option text
   */
  @Prop() step4_directlyToBankAccount: string = "Directly to my bank account";

  /**
   * Text for the option to receive payments to a PayPal account with processing fee details
   * @uiName PayPal option text with processing fee placeholder
   */
  @Prop() step4_toPayPalAccount: string =
    "PayPal (2% processing fee capped to {feeCap})";
  /**
   * Text for the option to receive payments at a specific balance threshold
   * @uiName Payment schedule balance threshold text
   */
  @Prop() step4_paymentScheduleBalanceThreshold: string =
    "Pay me when my balance reaches a threshold";
  /**
   * Text for the option to receive payments on a specific day of the month
   * @uiName Payment schedule fixed day text
   */
  @Prop() step4_paymentScheduleFixedDay: string =
    "Pay me on a fixed day of the month";

  /**
   * Label text for the payment day select
   * @uiName Payment day select label
   */
  @Prop() step4_paymentDaySelectLabel: string = "Payment Day";

  /**
   * Label text for the payment day select
   * @uiName Payment day select label
   */
  @Prop() step4_paymentThresholdSelectLabel: string = "Payment Threshold";
  /**
   * Label text for the payment day select option for the first of the month
   * @uiName First of month label text
   */
  @Prop() step4_paymentDayFirstOfMonthLabelText: string = "1st of the month";
  /**
   * Label text for the payment day select option for the fifteenth of the month
   * @uiName Fifteenth of month label text
   */
  @Prop() step4_paymentDayFifteenthOfMonthLabelText: string =
    "15th of the month";
  /**
   * Heading text for the payment method section
   * @uiName Payment method heading text
   */
  @Prop() step4_paymentMethod: string = "Payment Method";
  /**
   * Heading text for the payment schedule section
   * @uiName Payment schedule heading text
   */
  @Prop() step4_paymentSchedule: string = "Payment Schedule";
  /**
   * Subtext for the payment method section
   * @uiName Payment method subtext
   */
  @Prop() step4_paymentMethodSubtext: string =
    "Payouts will be sent on the first day of each month from our referral program provider, impact.com.";
  /**
   * Label text for the PayPal email input field
   * @uiName PayPal email input label
   */
  @Prop() step4_payPalInputLabel: string = "PayPal Email";

  /**
   * Text for the save button in the form
   * @uiName Save button text
   */
  @Prop() step4_submitButton: string = "Save";
  /**
   * Label text for the bank country location input field
   * @uiName Bank country location input label
   */
  @Prop() step4_bankLocationLabel: string = "Bank Country Location";
  /**
   * Label text for the beneficiary account name input field
   * @uiName Beneficiary account name input label
   */
  @Prop() step4_beneficiaryAccountNameLabel: string =
    "Beneficiary Account Name";

  /**
   * Label text for the bank account type input field
   * @uiName Bank account type input label
   */
  @Prop() step4_bankAccountTypeLabel: string = "Bank Account Type";

  /**
   * Label text for the checking account type select item
   * @uiName Checking select item label
   */
  @Prop() step4_checkingSelectItemLabel: string = "Checking";

  /**
   * Label text for the savings account type select item
   * @uiName Savings select item label
   */
  @Prop() step4_savingsSelectItemLabel: string = "Savings";

  /**
   * Label text for the bank account number input field
   * @uiName Bank account number input label
   */
  @Prop() step4_bankAccountNumberLabel: string = "Bank Account Number";
  /**
   * Label text for the IBAN input field
   * @uiName IBAN input label
   */
  @Prop() step4_ibanLabel: string = "IBAN";

  /**
   * Label text for the SWIFT code input field
   * @uiName SWIFT code input label
   */
  @Prop() step4_swiftCodeLabel: string = "SWIFT Code";

  /**
   * Label text for the routing code input field
   * @uiName Routing code input label
   */
  @Prop() step4_routingCodeLabel: string = "Routing Code";

  /**
   * Label text for the bank name input field
   * @uiName Bank name input label
   */
  @Prop() step4_bankNameLabel: string = "Bank Name";

  /**
   * Label text for the classification entity input field
   * @uiName Classification entity input label
   */
  @Prop() step4_classificationEntityLabel: string = "Classification Entity";

  /**
   * Label text for the business select item
   * @uiName Business select item label
   */
  @Prop() step4_businessSelectItemLabel: string = "Business";

  /**
   * Label text for the individual select item
   * @uiName Individual select item label
   */
  @Prop() step4_individualSelectItemLabel: string = "Individual";

  /**
   * Label text for the foreign select item
   * @uiName Foreign select item label
   */
  @Prop() step4_foreignSelectItemLabel: string = "Foreign";

  /**
   * Header text for the alert when the user is identified as a partner
   * @uiName Partner identification alert header
   */
  @Prop() step4_isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Description text for the alert when the user is identified as a partner
   * @uiName Partner identification alert description
   */
  @Prop() step4_isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Label text for the classification CPF input field
   * @uiName Classification CPF input label
   */
  @Prop() step4_classificationCPFLabel: string = "Classification CPF";

  /**
   * Label text for the patronymic name input field
   * @uiName Patronymic name input label
   */
  @Prop() step4_patronymicNameLabel: string = "Patronymic Name";

  /**
   * Label text for the VO code input field
   * @uiName VO code input label
   */
  @Prop() step4_voCodeLabel: string = "VO Code";

  /**
   * Label text for the agency code input field
   * @uiName Agency code input label
   */
  @Prop() step4_agencyCodeLabel: string = "Agency Code";

  /**
   * Label text for the branch code input field
   * @uiName Branch code input label
   */
  @Prop() step4_branchCodeLabel: string = "Branch Code";

  /**
   * Label text for the classification input field
   * @uiName Classification input label
   */
  @Prop() step4_classificationLabel: string = "Classification";

  /**
   * Label text for the Taxpayer ID input field
   * @uiName Taxpayer ID input label
   */
  @Prop() step4_taxPayerIdLabel: string = "Taxpayer ID";

  /**
   * Label text for the Bank Address input
   * @uiName Bank Address input item label
   */
  @Prop() step4_bankAddressLabel: string = "Bank Address";
  /**
   * Label text for the Bank City input
   * @uiName Bank City Label input label
   */
  @Prop() step4_bankCityLabel: string = "Bank City";
  /**
   * Label text for the Bank Province State input
   * @uiName Bank Province State input label
   */
  @Prop() step4_bankProvinceStateLabel: string = "Bank Province State";
  /**
   * Label text for the Bank Postal Code
   * @uiName  Bank Postal Code input label
   */
  @Prop() step4_bankPostalCodeLabel: string = "Bank Postal Code";
  /**
   * Alert text indicating participant cannot change info after it has been submitted
   * @uiName Cannot change info Alert text
   */
  @Prop() step4_cannotChangeInfoAlert: string =
    "Your payout information cannot be changed after saving. Ensure your payout method and schedule are correct before submitting.";
  /**
   * Title text for a general form submission error
   * @uiName General form submission error title
   */
  @Prop() step4_generalErrorTitle: string =
    "There was a problem submitting your information";

  /**
   * Description text for a general form submission error
   * @uiName General form submission error description
   */
  @Prop() step4_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * * DASHBOARD DOCUMENT SUBMITTED VIEW STEP
   */
  /**
   * Status text displayed in badge when tax document is Active
   *
   * @uiName Status text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextActive?: string = "Active";

  /**
   * Status text displayed in badge when tax document is Not Active
   *
   * @uiName Status text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Status text displayed in badge when tax document is Not Verified
   *
   * @uiName Status text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_statusTextNotVerified?: string = "Not Verified";

  /**
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextSubmittedOn?: string =
    "Submitted on {dateSubmitted}";
  /**
   * Description text for W8 which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextSubmittedOnW8?: string =
    "Submitted on {dateSubmitted}. Valid for three years after submission.";

  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Header displayed in not active W9 alert header at the top of the page.
   *
   * @uiName Not active W9 alert header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxAlertHeaderNotActiveW9?: string =
    "Your W9 tax form has personal information that doesn’t match your profile";
  /**
   * Header displayed in not active W9 alert header at the top of the page.
   *
   * @uiName Not active W8 alert header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxAlertHeaderNotActiveW8?: string =
    "{documentType} tax form is invalid";
  /**
   * Description text displayed in W9 alert body at the top of the page.
   *
   * @uiName Tax W9 alert message
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxAlertNotActiveMessageW9?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Description text displayed in W8 alert body at the top of the page.
   *
   * @uiName Tax W8 alert message
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxAlertNotActiveMessageW8?: string =
    "Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W8-BEN form.";
  /**
   * Description text displayed next to the badge in the tax documents status
   *
   * @uiName Invalid form description text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_invalidForm?: string =
    "Ensure your information matches your profile and resubmit a new document.";
  /**
   * Header text displayed above the banking information card
   *
   * @uiName Banking information header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_bankingInformationSectionHeader: string =
    "Banking Information";
  /**
   * Header text displayed above the tax documents status
   *
   * @uiName Tax document section header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxDocumentSectionHeader: string = "Tax documents";
  /**
   * Sub header text displayed above the tax documents status
   *
   * @uiName Tax documents sub header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_taxDocumentSectionSubHeader: string =
    "{documentType} Tax Form";
  /**
   * Subtext displayed at the bottom of the page if there are no tax documents to show
   *
   * @uiName No form needed subtext
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_noFormNeededSubtext: string =
    "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support.";
  /**
   * Header text displayed above the indirect tax preview section
   *
   * @uiName Indirect Tax Information Header
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoSectionHeader: string = "Indirect Tax";
  /**
   * Country/Province description text of indirect tax
   *
   * @uiName Indirect tax Canada description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoCanada: string =
    "Registered in {province}, {country}";
  /**
   * Other country description text of indirect tax
   *
   * @uiName Indirect tax other country description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoOtherCountry: string =
    "Registered in {country}";
  /**
   * Spain/Region description text of indirect tax
   *
   * @uiName Indirect tax Spain description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxInfoSpain: string =
    "Registered in {country}, {subRegion}";
  /**
   * Indirect tax tooltip text for support
   *
   * @uiName Indirect tax tooltip description
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxTooltipSupport: string =
    "To make changes to your indirect tax information, please contact Support.";
  /**
   * Indirect tax number/type details
   *
   * @uiName  Indirect tax details
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_indirectTaxDetails: string =
    "{indirectTaxType} number: {indirectTaxNumber}";
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName No form needed subtext
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_newFormButton: string = "Submit New Form";
  /**
   * Text displayed in the edit Payment Information button
   *
   * @uiName Edit Payment Information button
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_editPaymentInformationButton: string =
    "Edit Payout Information";
  /**
   * Text displayed when partner is not registered for Indirect Tax
   *
   * @uiName Not registered for Indirect Tax
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_notRegisteredForTax: string =
    "Not registered. Participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information.";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Label text for the QST number
   * @uiName QST number input
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_qstNumber: string = "QST Number: {qstNumber}";
  /**
   * Label text for the sub-region tax number
   * @uiName Sub-region tax number
   * @uiGroup Dashboard Properties
   */
  @Prop() dashboard_subRegionTaxNumber: string =
    "Income Tax Number: {incomeTaxNumber}";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseTaxAndCashResultType>;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getUserInfoFormTextProps() {
    const props = getProps(this);
    return extractProps(props, "step1_");
  }
  getIndirectTaxFormTextProps() {
    const props = getProps(this);
    return extractProps(props, "step2_");
  }
  getDocuSignFormTextProps() {
    const props = getProps(this);
    return extractProps(props, "step3_");
  }
  getDocumentTypeFormTextProps() {
    const props = getProps(this);
    return extractProps(props, "step3b_");
  }
  getSubmittedPageTextProps() {
    const props = getProps(this);
    return extractProps(props, "dashboard_");
  }

  render() {
    const props = useTaxAndCash();
    // const props = isDemo() ? useDemoTaxAndCash(this) : useTaxAndCash();

    switch (props.step) {
      case "/1":
        return (
          <sqm-user-info-form
            {...this.getUserInfoFormTextProps()}
          ></sqm-user-info-form>
        );
      case "/2":
        return (
          <sqm-indirect-tax-form
            {...this.getIndirectTaxFormTextProps()}
          ></sqm-indirect-tax-form>
        );
      case "/3":
        return (
          <sqm-docusign-form
            {...this.getDocuSignFormTextProps()}
          ></sqm-docusign-form>
        );
      case "/4":
        return <sqm-banking-info-form></sqm-banking-info-form>;
      case "/submitted":
        return (
          <sqm-tax-document-submitted
            {...this.getSubmittedPageTextProps()}
          ></sqm-tax-document-submitted>
        );
    }

    // TODO: Loading view
    return <div></div>;
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
