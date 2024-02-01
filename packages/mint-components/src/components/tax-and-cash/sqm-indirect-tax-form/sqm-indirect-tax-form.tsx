import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Host, Prop, h } from "@stencil/core";
import { getProps } from "../../../utils/utils";
import {
  indirectDetailsSlotText,
  indirectTaxFormText,
} from "../sqm-user-info-form/defaultTextCopy";
import {
  IndirectDetailsSlotView,
  OtherRegionSlotView,
} from "../sqm-user-info-form/small-views/IndirectTaxDetailsView";
import {
  IndirectTaxFormView,
  IndirectTaxFormViewProps,
} from "./sqm-indirect-tax-form-view";
import { useIndirectTaxForm } from "./useIndirectTaxForm";
import { DemoData } from "../../../global/demo";
import deepmerge from "deepmerge";
import { useState } from "@saasquatch/universal-hooks";
import { isDemo } from "@saasquatch/component-boilerplate";

@Component({
  tag: "sqm-indirect-tax-form",
  shadow: true,
})
export class IndirectTaxForm {
  /**
   * Sub text shown at the top of the page, used to show the current step of the tax form.
   * @uiName Indirect tax form step text
   */
  @Prop() formStep: string = indirectTaxFormText.formStep;
  /**
   * Heading text shown at the top of the page
   * @uiName Indirect tax heading text
   */
  @Prop() indirectTax: string = indirectTaxFormText.indirectTax;
  /**
   * Subtext shown at the top of the page
   * @uiName Indirect tax sub text
   */
  @Prop() indirectTaxDescription: string =
    indirectTaxFormText.indirectTaxDescription;
  /**
   * Heading text shown above the tax details radio buttons
   * @uiName Indirect tax details heading
   */
  @Prop() indirectTaxDetails: string = indirectTaxFormText.indirectTaxDetails;
  /**
   * Sub text shown above the tax details radio buttons
   * @uiName Indirect tax details sub text
   */
  @Prop() indirectTaxDetailsDescription: string =
    indirectTaxFormText.indirectTaxDetailsDescription;
  /**
   * Label text for the HST Canada radio button
   * @uiName HST Canada radio button label
   */
  @Prop() hstCanada: string = indirectTaxFormText.hstCanada;
  /**
   * Label text for the other region radio button
   * @uiName Other region radio button label
   */
  @Prop() otherRegion: string = indirectTaxFormText.otherRegion;
  /**
   * Label text for the not registered radio button
   * @uiName Not registered radio button label
   */
  @Prop() notRegistered: string = indirectTaxFormText.notRegistered;
  /**
   * Text shown inside of submit button
   * @uiName Submit button text
   */
  @Prop() submitButton: string = indirectTaxFormText.submitButton;
  /**
   * Text shown inside of back button
   * @uiName Back button text
   */
  @Prop() backButton: string = indirectTaxFormText.backButton;
  /**
   * Error text shown below the tax details radio buttons
   * @uiName Indirect tax details error text
   */
  @Prop() taxDetailsError: string = indirectTaxFormText.error.taxDetails;
  /**
   * The title for error message shown at the top of the page in an error banner
   *
   * @uiName General error title
   */
  @Prop() generalErrorTitle: string = indirectTaxFormText.error.generalTitle;
  /**
   * The error message shown at the top of the page in an error banner
   *
   * @uiName General error text
   */
  @Prop() generalErrorDescription: string =
    indirectTaxFormText.error.generalDescription;

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
    const props = isDemo()
      ? useDemoIndirectTaxForm(getProps(this))
      : useIndirectTaxForm(getProps(this));

    const registeredIn =
      props.option === "hstCanada"
        ? "canada"
        : props.option === "otherRegion"
        ? "otherRegion"
        : null;

    console.log({ props });

    const hstSlot = (
      <IndirectDetailsSlotView
        states={{
          formState: {
            registeredIn,
            errors: props.errors,
          },
          loading: props.loading,
          hide: props.option !== "hstCanada",
        }}
        data={{ countries: props.countries }}
        text={indirectDetailsSlotText}
      ></IndirectDetailsSlotView>
    );

    const otherRegionSlot = (
      <OtherRegionSlotView
        states={{
          hide: props.option !== "otherRegion",
          formState: {
            registeredIn,
            countryCode: props.countryCode,
            errors: props.errors,
          },
          loading: props.loading,
        }}
        data={{ countries: props.countries }}
        text={indirectDetailsSlotText}
      />
    );

    return (
      <Host>
        <IndirectTaxFormView
          callbacks={{
            onBack: props.onBack,
            onChange: props.onChange,
            onSubmit: props.onSubmit,
          }}
          states={{
            formState: { checked: props.option },
            loading: props.loading,
            registeredInCanadaDetailsSlot: hstSlot,
            registeredInDifferentCountryDetailsSlot: otherRegionSlot,
            disabled: props.loading,
          }}
          //@ts-ignore
          text={props.text}
          refs={{ formRef: props.formRef }}
        />
      </Host>
    );
  }
}

function useDemoIndirectTaxForm(
  props: IndirectTaxForm
): ReturnType<typeof useIndirectTaxForm> {
  const [option, setOption] = useState(null);
  //@ts-ignore
  return deepmerge(
    {
      loading: false,
      countries: [{ countryCode: "CA", displayName: "Canada" }],
      text: {
        ...props,
        error: {
          generalTitle: props.generalErrorTitle,
          generalDescription: props.generalErrorDescription,
          taxDetails: props.taxDetailsError,
        },
      },
      errors: {},
      onBack: () => {},
      onSubmit: async () => {},
      submitDisabled: false,
      option: option,
      onChange: setOption,
      formRef: { current: null },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
