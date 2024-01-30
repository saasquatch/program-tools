import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";
import { formatDisplayName } from "@formatjs/intl";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    hide: boolean;
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
  data: {
    countries: {
      countryCode: string;
      displayName: string;
    }[];
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
    text,
  } = props;

  const { classes } = sheet;

  return (
    <div style={states.hide ? { display: "none" } : {}}>
      <form class={classes.Container}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <hr class={classes.HR} />
        <div class={classes.InputContainer}>
          <sl-select
            required
            class={classes.Input}
            exportparts="label: input-label"
            // value={formState.selectedRegion}
            label={text.selectedRegion}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            {...(formState.errors?.selectedRegion &&
            formState.errors?.selectedRegion.status !== "valid"
              ? { class: "errors?tyles", helpText: "Cannot be empty" }
              : [])}
            id="selectedRegion"
            name="/selectedRegion"
            error={
              formState.errors?.selectedRegion &&
              formState.errors?.selectedRegion.status !== "valid"
                ? formState.errors?.selectedRegion.message
                : undefined
            }
          >
            {props.data.countries?.map((c) => (
              <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
            ))}
          </sl-select>
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            // value={formState.vatNumber}
            label={text.vatNumber}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            {...(formState.errors?.vatNumber &&
            formState.errors?.vatNumber.status !== "valid"
              ? { class: "errors?tyles", helpText: "Cannot be empty" }
              : [])}
            id="vatNumber"
            name="/vatNumber"
            error={
              formState.errors?.vatNumber &&
              formState.errors?.vatNumber.status !== "valid"
                ? formState.errors?.vatNumber.message
                : undefined
            }
          />
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};

export const OtherRegionSlotView = (props: IndirectDetailsSlotViewProps) => {
  const {
    states,
    states: { formState },
    text,
  } = props;

  const { classes } = sheet;

  return (
    <div style={states.hide ? { display: "none" } : {}}>
      <form class={classes.Container}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <hr class={classes.HR} />
        <div class={classes.InputContainer}>
          <sl-select
            required
            onSl-hide={() => {
              const event = new Event("sl-after-hide");
              dispatchEvent(event);
            }}
            onSl-after-hide={() => console.log("after hide")}
            exportparts="label: input-label"
            class={classes.Input}
            // value={formState.province}
            label={text.province}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            {...(formState.errors?.province &&
            formState.errors?.province.status !== "valid"
              ? { class: "errors?tyles", helpText: "Cannot be empty" }
              : [])}
            id="province"
            name="/province"
            error={
              formState.errors?.province &&
              formState.errors?.province.status !== "valid"
                ? formState.errors?.province.message
                : undefined
            }
          >
            <sl-menu-item value="ON">Ontario</sl-menu-item>
            <sl-menu-item value="QC">Quebec</sl-menu-item>
            <sl-menu-item value="NS">Nova Scotia</sl-menu-item>
            <sl-menu-item value="NB">New Brunswick</sl-menu-item>
            <sl-menu-item value="MB">Manitoba</sl-menu-item>
            <sl-menu-item value="BC">British Columbia</sl-menu-item>
            <sl-menu-item value="PE">Prince Edward Island</sl-menu-item>
            <sl-menu-item value="SK">Saskatchewan</sl-menu-item>
            <sl-menu-item value="AB">Alberta</sl-menu-item>
            <sl-menu-item value="NL">Newfoundland</sl-menu-item>
            <sl-menu-item value="NT">Northwest Territories</sl-menu-item>
            <sl-menu-item value="YT">Yukon</sl-menu-item>
            <sl-menu-item value="NU">Nunavut</sl-menu-item>
          </sl-select>
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            // value={formState.indirectTaxNumber}
            label={text.indirectTaxNumber}
            disabled={states.loading}
            // Copied from edit form, may need to keep
            {...(formState.errors?.indirectTaxNumber &&
            formState.errors?.indirectTaxNumber.status !== "valid"
              ? { class: "errors?tyles", helpText: "Cannot be empty" }
              : [])}
            id="indirectTaxNumber"
            name="/indirectTaxNumber"
            error={
              formState.errors?.indirectTaxNumber &&
              formState.errors?.indirectTaxNumber.status !== "valid"
                ? formState.errors?.indirectTaxNumber.message
                : undefined
            }
          />
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};
