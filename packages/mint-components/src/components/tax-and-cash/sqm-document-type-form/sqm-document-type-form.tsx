import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { DocumentTypeFormView } from "./sqm-document-type-form-view";
import { getProps } from "../../../utils/utils";
import { useDocumentTypeForm } from "./useDocumentTypeForm";

@Component({
  tag: "sqm-document-type-form",
  shadow: true,
})
export class DocumentTypeForm {
  @Prop() step: string = "Step";
  @Prop() stepOf: string = "of";
  @Prop() formLabel: string = "TODO: Form";
  @Prop() taxForm: string = "Tax Form";
  @Prop() w9Label: string = "W9";
  @Prop() w9Description: string = "TODO: ";
  @Prop() w8Label: string = "W8-BEN";
  @Prop() w8Description: string = "TODO: ";
  @Prop() w8ELabel: string = "W8-BEN-E";
  @Prop() w8EDescription: string = "TODO: ";
  @Prop() submitButton: string = "Submit";
  @Prop() backButton: string = "Back";
  @Prop() formSubmissionError: string = "Could not submit form";

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
