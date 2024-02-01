import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";
import { formatDisplayName } from "@formatjs/intl";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    hide: boolean;
    formState: {
      countryCode?: string;
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
    selectedRegion: string;
    vatNumber: string;
    province: string;
    indirectTaxNumber: string;
    error: {
      selectedRegion: string;
      vatNumber: string;
      province: string;
      indirectTaxNumber: string;
    };
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
  ErrorInput: {
    "&::part(base)": {
      border: "1px solid var(--sl-color-danger-500)",
      borderRadius: "var(--sl-input-border-radius-medium)",
    },

    "&::part(help-text)": {
      color: "var(--sl-color-danger-500)",
    },
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

export const OtherRegionSlotView = (props: IndirectDetailsSlotViewProps) => {
  const {
    states,
    states: { formState },
    text,
  } = props;

  const { classes } = sheet;
  console.log("regions", { formState });
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
            value={formState.countryCode}
            exportparts="label: input-label"
            label={text.selectedRegion}
            disabled={states.loading}
            {...(formState.errors?.selectedRegion && {
              class: classes.ErrorInput,
              helpText: text.error.selectedRegion,
            })}
            id="selectedRegion"
            name="/selectedRegion"
          >
            {props.data.countries?.map((c) => (
              <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
            ))}
          </sl-select>
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            value={formState.vatNumber}
            label={text.vatNumber}
            disabled={states.loading}
            {...(formState.errors?.vatNumber && {
              class: classes.ErrorInput,
              helpText: text.error.vatNumber,
            })}
            id="vatNumber"
            name="/vatNumber"
          />
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};

export const IndirectDetailsSlotView = (
  props: IndirectDetailsSlotViewProps
) => {
  const {
    states,
    states: { formState },
    text,
  } = props;

  const { classes } = sheet;

  console.log("regions", { formState });
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
            value={formState.province}
            exportparts="label: input-label"
            class={classes.Input}
            label={text.province}
            disabled={states.loading}
            {...(formState.errors?.province && {
              class: classes.ErrorInput,
              helpText: text.error.province,
            })}
            id="province"
            name="/province"
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
            label={text.indirectTaxNumber}
            disabled={states.loading}
            value={formState.indirectTaxNumber}
            {...(formState.errors?.indirectTaxNumber && {
              class: classes.ErrorInput,
              helpText: text.error.indirectTaxNumber,
            })}
            id="indirectTaxNumber"
            name="/indirectTaxNumber"
          />
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};
