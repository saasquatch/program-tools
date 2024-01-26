import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

export interface TaxFormSelectionSlotViewProps {
  states: {
    loading: boolean;
    formState: {
      selectedTaxForm: "w9" | "w8-ben" | "w8-ben-e" | undefined;
      errors?: any;
    };
  };
  callbacks: {
    onChange: (e) => void;
  };
  text: {};
}

const style = {
  Container: {
    width: "100%",
  },
  RadioContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
  },
  DescriptionText: {
    color: "var(--sl-color-neutral-500)",
    lineHeight: "22px",
  },
  BoldText: {
    fontWeight: "bold",
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }

    sl-radio::part(base) {
        align-items: flex-start;
    }
    sl-radio::part(label) {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 600px;
    }
  `;

export const TaxFormSelectionSlotView = (
  props: TaxFormSelectionSlotViewProps
) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <form class={classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>

      <p class={classes.BoldText}>Select a tax form</p>

      <sl-radio-group value={formState.selectedTaxForm}>
        <div class={classes.RadioContainer}>
          <sl-radio value="w9">
            <p class={classes.BoldText}>W9</p>
            <p class={classes.DescriptionText}>
              W9 For participants based in the US, joining the referral program
              of a US-based company.
            </p>
          </sl-radio>
          <sl-radio value="w8-ben">
            <p class={classes.BoldText}> W8-BEN</p>
            <p class={classes.DescriptionText}>
              W8-BEN For individuals residing outside of the US, joining the
              referral program of a US-based company.
            </p>
          </sl-radio>
          <sl-radio value="w8-ben-e">
            <p class={classes.BoldText}>W8-BEN-E</p>
            <p class={classes.DescriptionText}>
              W8-BEN-E For participants residing outside of the US who represent
              a business entity, joining the referral program of a US-based
              company.
            </p>
          </sl-radio>
        </div>
      </sl-radio-group>
    </form>
  );
};
