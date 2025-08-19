import { isDemo, navigation } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import { LeadFormView, LeadFormViewProps } from "./sqm-lead-form-view";
import { useLeadForm } from "./useLeadForm";

/**
 * @uiName Lead Form
 * @slots [{"name":"formData","title":"Additional Fields"},{"name":"terms","title":"Terms And Conditions Fields"}]
 */
@Component({
  tag: "sqm-lead-form",
  shadow: true,
})
export class LeadForm {
  @State()
  ignored = true;

  /**
   * Redirect participants to this page from their verification email
   *
   * @uiName Submission redirect
   * @uiWidget pageSelect
   */
  @Prop()
  nextPage: string = "/";

  /**
   * @uiName Email field label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName First Name field label
   */
  @Prop()
  firstNameLabel: string = "First Name";

  /**
   * @uiName Last Name field label
   */
  @Prop()
  lastNameLabel: string = "Last Name";

  /**
   * @uiName Submit button text
   */
  @Prop()
  submitLabel: string = "Submit";

  /**
   * @uiName Header text
   */
  @Prop()
  pageLabel: string = "Submit your information";

  @Prop() formKey: string = "lead-form";

  /**
   * The message to be displayed when a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string = "Cannot be empty";

  /**
   * The message to be displayed when a the form submission fails unexpectedly.
   *
   * @uiName Network error message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

  /**
   * The message to be displayed when the email used is invalid or blocked.
   *
   * @uiName Invalid email message
   * @uiWidget textArea
   */
  @Prop() invalidEmailErrorMessage: string = "Must be a valid email address";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<LeadFormViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks, refs } = isDemo()
      ? useRegisterDemo(this)
      : useLeadForm(this);
    const content = {
      formData: <slot name="formData"></slot>,
      emailLabel: this.emailLabel,
      submitLabel: this.submitLabel,
      pageLabel: this.pageLabel,
      invalidEmailErrorMessage: this.invalidEmailErrorMessage,
      requiredFieldErrorMessage: this.requiredFieldErrorMessage,
    };

    return (
      <LeadFormView
        states={states}
        callbacks={callbacks}
        content={content}
        refs={refs}
      ></LeadFormView>
    );
  }
}
function useRegisterDemo(
  props: LeadForm
): Pick<LeadFormViewProps, "states" | "callbacks" | "refs"> {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
      },
      callbacks: {
        submit: async (_event) => {
          console.log("submit");
        },
        inputFunction: () => {},
      },
      refs: {
        formRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
