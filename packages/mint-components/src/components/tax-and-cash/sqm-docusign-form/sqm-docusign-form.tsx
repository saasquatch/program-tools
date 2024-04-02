import { isDemo, useParent } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Element, h, Host, Prop, State } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../../global/demo";
import { getProps } from "../../../utils/utils";
import { TAX_CONTEXT_NAMESPACE } from "../sqm-tax-and-cash/data";
import {
  DocusignIframe,
  DocusignStatus,
} from "./docusign-iframe/DocusignIframe";
import { DocusignFormView } from "./sqm-docusign-form-view";
import { useDocusignForm, UseDocusignFormResult } from "./useDocusignForm";

/**
 * @uiName DocuSign Document Submission
 * @exampleGroup Tax and Cash Components
 * @slots [{"name": "docusign-iframe", "title": "DocuSign IFrame Slot"}]
 */
@Component({
  tag: "sqm-docusign-form",
  shadow: false,
})
export class DocusignForm {
  @Element() el;
  @State() ignored = true;
  /**
   * @uiName Setup progress
   */
  @Prop() formStep: string = "Step {step} of {count}";
  /**
   * @uiName Step 3 title
   */
  @Prop() taxForm: string = "Tax form";
  /**
   * Display the type of tax form that the participant must submit.
   * @uiName Tax form name
   */
  @Prop() taxFormLabel: string = "{documentType} Tax Form";
  /**
   * Displayed at the top of the page to participants based in the US.
   * @uiName W-9 tax form description
   * @uiWidget textArea
   */
  @Prop() taxFormDescription: string =
    "Participants based in the US need to submit a {documentType} form.";
  /**
   * Displayed at the top of the page to individuals joining a US program who reside outside the country.
   * @uiName W-8 BEN tax form description
   * @uiWidget textArea
   */
  @Prop() taxFormDescriptionIndividualParticipant: string =
    "Participants residing outside of the US, joining the referral program of a US-based company, need to submit a {documentType} form.";
  /**
   * Displayed at the top of the page to participants representing a business.
   * @uiName W-8 BEN-E tax form description
   * @uiWidget textArea
   */
  @Prop() taxFormDescriptionBusinessEntity: string =
    "Participants residing outside of the US who represent a business entity need to submit a {documentType} form.";
  /**
   * This appears inside the Docusign frame.
   * @uiName Docusign session expired messag
   * @uiWidget textArea
   */
  @Prop() docusignExpired: string =
    "For your security and privacy, we automatically end your session after 20 minutes of inactivity. Please refresh and re-enter your tax information to continue.";
  /**
   * Remind participants their session will time out after 20 minutes of inactivity.
   * @uiName Docusign timed session message
   * @uiWidget textArea
   */
  @Prop() docusignSessionWarning: string =
    "For your security, we automatically end your session when you have not interacted with the form after 20 minutes.";
  /**
   * @uiName Participant type field label
   */
  @Prop() participantType: string = "Participant type";
  /**
   * An option for the participant type field. Used to determine which W-8 form is required.
   * @uiName Business representative participant type label
   */
  @Prop() businessEntity: string = "I represent a business";
  /**
   * An option for the participant type field. Used to determine which W-8 form is required.
   * @uiName Individual participant type label
   */
  @Prop() individualParticipant: string = "I am an individual participant";
  /**
   * This appears inside the Docusign frame.
   * @uiName Docusign form error message
   * @uiWidget textArea
   */
  @Prop() docusignError: string =
    "There was a problem displaying this form. Please refresh the page. If this problem continues, contact Support.";
  /**
   * @uiName Refresh page button label
   */
  @Prop() refreshButton: string = "Refresh Page";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message title
   * @uiWidget textArea
   */
  @Prop() generalErrorTitle: string =
    "There was a problem submitting your information";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Form submission error message description
   * @uiWidget textArea
   */
  @Prop() generalErrorDescription: string =
    "Please review your information and try again. If this problem continues, contact Support.";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message title
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertHeader: string =
    "There was a problem loading your form";
  /**
   * Part of the alert displayed at the top of the page.
   * @uiName Page load error message description
   * @uiWidget textArea
   */
  @Prop() loadingErrorAlertDescription: string =
    "Please refresh the page and try again. If this problem continues, contact Support.";

  /**
   * Displayed at the top of the page on all set up steps.
   * @uiName Page description
   */
  @Prop() taxAndPayoutsDescription: string =
    "Submit your tax documents and add your banking information to receive your rewards.";

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<UseDocusignFormResult>;

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
        participantType: props.participantType,
        loadingErrorAlertHeader: props.loadingErrorAlertHeader,
        loadingErrorAlertDescription: props.loadingErrorAlertDescription,
      },
    };
  }

  render() {
    const _isDemo = isDemo();
    const props = _isDemo ? useDocusignFormDemo(this) : useDocusignForm(this);

    const docusignIframeSlot = (
      <DocusignIframe
        states={{
          url: props.data.documentUrl,
          status: props.states.docusignStatus,
          loading: props.states.loading,
          urlLoading: props.states.urlLoading,
        }}
        callbacks={{
          onStatusChange: props.callbacks.setDocusignStatus,
        }}
        text={props.text}
      />
    );

    return (
      <Host>
        <DocusignFormView
          callbacks={props.callbacks}
          states={props.states}
          text={props.text}
          slots={{
            docusignIframeSlot: _isDemo
              ? DemoDocusignIframe({ callbacks: props.callbacks })
              : docusignIframeSlot,
          }}
        />
      </Host>
    );
  }
}

function useDocusignFormDemo(props: DocusignForm): UseDocusignFormResult {
  const [step, setStep] = useParent(TAX_CONTEXT_NAMESPACE);

  return deepmerge(
    {
      text: props.getTextProps(),
      states: {
        step: "4",
        disabled: false,
        submitDisabled: false,
        loading: false,
        status: undefined as DocusignStatus,
        loadingError: false,
        participantTypeDisabled: false,
        formState: {
          completedTaxForm: true,
          taxFormExpired: true,
          errors: {},
        },
        documentType: "W9",
      },
      data: {
        taxForm: "W9",
        documentUrl: "https://example.com",
      },
      callbacks: {
        // @ts-expect-error: Demo only props
        demo: {
          onSubmit: () => setStep("/4"),
          onBack: () => setStep("/3"),
        },
        setParticipantType: (p) => console.log({ p }),
        setDocusignStatus: (status: DocusignStatus) => console.log(status),
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}

const DemoDocusignIframe = ({ callbacks }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        background: "#fafafa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <span>Placeholder for docusign iframe</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <sl-button
            type="primary"
            submit
            exportparts="base: primarybutton-base"
            onClick={callbacks.demo.onBack}
          >
            Back to Step 2
          </sl-button>
          <sl-button
            type="primary"
            submit
            exportparts="base: primarybutton-base"
            onClick={callbacks.demo.onSubmit}
          >
            Continue to Step 4
          </sl-button>
        </div>
      </div>
    </div>
  );
};
