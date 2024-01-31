import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import {
  DocumentTypeFormView,
  DocumentTypeFormViewProps,
} from "./sqm-document-type-form-view";
import { getProps } from "../../../utils/utils";
import { useDocumentTypeForm } from "./useDocumentTypeForm";
import { documentTypeFormText } from "../sqm-user-info-form/defaultTextCopy";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { isDemo } from "@saasquatch/component-boilerplate";

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
  @Prop() generalErrorTitle: string = documentTypeFormText.error.generalTitle;
  @Prop() generalErrorDescription: string =
    documentTypeFormText.error.generalDescription;

  @Prop() demoData: DemoData<DocumentTypeFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const props = isDemo()
      ? useDemoDocumentTypeForm(getProps(this))
      : useDocumentTypeForm(getProps(this));

    return (
      <DocumentTypeFormView
        callbacks={props.callbacks}
        states={props.states}
        text={props.text}
      />
    );
  }
}

function useDemoDocumentTypeForm(
  props: DocumentTypeForm
): DocumentTypeFormViewProps {
  return deepmerge(
    {
      callbacks: {
        onSubmit: () => {},
        onBack: () => {},
      },
      states: {
        loading: false,
        disabled: false,
        formState: {
          formSubmission: false,
          selectedTaxForm: "w9" as const,
          errors: {},
        },
      },
      text: {
        ...props,
        error: {
          formSubmission: props.formSubmissionError,
          generalTitle: props.generalErrorTitle,
          generalDescription: props.generalErrorDescription,
        },
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
