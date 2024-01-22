import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    formState: {
      selectedRegion: string;
      vatNumber: number;
      errors?: any;
      error?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
  };
  text: {
    selectedRegion: string;
    vatNumber: string;
  };
}

const style = {
  Container: {},
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

const vanillaStyle = `
    :host{
      display: block;   
    }
    * {
        p {
            margin: 0;
        }
    }
  `;

export const IndirectDetailsSlotView = (
  props: IndirectDetailsSlotViewProps
) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  const { classes } = sheet;

  return (
    <form class={classes.Container} onSubmit={callbacks.onSubmit}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <hr />
      <sl-select
        exportparts="label: input-label"
        value={formState.selectedRegion}
        label={text.selectedRegion}
        disabled={states.loading}
        // Copied from edit form, may need to keep
        // {...(formState.errors?.selectedRegion &&
        // formState.errors?.selectedRegion.status !== "valid"
        //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
        //   : [])}
        id="selectedRegion"
        name="/selectedRegion"
        error={
          formState.errors?.selectedRegion &&
          formState.errors?.selectedRegion.status !== "valid"
            ? formState.errors?.selectedRegion.message
            : undefined
        }
      >
        <sl-option value="option-1">Canada</sl-option>
        <sl-option value="option-2">United Kingdom</sl-option>
      </sl-select>
      <sl-input
        exportparts="label: input-label"
        value={formState.vatNumber}
        label={text.vatNumber}
        disabled={states.loading}
        // Copied from edit form, may need to keep
        // {...(formState.errors?.vatNumber &&
        // formState.errors?.vatNumber.status !== "valid"
        //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
        //   : [])}
        id="vatNumber"
        name="/vatNumber"
        error={
          formState.errors?.vatNumber &&
          formState.errors?.vatNumber.status !== "valid"
            ? formState.errors?.vatNumber.message
            : undefined
        }
      />
      <hr />
    </form>
  );
};
