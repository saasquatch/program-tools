import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    formState: {
      registeredIn: "canada" | "otherRegion";
      selectedRegion?: string;
      vatNumber?: number;
      province?: string;
      indirectTaxNumber?: number;
      errors?: any;
      error?: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
  };
  text: {
    selectedRegion?: string;
    vatNumber?: string;
    province?: string;
    indirectTaxNumber?: string;
  };
}

const style = {
  Container: {
    width: "100%",
  },
  InputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
  },
  HR: {
    border: "1px solid #E0E0E0",
    margin: "10px 0",
  },
  Input: {
    maxWidth: "500px",
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
      <hr class={classes.HR} />
      <div class={classes.InputContainer}>
        {formState.registeredIn === "otherRegion" ? (
          <sl-select
            class={classes.Input}
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
        ) : (
          <sl-select
            exportparts="label: input-label"
            class={classes.Input}
            value={formState.province}
            label={text.province}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            // {...(formState.errors?.province &&
            // formState.errors?.province.status !== "valid"
            //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
            //   : [])}
            id="province"
            name="/province"
            error={
              formState.errors?.province &&
              formState.errors?.province.status !== "valid"
                ? formState.errors?.province.message
                : undefined
            }
          >
            <sl-option value="option-1">Canada</sl-option>
            <sl-option value="option-2">United Kingdom</sl-option>
          </sl-select>
        )}
        {formState.registeredIn === "otherRegion" ? (
          <sl-input
            exportparts="label: input-label"
            class={classes.Input}
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
        ) : (
          <sl-input
            exportparts="label: input-label"
            class={classes.Input}
            value={formState.indirectTaxNumber}
            label={text.indirectTaxNumber}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            // {...(formState.errors?.indirectTaxNumber &&
            // formState.errors?.indirectTaxNumber.status !== "valid"
            //   ? { class: "errors?tyles", helpText: "Cannot be empty" }
            //   : [])}
            id="indirectTaxNumber"
            name="/indirectTaxNumber"
            error={
              formState.errors?.indirectTaxNumber &&
              formState.errors?.indirectTaxNumber.status !== "valid"
                ? formState.errors?.indirectTaxNumber.message
                : undefined
            }
          />
        )}
      </div>
      <hr class={classes.HR} />
    </form>
  );
};
