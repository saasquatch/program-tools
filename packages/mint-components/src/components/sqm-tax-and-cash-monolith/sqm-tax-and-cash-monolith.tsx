import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { getProps } from "../../utils/utils";
import {
  UseTaxAndCashResultType,
  useTaxAndCash,
} from "../tax-and-cash/sqm-tax-and-cash/useTaxAndCash";
import { extractProps } from "./extractProps";
import { isDemo } from "@saasquatch/component-boilerplate";
import { TaxAndCash } from "../tax-and-cash/sqm-tax-and-cash/sqm-tax-and-cash";
import { useParentState } from "../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../tax-and-cash/sqm-tax-and-cash/data";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";

/**
 * @uiName Tax and Cash
 */
@Component({
  tag: "sqm-tax-and-cash-monolith",
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
   * Label text for the HST Canada radio button
   * @uiName HST Canada radio button label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_hstCanada: string = "I am registered for HST in Canada";
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
   * Label text for the VAT Number input
   * @uiName VAT Number input label
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_vatNumber: string = "VAT number";
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
  @Prop() step2_indirectTaxNumber: string = "Indirect Tax";

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
   * Error text shown below the Selected Region select input
   * @uiName Selected Region error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_selectedRegionError: string = "Country is required";
  /**
   * Error text shown below the VAT Number input
   * @uiName VAT Number error text
   * @uiGroup Step 2 Properties
   */
  @Prop() step2_vatNumberError: string = "VAT number is required";
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
  @Prop() step2_indirectTaxNumberError: string = "Indirect Tax is required";

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
   * Subtext shown at the top of the page next to the document type text
   * @uiName Tax form subtext
   * @uiGroup Step 3 Properties
   */
  @Prop() step3_taxFormDescription: string =
    "Participants based in the US and partnering with US-based brands need to submit a {documentType} form.";
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
   * * DOCUMENT TYPE STEP
   */

  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_formStep: string = "Step 3 of 4";
  /**
   * Sub text shown above form selection radio buttons
   * @uiName Tax form selection heading text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_formLabel: string = "Select a tax form";
  /**
   * Heading text shown at the top of the top of page
   * @uiName Tax form heading text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_taxForm: string = "Tax form";
  /**
   * Label text for the W9 radio button
   * @uiName W9 radio button label
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w9Label: string = "W9";
  /**
   * Subtext for the W9 radio button
   * @uiName W9 radio button subtext
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w9Description: string =
    "W9 For participants based in the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8 radio button
   * @uiName W8 radio button label
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w8Label: string = "W8-Ben";
  /**
   * Subtext for the W8 radio button
   * @uiName W8 radio button subtext
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w8Description: string =
    "W8-BEN For individuals residing outside of the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8E radio button
   * @uiName W8E radio button label
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w8ELabel: string = "W8-BEN-E";
  /**
   * Subtext for the W8E radio button
   * @uiName W8E radio button subtext
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_w8EDescription: string =
    "W8-BEN-E For participants residing outside of the US who represent a business entity, joining the referral program of a US-based company.";
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_submitButton: string = "Continue";
  /**
   * Text shown inside of back button
   * @uiName Back button text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_backButton: string = "Back";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   * @uiGroup Step 3b Properties
   */
  @Prop() step3b_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

  /**
   * * SUBMITTED VIEW STEP
   */
  /**
   * Status text displayed in badge when tax document is Active
   *
   * @uiName Status text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_statusTextActive?: string = "Active";

  /**
   * Status text displayed in badge when tax document is Not Active
   *
   * @uiName Status text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_statusTextNotActive?: string = "Invalid Tax Form";

  /**
   * Status text displayed in badge when tax document is Not Verified
   *
   * @uiName Status text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_statusTextNotVerified?: string = "Not Verified";

  /**
   * Status text displayed in badge when tax document is Expired
   *
   * @uiName Status text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_statusTextExpired?: string = "Expired";

  /**
   * Description text which appears beside badge showing when the form was submitted
   *
   * @uiName Badge description text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_badgeTextSubmittedOn?: string = "Submitted on {dateSubmitted}";

  /**
   * Description text which appears beside badge showing the form is awaiting review
   *
   * @uiName Badge description text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_badgeTextAwaitingReview?: string =
    "Awaiting review. Submitted on {dateSubmitted}.";

  /**
   * Description text which appears beside badge showing the form has expired
   *
   * @uiName Badge description text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_badgeTextExpiredOn?: string = "Expired on {dateExpired}.";

  /**
   * Description text which appears beside badge showing the form expiring soon
   *
   * @uiName Badge description text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_badgeTextExpiringSoon?: string = ", expiring on {dateExpired}.";

  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Not active alert header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAlertHeaderNotActive?: string =
    "Your {documentType} tax form has personal information that doesn't match your profile.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expired alert header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAlertHeaderExpiredOn?: string =
    "Your {documentType} tax form has expired.";
  /**
   * Header displayed in alert header at the top of the page.
   *
   * @uiName Expiring soon alert header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAlertHeaderExpiringSoon?: string =
    "Your {documentType} tax form expires on {dateExpired}";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Tax alert message
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAlertMessage?: string =
    "Please resubmit a new {documentType} form.";
  /**
   * Description text displayed in alert body at the top of the page.
   *
   * @uiName Expiring soon tax alert message
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxAlertMessageExpiringSoon: string =
    "Please submit a new {documentType} form to continue receiving your rewards";
  /**
   * Description text displayed next to the badge in the tax documents status
   *
   * @uiName Invalid form description text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_invalidForm?: string =
    "Ensure your information matches your profile and resubmit a new document.";
  /**
   * Header text displayed above the banking information card
   *
   * @uiName Banking information header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_bankingInformationSectionHeader: string = "Banking Information";
  /**
   * Header text displayed above the tax documents status
   *
   * @uiName Tax document section header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxDocumentSectionHeader: string = "Tax documents";
  /**
   * Sub header text displayed above the tax documents status
   *
   * @uiName Tax documents sub header
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_taxDocumentSectionSubHeader: string = "{documentType} Tax Form";
  /**
   * Subtext displayed at the bottom of the page if there are no tax documents to show
   *
   * @uiName No form needed subtext
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_noFormNeededSubtext: string =
    "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support.";
  /**
   * Text displayed in the submit new document button at the bottom of the page
   *
   * @uiName Step 4 No form needed subtext
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_newFormButton: string = "Submit New document";
  /**
   * Text displayed when partner is not registered for Indirect Tax
   *
   * @uiName Not registered for Indirect Tax
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_notRegisteredForTax: string = "Not registered for Indirect Tax";
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName Step 4 General error title
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName Step 4 General error text
   * @uiGroup Step 4 Properties
   */
  @Prop() step4_generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";

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
    return extractProps(props, "step4_");
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
      case "/3/W8-BEN":
      case "/3/W8-BEN-E":
      case "/3/W9":
        return (
          <sqm-docusign-form {...this.getDocuSignFormTextProps()}>
            <sqm-docusign-embed slot="docusign-iframe"></sqm-docusign-embed>
          </sqm-docusign-form>
        );
      case "/3b":
        return (
          <sqm-document-type-form
            {...this.getDocumentTypeFormTextProps()}
          ></sqm-document-type-form>
        );
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