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

  @Prop() formStep: string = docusignFormText.formStep;
  @Prop() taxForm: string = docusignFormText.taxForm;
  @Prop() taxFormLabel: string = docusignFormText.taxFormLabel;
  @Prop() taxFormDescription: string = docusignFormText.taxFormDescription;
  @Prop() notBasedInUS: string = docusignFormText.notBasedInUS;
  @Prop() banner: string = docusignFormText.banner;
  @Prop() checkboxLabel: string = docusignFormText.checkboxLabel;
  @Prop() checkboxDescription: string = docusignFormText.checkboxDescription;
  @Prop() submitButton: string = docusignFormText.submitButton;
  @Prop() backButton: string = docusignFormText.backButton;
  @Prop() generalErrorTitle: string = docusignFormText.error.generalTitle;
  @Prop() generalErrorDescription: string =
    docusignFormText.error.generalDescription;
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
