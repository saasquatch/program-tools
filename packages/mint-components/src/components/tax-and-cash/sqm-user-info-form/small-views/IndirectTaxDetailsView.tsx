import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";

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
    provinces?: {
      provinceCode: string;
      displayName: string;
    }[];
    countries?: {
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
  console.log(props.data.countries);
  console.log(props.data.provinces, "OTHEREGIONSPROVINe");
  console.log(formState.countryCode);

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
            {props.data.countries!.map((c) => (
              <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
            ))}
          </sl-select>
          {/*AL testing inputs for now, dicuss with hooks proper way to handle QST, sub regions, and province sub inputs */}
          {formState.countryCode === "CA" && (
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
              {props.data.provinces.map((p) => (
                <sl-menu-item value={p.provinceCode}>
                  {p.displayName}
                </sl-menu-item>
              ))}
            </sl-select>
          )}
          {formState.countryCode === "ES" && (
            <sl-input
              required
              exportparts="label: input-label"
              class={classes.Input}
              value={formState.vatNumber}
              label={"Sub Region"}
              disabled={states.loading}
              {...(formState.errors?.vatNumber && {
                class: classes.ErrorInput,
                helpText: text.error.vatNumber,
              })}
              id="subRegion"
              name="/subRegion"
            />
          )}
          {formState.province === "Quebec" && (
            <sl-input
              required
              exportparts="label: input-label"
              class={classes.Input}
              label={"GST Number"}
              disabled={states.loading}
              value={formState.indirectTaxNumber}
              {...(formState.errors?.indirectTaxNumber && {
                class: classes.ErrorInput,
                helpText: text.error.indirectTaxNumber,
              })}
              id="gstNumber"
              name="/gstNumber"
            />
          )}
          {formState.countryCode !== "CA" && (
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
          )}
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
    data,
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
            {data.provinces.map((p) => (
              <sl-menu-item value={p.provinceCode}>
                {p.displayName}
              </sl-menu-item>
            ))}
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
