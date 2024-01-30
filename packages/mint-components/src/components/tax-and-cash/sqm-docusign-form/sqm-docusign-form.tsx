import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { IndirectTaxFormViewProps } from "../sqm-indirect-tax-form/sqm-indirect-tax-form-view";
import { useDocusignForm } from "./useDocusignForm";
import { DocusignFormView } from "./sqm-docusign-form-view";
import { docusignFormText } from "../sqm-user-info-form/defaultTextCopy";

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

  @Prop() step: string = docusignFormText.step;
  @Prop() stepOf: string = docusignFormText.stepOf;
  @Prop() taxForm: string = docusignFormText.taxForm;
  @Prop() taxFormLabel: string = docusignFormText.taxFormLabel;
  @Prop() taxFormDescription: string = docusignFormText.taxFormDescription;
  @Prop() notBasedInUS: string = docusignFormText.notBasedInUS;
  @Prop() banner: string = docusignFormText.banner;
  @Prop() checkboxLabel: string = docusignFormText.checkboxLabel;
  @Prop() checkboxDescription: string = docusignFormText.checkboxDescription;
  @Prop() submitButton: string = docusignFormText.submitButton;
  @Prop() backButton: string = docusignFormText.backButton;
  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<IndirectTaxFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    // const props = isDemo() ? useUserNameDemo(this) : useUserName();
    const props = useDocusignForm(getProps(this), this.el);

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

function useTaxAndCashDemo(props) {
  return deepmerge({}, props.demoData || {}, { arrayMerge: (_, a) => a });
}
