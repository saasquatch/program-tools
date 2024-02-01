import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { IndirectTaxFormViewProps } from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import { useDocusignForm } from "./useDocusignForm";
import {
  DocusignFormView,
  DocusignFormViewProps,
} from "./sqm-docusign-form-view";
import { docusignFormText } from "../sqm-user-info-form/defaultTextCopy";
import { isDemo } from "@saasquatch/component-boilerplate";

/**
 * @uiName Tax And Cash
 * @exampleGroup Common Components
 * @example User Name Display - <sqm-user-name fallback="Anonymous User" loading-text="..."></sqm-user-name>
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
  @Prop() formStep: string = docusignFormText.formStep;
  /**
   * Heading text shown at the top of the page
   * @uiName Tax form heading text
   */
  @Prop() taxForm: string = docusignFormText.taxForm;
  /**
   * Text shown at the top of the page next to the document type text
   * @uiName Tax form label text
   */
  @Prop() taxFormLabel: string = docusignFormText.taxFormLabel;
  /**
   * Subtext shown at the top of the page next to the document type text
   * @uiName Tax form subtext
   */
  @Prop() taxFormDescription: string = docusignFormText.taxFormDescription;
  /**
   * Text shown in the link to the form for non US residents
   * @uiName Not based in US link text
   */
  @Prop() notBasedInUS: string = docusignFormText.notBasedInUS;
  /**
   * Text shown in the banner above the document
   * @uiName Banner text
   */
  @Prop() banner: string = docusignFormText.banner;
  /**
   * Heading text for the form submission checkbox
   * @uiName Form submission checkbox heading
   */
  @Prop() checkboxLabel: string = docusignFormText.checkboxLabel;
  /**
   * Label text for the form submission checkbox
   * @uiName Form submission checkbox label
   */
  @Prop() checkboxDescription: string = docusignFormText.checkboxDescription;
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = docusignFormText.submitButton;
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() backButton: string = docusignFormText.backButton;
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string = docusignFormText.error.generalTitle;
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    docusignFormText.error.generalDescription;
  /**
   * The error message shown at the bottom of the page if the user has not checked the form submission checkbox
   *
   * @uiName Form submission error text
   */
  @Prop() formSubmissionError: string = docusignFormText.error.formSubmission;
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<DocusignFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDocusignFormDemo(getProps(this))
      : useDocusignForm(getProps(this), this.el);

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

function useDocusignFormDemo(
  props: DocusignForm
): Partial<DocusignFormViewProps> {
  return deepmerge(
    {
      text: {
        ...props,
        error: {
          generalTitle: props.generalErrorTitle,
          generalDescription: props.generalErrorDescription,
        },
      },
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
        onSubmit: () => {},
        toggleFormSubmitted: () => {},
        onBack: () => {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
