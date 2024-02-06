import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "sqm-tax-and-cash-monolith",
  shadow: true,
})
export class TaxAndCashMonolith {
  /**
   * * USER INFO FORM PROPS:
   **/

  /**
   * Label text for first name input
   * @uiName First name label
   */
  @Prop() firstName: string = "First name";
  /**
   * Label text for last name input
   * @uiName Last name label
   */
  @Prop() lastName: string = "Last name";
  /**
   * Label text for email input
   * @uiName Email label
   */
  @Prop() email: string = "Email";
  /**
   * Label text for country input
   * @uiName Country label
   */
  @Prop() country: string = "Country";
  /**
   * Label text for currency input
   * @uiName Currency label
   */
  @Prop() currency: string = "Currency";
  /**
   * Label text for tax and banking collection checkbox
   * @uiName Tax and banking label
   */
  @Prop() allowBankingCollection: string = "I agree to the terms";
  /**
   * Heading text for the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox heading
   */
  @Prop() taxAndBankingCollection: string = "Continue";
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = "Step 1 of 4";
  /**
   * Heading text shown above the forms inputs.
   * @uiName Form heading text
   */
  @Prop() personalInformation: string = "Personal Information";
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   */
  @Prop() businessEntity: string = "I represent a business entity";
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   */
  @Prop() individualParticipant: string = "I am an individual participant";
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   */
  @Prop() participantType: string = "Participant type";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = "Continue";
  /**
   * Error text shown at the bottom of the first name input
   * @uiName First name input error text
   */
  @Prop() firstNameError: string = "Enter a first name";
  /**
   * Error text shown at the bottom of the last name input
   * @uiName Last name input error text
   */
  @Prop() lastNameError: string = "Enter a last name";
  /**
   * Error text shown at the bottom of the email input
   * @uiName Email input error text
   */
  @Prop() emailError: string = "Enter a valid email";
  /**
   * Error text shown at the bottom of the country input
   * @uiName Country input error text
   */
  @Prop() countryError: string = "Select a country";
  /**
   * Error text shown at the bottom of the currency input
   * @uiName Currency input error text
   */
  @Prop() currencyError: string = "Select a currency";
  /**
   * Error text shown at the bottom of the tax and banking collection checkbox
   * @uiName Tax and banking collection checkbox error text
   */
  @Prop() allowBankingCollectionError: string = "This field is required";
  /**
   * Error text shown at the bottom of the participant type checkbox
   * @uiName Participant type checkbox error text
   */
  @Prop() participantTypeError: string = "Select a participant type";

  /**
   * Alert header text shown in alert if user is already a registered partner
   * @uiName Participant is partner title
   */
  @Prop() isPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Alert description text shown in alert if user is already a registered partner
   * @uiName Participant is partner description
   */
  @Prop() isPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

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
   * * STEP 2 PROPS:
   */
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Indirect tax form step text
   */
  @Prop() step2FormStep: string = "Step 2 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Indirect tax heading text
   */
  @Prop() step2IndirectTax: string = "Indirect Tax";
  /**
   * Subtext shown at the top of the page
   * @uiName Indirect tax sub text
   */
  @Prop() step2IndirectTaxDescription: string =
    "Indirect Taxes (e.g. VAT, HST, GST) are transactional based taxes that are required to be levied by service providers by most tax authorities.";
  /**
   * Heading text shown above the tax details radio buttons
   * @uiName Indirect tax details heading
   */
  @Prop() step2IndirectTaxDetails: string = "Indirect Tax Details";
  /**
   * Sub text shown above the tax details radio buttons
   * @uiName Indirect tax details sub text
   */
  @Prop() step2IndirectTaxDetailsDescription: string =
    "Not sure if you are registered for indirect tax? Contact our Support team to find out more.";
  /**
   * Label text for the HST Canada radio button
   * @uiName HST Canada radio button label
   */
  @Prop() step2HstCanada: string = "I am registered for HST in Canada";
  /**
   * Label text for the other region radio button
   * @uiName Other region radio button label
   */
  @Prop() step2OtherRegion: string =
    "I am registered for Indirect Tax in a different Country / Region";
  /**
   * Label text for the not registered radio button
   * @uiName Not registered radio button label
   */
  @Prop() step2NotRegistered: string = "I am not registered for Indirect Tax";
  /**
   * Label text for the Selected Region select input
   * @uiName Selected region select input label
   */
  @Prop() step2SelectedRegion: string = "Country / Region of Indirect Tax";
  /**
   * Label text for the VAT Number input
   * @uiName VAT Number input label
   */
  @Prop() step2VatNumber: string = "VAT number";
  /**
   * Label text for the Province select input
   * @uiName Province select input label
   */
  @Prop() step2Province: string = "Province";

  /**
   * Label text for the Indirect Tax Number input
   * @uiName Indirect Tax Number input label
   */
  @Prop() step2IndirectTaxNumber: string = "Indirect Tax";

  /**
   * Alert header text shown in alert if user is already a registered partner
   * @uiName Participant is partner title
   */
  @Prop() step2IsPartnerAlertHeader: string =
    "An account with this email already exists with our referral program provider, impact.com";

  /**
   * Alert description text shown in alert if user is already a registered partner
   * @uiName Participant is partner description
   */
  @Prop() step2IsPartnerAlertDescription: string =
    "If you don’t recognize this referral program provider or believe this is a mistake, please contact Support or sign up for this referral program with a different email.";

  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() step2SubmitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() step2BackButton: string = "Back";
  /**
   * Error text shown below the tax details radio buttons
   * @uiName Indirect tax details error text
   */
  @Prop() step2TaxDetailsError: string = "This field is required";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() step2GeneralErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() step2GeneralErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Error text shown below the Selected Region select input
   * @uiName Selected Region error text
   */
  @Prop() step2SelectedRegionError: string = "Country is required";
  /**
   * Error text shown below the VAT Number input
   * @uiName VAT Number error text
   */
  @Prop() step2VatNumberError: string = "VAT number is required";
  /**
   * Error text shown below the Selected Region select input
   * @uiName Province error text
   */
  @Prop() step2ProvinceError: string = "Province is required";
  /**
   * Error text shown below the Indirect Tax Number select input
   * @uiName Indirect Tax Number error text
   */
  @Prop() step2IndirectTaxNumberError: string = "Indirect Tax is required";

  /**
   * * STEP 3 PROPS:
   */
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() step3FormStep: string = "Step 3 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Tax form heading text
   */
  @Prop() step3TaxForm: string = "Tax form";
  /**
   * Text shown at the top of the page next to the document type text
   * @uiName Tax form label text
   */
  @Prop() step3TaxFormLabel: string = "{documentType} Tax Form";
  /**
   * Subtext shown at the top of the page next to the document type text
   * @uiName Tax form subtext
   */
  @Prop() step3TaxFormDescription: string =
    "Participants based in the US and partnering with US-based brands need to submit a {documentType} form.";
  /**
   * Text shown in the link to the form for non US residents
   * @uiName Not based in US link text
   */
  @Prop() stop3NotBasedInUS: string = "Not based in the US?";
  /**
   * Text shown in the banner above the document
   * @uiName Banner text
   */
  @Prop() step3Banner: string =
    "For your security, we automatically end your session when you have not interacted with the form after 20 minutes.";
  /**
   * Heading text for the form submission checkbox
   * @uiName Form submission checkbox heading
   */
  @Prop() step3CheckboxLabel: string = "Form submission";
  /**
   * Label text for the form submission checkbox
   * @uiName Form submission checkbox label
   */
  @Prop() step3CheckboxDescription: string =
    "I have completed and submitted my tax form";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() step3SubmitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() backButton: string = "Back";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() step3GeneralErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() step3GeneralErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * The error message shown at the bottom of the page if the user has not checked the form submission checkbox
   *
   * @uiName Form submission error text
   */
  @Prop() step3FormSubmissionError: string = "This field is required";

  /**
   * * DOCUMENT TYPE STEP
   */

  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() step3bFormStep: string = "Step 3 of 4";
  /**
   * Sub text shown above form selection radio buttons
   * @uiName Tax form selection heading text
   */
  @Prop() step3bFormLabel: string = "Select a tax form";
  /**
   * Heading text shown at the top of the top of page
   * @uiName Tax form heading text
   */
  @Prop() step3bTaxForm: string = "Tax form";
  /**
   * Label text for the W9 radio button
   * @uiName W9 radio button label
   */
  @Prop() step3bW9Label: string = "W9";
  /**
   * Subtext for the W9 radio button
   * @uiName W9 radio button subtext
   */
  @Prop() step3bW9Description: string =
    "W9 For participants based in the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8 radio button
   * @uiName W8 radio button label
   */
  @Prop() step3bW8Label: string = "W8-Ben";
  /**
   * Subtext for the W8 radio button
   * @uiName W8 radio button subtext
   */
  @Prop() step3bW8Description: string =
    "W8-BEN For individuals residing outside of the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8E radio button
   * @uiName W8E radio button label
   */
  @Prop() step3bW8ELabel: string = "W8-BEN-E";
  /**
   * Subtext for the W8E radio button
   * @uiName W8E radio button subtext
   */
  @Prop() step3bW8EDescription: string =
    "W8-BEN-E For participants residing outside of the US who represent a business entity, joining the referral program of a US-based company.";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() step3bSubmitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() step3bBackButton: string = "Back";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() step3bGeneralErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() step3bGeneralErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * * SUBMITTED VIEW STEP
   */
  /**
   * Status text displayed in badge when tax document is Active
   *
   * @uiName Status text
   */
  @Prop() step4StatusTextActive?: string = "Active";

  /**
   * Status text displayed in badge when tax document is Not Active
   *
   * @uiName Status text
   */
  @Prop() step4StatusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Status text displayed in badge when tax document is Not Verified
   *
   * @uiName Status text
   */
  @Prop() step4StatusTextNotVerified?: string = "Not Verified";

  /**
   * Status text displayed in badge when tax document is Expired
   *
   * @uiName Status text
   */
  @Prop() step4StatusTextExpired?: string = "Expired";

  /**
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   */
  @Prop() step4BadgeTextSubmittedOn?: string = "Submitted on {dateSubmitted}";

  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   */
  @Prop() step4BadgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Description text which appears beside badge showing the form has expired
   *
   * @uiName Badge description text
   */
  @Prop() step4BadgeTextExpiredOn?: string = "Expired on {dateExpired}.";

  /**
   * Description text which appears beside badge showing the form expiring soon
   *
   * @uiName Badge description text
   */
  @Prop() step4BadgeTextExpiringSoon?: string = ", expiring on {dateExpired}.";

  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Not active alert header
   */
  @Prop() step4TaxAlertHeaderNotActive?: string =
    "Your {documentType} tax form has personal information that doesn't match your profile.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expired alert header
   */
  @Prop() step4TaxAlertHeaderExpiredOn?: string =
    "Your {documentType} tax form has expired.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expiring soon alert header
   */
  @Prop() step4TaxAlertHeaderExpiringSoon?: string =
    "Your {documentType} tax form expires on {dateExpired}";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Tax alert message
   */
  @Prop() step4TaxAlertMessage?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Expiring soon tax alert message
   */
  @Prop() step4TaxAlertMessageExpiringSoon: string =
    "Please submit a new {documentType} form to continue receiving your rewards";
  /**
   * Description text displayed next to the badge in the tax documents status
   *
   * @uiName Invalid form description text
   */
  @Prop() step4InvalidForm?: string =
    "Ensure your information matches your profile and resubmit a new document.";
  /**
   * Header text displayed above the banking information card
   *
   * @uiName Banking information header
   */
  @Prop() step4BankingInformationSectionHeader: string = "Banking Information";
  /**
   * Header text displayed above the tax documents status
   *
   * @uiName Tax document section header
   */
  @Prop() step4TaxDocumentSectionHeader: string = "Tax documents";
  /**
   * Sub header text displayed above the tax documents status
   *
   * @uiName Tax documents sub header
   */
  @Prop() step4TaxDocumentSectionSubHeader: string = "{documentType} Tax Form";
  /**
   * Subtext displayed at the bottom of the page if there are no tax documents to show
   *
   * @uiName No form needed subtext
   */
  @Prop() step4NoFormNeededSubtext: string =
    "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support.";
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName Step 4 No form needed subtext
   */
  @Prop() step4NewFormButton: string = "Submit New document";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName Step 4 General error title
   */
  @Prop() step4GeneralErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName Step 4 General error text
   */
  @Prop() step4GeneralErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  getUserInfoFormTextProps() {}
  getIndirectTaxFormTextProps() {}
  getDocuSignFormTextProps() {}
  getDocumentTypeFormTextProps() {}
  getSubmittedPageTextProps() {}

  render() {
    return (
      <sqm-tax-and-cash>
        <template path="/1">
          <sqm-user-info-form />
        </template>
        <template path="/2">
          <sqm-indirect-tax-form />
        </template>
        <template path="/3/:documentType">
          <sqm-docusign-form>
            <sqm-docusign-embed slot="docusign-iframe"></sqm-docusign-embed>
          </sqm-docusign-form>
        </template>
        <template path="/3b">
          <sqm-document-type-form />
        </template>
        <template path="/submitted">
          <sqm-tax-document-submitted />
        </template>
      </sqm-tax-and-cash>
    );
  }
}
