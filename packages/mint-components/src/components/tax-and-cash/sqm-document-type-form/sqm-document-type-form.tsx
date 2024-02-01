import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { DocumentTypeFormView } from "./sqm-document-type-form-view";
import { getProps } from "../../../utils/utils";
import { useDocumentTypeForm } from "./useDocumentTypeForm";
import { documentTypeFormText } from "../sqm-user-info-form/defaultTextCopy";

@Component({
  tag: "sqm-document-type-form",
  shadow: true,
})
export class DocumentTypeForm {
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = documentTypeFormText.formStep;
  /**
   * Sub text shown above form selection radio buttons
   * @uiName Tax form selection heading text
   */
  @Prop() formLabel: string = documentTypeFormText.formLabel;
  /**
   * Heading text shown at the top of the top of page
   * @uiName Tax form heading text
   */
  @Prop() taxForm: string = documentTypeFormText.taxForm;
  /**
   * Label text for the W9 radio button
   * @uiName W9 radio button label
   */
  @Prop() w9Label: string = documentTypeFormText.w9Label;
  /**
   * Subtext for the W9 radio button
   * @uiName W9 radio button subtext
   */
  @Prop() w9Description: string = documentTypeFormText.w9Description;
  /**
   * Label text for the W8 radio button
   * @uiName W8 radio button label
   */
  @Prop() w8Label: string = documentTypeFormText.w8Label;
  /**
   * Subtext for the W8 radio button
   * @uiName W8 radio button subtext
   */
  @Prop() w8Description: string = documentTypeFormText.w8Description;
  /**
   * Label text for the W8E radio button
   * @uiName W8E radio button label
   */
  @Prop() w8ELabel: string = documentTypeFormText.w8ELabel;
  /**
   * Subtext for the W8E radio button
   * @uiName W8E radio button subtext
   */
  @Prop() w8EDescription: string = documentTypeFormText.w8EDescription;
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = documentTypeFormText.submitButton;
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() backButton: string = documentTypeFormText.backButton;
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string = documentTypeFormText.error.generalTitle;
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    documentTypeFormText.error.generalDescription;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = useDocumentTypeForm(getProps(this));
    console.log("3b");
    return (
      <DocumentTypeFormView
        callbacks={props.callbacks}
        states={props.states}
        text={props.text}
      />
    );
  }
}
