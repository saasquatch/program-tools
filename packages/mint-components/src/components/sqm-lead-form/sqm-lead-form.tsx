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
   * @uiName Submit another form button label
   */
  @Prop() resubmitFormLabel: string = "Refer Another Friend";

  /**
   * @uiName Header text
   */
  @Prop()
  pageLabel: string = "Refer your friend";

  /**
   * Key of the form to connect to. Create and manage forms in the /advocate dashboard under Data > Forms.
   * @uiName Form key
   */
  @Prop() formKey: string = "lead-form";

  /**
   * Optional support link text for error messages.
   * @uiName Support link text
   */
  @Prop() supportLinkText: string = "Support";
  /**
   * Header text shown on successful lead submission.
   * @uiName Submit success header
   */
  @Prop() submitSuccessHeader: string = "Lead submitted";
  /**
   * Description text shown on successful lead submission.
   * @uiName Submit success description
   */
  @Prop() submitSuccessDescription: string =
    "Our team will contact your friend to see if they’re a good fit. In the meantime, you can track this referral on Activity page.";
  /**
   *  Header text shown if an error occurs.
   * @uiName Submit error header
   */
  @Prop() submitErrorHeader: string = "An error occurred while submitting";
  /**
   * Description text shown if an error occurs.
   * @uiName Submit error description
   */
  @Prop() submitErrorDescription: string =
    "Please try again later. If the problem continues, contact {supportLink}";

  /**
   * The message to be displayed if a required field is not filled.
   *
   * @uiName Required field message
   * @uiWidget textArea
   */
  @Prop() requiredFieldErrorMessage: string =
    "Please enter a valid {fieldLabel}";

  /**
   * The message to be displayed if a the form submission fails unexpectedly.
   *
   * @uiName Network error message
   * @uiWidget textArea
   */
  @Prop() networkErrorMessage: string = "Network request failed.";

  /**
   * The message to be displayed if the email used is invalid.
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
      resubmitFormLabel: this.resubmitFormLabel,
      pageLabel: this.pageLabel,
      supportLinkText: this.supportLinkText,
      submitSuccessHeader: this.submitSuccessHeader,
      submitSuccessDescription: this.submitSuccessDescription,
      submitErrorHeader: this.submitErrorHeader,
      submitErrorDescription: this.submitErrorDescription,
      invalidEmailErrorMessage: this.invalidEmailErrorMessage,
      requiredFieldErrorMessage: this.requiredFieldErrorMessage,
      firstNameLabel: this.firstNameLabel,
      lastNameLabel: this.lastNameLabel,
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
): Pick<LeadFormViewProps, "states" | "callbacks" | "content" | "refs"> {
  return deepmerge(
    {
      states: {
        error: "",
        loading: false,
        success: false,
      },
      callbacks: {
        submit: async (_event) => {
          console.log("submit");
        },
        inputFunction: () => {},
        resetForm: () => {},
      },
      refs: {
        formRef: {},
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
