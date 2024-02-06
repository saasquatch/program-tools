import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import {
  DocumentTypeFormView,
  DocumentTypeFormViewProps,
} from "./sqm-document-type-form-view";
import {
  UseDocumentTypeFormResult,
  useDocumentTypeForm,
} from "./useDocumentTypeForm";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { useParent } from "../../../utils/useParentState";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import { isDemo } from "@saasquatch/component-boilerplate";

@Component({
  tag: "sqm-document-type-form",
  shadow: true,
})
export class DocumentTypeForm {
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Tax form step text
   */
  @Prop() formStep: string = "Step 3 of 4";
  /**
   * Sub text shown above form selection radio buttons
   * @uiName Tax form selection heading text
   */
  @Prop() formLabel: string = "Select a tax form";
  /**
   * Heading text shown at the top of the top of page
   * @uiName Tax form heading text
   */
  @Prop() taxForm: string = "Tax form";
  /**
   * Label text for the W9 radio button
   * @uiName W9 radio button label
   */
  @Prop() w9Label: string = "W9";
  /**
   * Subtext for the W9 radio button
   * @uiName W9 radio button subtext
   */
  @Prop() w9Description: string =
    "W9 For participants based in the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8 radio button
   * @uiName W8 radio button label
   */
  @Prop() w8Label: string = "W8-Ben";
  /**
   * Subtext for the W8 radio button
   * @uiName W8 radio button subtext
   */
  @Prop() w8Description: string =
    "W8-BEN For individuals residing outside of the US, joining the referral program of a US-based company.";
  /**
   * Label text for the W8E radio button
   * @uiName W8E radio button label
   */
  @Prop() w8ELabel: string = "W8-BEN-E";
  /**
   * Subtext for the W8E radio button
   * @uiName W8E radio button subtext
   */
  @Prop() w8EDescription: string =
    "W8-BEN-E For participants residing outside of the US who represent a business entity, joining the referral program of a US-based company.";
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
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseDocumentTypeFormResult>;

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
      },
    };
  }

  render() {
    const props = isDemo()
      ? useDemoDocumentTypeForm(this)
      : useDocumentTypeForm(this);

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
): UseDocumentTypeFormResult {
  const [_, setPath] = useParent(TAX_CONTEXT_NAMESPACE);

  return deepmerge(
    {
      text: props.getTextProps(),
      callbacks: {
        onSubmit: async () => {},
        onBack: () => setPath("/2"),
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
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
