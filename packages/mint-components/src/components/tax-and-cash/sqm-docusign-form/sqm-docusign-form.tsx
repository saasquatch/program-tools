import { isDemo } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import {
  DocusignFormView,
  DocusignFormViewProps,
} from "./sqm-docusign-form-view";
import { useDocusignForm, UseDocusignFormResult } from "./useDocusignForm";

/**
 * @uiName DocuSign Document Submission
 * @exampleGroup Tax and Cash Components
 * @slots [{name:"docusign-iframe", title: "DocuSign IFrame Slot"}]
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
    "Participants based in the US and partnering with US-based brands need to submit a {documentType} form.";
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
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = "Continue";
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
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDocusignFormDemo(this)
      : useDocusignForm(this, this.el);

    console.log(props);

    return (
      <Host>
        <DocusignFormView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
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
        formState: {
          completedTaxForm: true,
          errors: {},
        },
        documentType: "W9",
      },
      data: {
        taxForm: "W9",
        documentUrl: "https://example.com",
      },
      callbacks: {
        onShowDocumentType: () => {},
        onSubmit: async () => {},
        toggleFormSubmitted: () => {},
        onBack: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
