import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  DocusignFormView,
  DocusignFormViewProps,
} from "./sqm-docusign-form-view";
import { useDocusignForm, UseDocusignFormResult } from "./useDocusignForm";
import { DocusignExpiredView } from "../sqm-user-info-form/small-views/DocusignExpiredView";
import { DocusignEmbedComponent } from "../../sqm-docusign-embed/sqm-docusign-embed";
import {
  DocusignIframe,
  DocusignStatus,
} from "./docusign-iframe/DocusignIframe";

/**
 * @uiName DocuSign Document Submission
 * @exampleGroup Tax and Cash Components
 * @slots [{"name": "docusign-iframe", "title": "DocuSign IFrame Slot"}]
 */
@Component({
  tag: "sqm-docusign-form",
  shadow: false,
})
export class DocusignForm {
  @Element() el;
  @State() ignored = true;
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = "Step 3 of 4";
  /**
   * Heading text shown at the top of the page
   * @uiName Tax form heading text
   */
  @Prop() taxForm: string = "Tax form";
  /**
   * Text shown at the top of the page next to the document type text
   * @uiName Tax form label text
   */
  @Prop() taxFormLabel: string = "{documentType} Tax Form";
  /**
   * Subtext shown at the top of the page next to the document type text
   * @uiName Tax form subtext
   */
  @Prop() taxFormDescription: string =
    "Participants based in the US need to submit a {documentType} form.";
  /**
   * Subtext shown at the top of the page next to the document type text for individual participants
   * @uiName Tax form subtext
   */
  @Prop() taxFormDescriptionIndividualParticipant: string =
    "Participants residing outside of the US, joining the referral program of a US-based company, need to submit a {documentType} form.";
  /**
   * Subtext shown at the top of the page next to the document type text for business entities
   * @uiName Tax form subtext
   */
  @Prop() taxFormDescriptionBusinessEntity: string =
    "Participants residing outside of the US who represent a business entity need to submit a {documentType} form.";
  /**
   * Text shown in the link to the form for non US residents
   * @uiName Not based in US link text
   */
  @Prop() notBasedInUS: string = "Not based in the US?";
  /**
   * Text shown in the banner above the document
   * @uiName Banner text
   */
  @Prop() banner: string =
    "For your security, we automatically end your session when you have not interacted with the form after 20 minutes.";
  /**
   * Heading text for the form submission checkbox
   * @uiName Form submission checkbox heading
   */
  @Prop() checkboxLabel: string = "Form submission";
  /**
   * Label text for the form submission checkbox
   * @uiName Form submission checkbox label
   */
  @Prop() checkboxDescription: string =
    "I have completed and submitted my tax form";
  /**
   * Text inside iframe when Docusign expires
   * @uiName Docusign expired text
   */
  @Prop() docusignExpired: string =
    "For your security and privacy, we automatically end your session after 20 minutes of inactivity. Please refresh and re-enter your tax information to continue.";
  /**
   * Text inside iframe when Docusign form is compelted
   * @uiName Docusign completed text
   */
  @Prop() docusignCompleted: string =
    "Your document has been completed and submitted.";
  /**
   * Heading text for the participant type radio buttons
   * @uiName Participant type radio buttons heading
   */
  @Prop() participantType: string = "Participant type";
  /**
   * Label text for the business entity radio button
   * @uiName Business entity radio button label
   */
  @Prop() businessEntity: string = "I represent a business";
  /**
   * Label text for the individual participant radio button
   * @uiName Individual participant radio button label
   */
  @Prop() individualParticipant: string = "I am an individual participant";
  /**
   * Text inside iframe when Docusign form throws error
   * @uiName Docusign error text
   */
  @Prop() docusignError: string =
    "There was a problem displaying this form. Please refresh the page. If this problem continues, contact Support.";
  /**
   * Text shown inside of refresh button
   * @uiName Refresh button text
   */
  @Prop() refreshButton: string = "Refresh Page";
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
   * The error message shown at the bottom of the page if the user has not checked the form submission checkbox
   *
   * @uiName Form submission error text
   */
  @Prop() formSubmissionError: string = "This field is required";
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseDocusignFormResult>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  getTextProps() {
    const props = getProps(this);

    return {
      ...props,
      error: {
        generalTitle: props.generalErrorTitle,
        generalDescription: props.generalErrorDescription,
        formSubmission: props.formSubmissionError,
        participantType: props.participantType,
      },
    };
  }

  render() {
    const props = isDemo() ? useDocusignFormDemo(this) : useDocusignForm(this);

    return (
      <Host>
        <DocusignFormView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
          slots={{
            docusignIframeSlot: (
              <DocusignIframe
                states={{
                  url: props.data.documentUrl,
                  status: props.states.docusignStatus,
                  loading: props.states.loading,
                }}
                callbacks={{
                  onStatusChange: props.callbacks.setDocusignStatus,
                }}
                text={props.text}
              />
            ),
          }}
        />
      </Host>
    );
  }
}

function useDocusignFormDemo(props: DocusignForm): UseDocusignFormResult {
  return deepmerge(
    {
      text: props.getTextProps(),
      states: {
        disabled: false,
        submitDisabled: false,
        loading: false,
        status: undefined as DocusignStatus,
        participantTypeDisabled: false,
        formState: {
          completedTaxForm: true,
          taxFormExpired: true,
          errors: {},
        },
        documentType: "W9",
        hideBackButton: false,
      },
      data: {
        taxForm: "W9",
        documentUrl: "https://example.com",
      },
      callbacks: {
        setParticipantType: (p) => console.log({ p }),
        setDocusignStatus: (status: DocusignStatus) => console.log(status),
        onSubmit: async () => {},
        toggleFormSubmitted: () => {},
        onBack: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
