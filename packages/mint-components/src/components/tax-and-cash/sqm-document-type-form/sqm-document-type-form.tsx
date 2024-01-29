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
  @Prop() taxForm: string = "Tax Form";
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
        // @ts-ignore TODO: fix this
        text={props.text}
      />
    );
  }
}
