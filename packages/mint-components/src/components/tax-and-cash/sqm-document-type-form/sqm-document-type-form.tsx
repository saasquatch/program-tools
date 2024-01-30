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
  @Prop() formStep: string = documentTypeFormText.formStep;
  @Prop() formLabel: string = documentTypeFormText.formLabel;
  @Prop() taxForm: string = documentTypeFormText.taxForm;
  @Prop() w9Label: string = documentTypeFormText.w9Label;
  @Prop() w9Description: string = documentTypeFormText.w9Description;
  @Prop() w8Label: string = documentTypeFormText.w8Label;
  @Prop() w8Description: string = documentTypeFormText.w8Description;
  @Prop() w8ELabel: string = documentTypeFormText.w8ELabel;
  @Prop() w8EDescription: string = documentTypeFormText.w8EDescription;
  @Prop() submitButton: string = documentTypeFormText.submitButton;
  @Prop() backButton: string = documentTypeFormText.backButton;
  @Prop() formSubmissionError: string =
    documentTypeFormText.error.formSubmission;

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
        // @ts-ignore TODO: fix this
        text={props.text}
      />
    );
  }
}
