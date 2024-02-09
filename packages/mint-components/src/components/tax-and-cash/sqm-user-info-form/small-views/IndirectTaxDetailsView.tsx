import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../../../styling/JSS";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { INDIRECT_TAX_PROVINCES } from "../../provinces";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    hide: boolean;
    formState: {
      selectedRegion?: string;
      vatNumber?: number;
      province?: string;
      indirectTaxNumber?: number;
      hstNumber?: string;
      gstNumber?: string;
      errors?: any;
      error?: string;
    };
  };
  data: {
    esRegions?: {
      regionCode: string;
      displayName: string;
    }[];
    provinces?: {
      provinceCode: string;
      displayName: string;
    }[];
    countries?: {
      countryCode: string;
      displayName: string;
    }[];
  };
  callbacks: {
    onFormChange: (field: string, e: CustomEvent) => void;
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
    callbacks,
    text,
  } = props;

  const SpainFields = () => {
    return (
      <sl-select
        required
        exportparts="label: input-label"
        class={classes.Input}
        value={formState.vatNumber}
        label={"Sub Region"}
        // onSl-select={(e) => callbacks.onFormChange("subRegion", e)}
        disabled={states.loading}
        {...(formState.errors?.vatNumber && {
          class: classes.ErrorInput,
          helpText: text.error.vatNumber,
        })}
        id="subRegion"
        name="/subRegion"
      >
        {props.data.esRegions.map((r) => (
          <sl-menu-item value={r.regionCode}>{r.displayName}</sl-menu-item>
        ))}
      </sl-select>
    );
  };

  const CanadaFields = () => {
    const [qst, setQst] = useState(false);
    const { classes } = sheet;

    const currentTaxType = INDIRECT_TAX_PROVINCES?.find(
      (p) => p.provinceCode === formState.province
    )?.taxType;

    return (
      <div>
        <sl-select
          required
          value={formState.province}
          exportparts="label: input-label"
          class={classes.Input}
          label={text.province}
          disabled={states.loading}
          onSl-select={(e) => callbacks.onFormChange("province", e)}
          {...(formState.errors?.province && {
            class: classes.ErrorInput,
            helpText: text.error.province,
          })}
          id="province"
          name="/province"
        >
          {props.data.provinces.map((p) => (
            <sl-menu-item value={p.provinceCode}>{p.displayName}</sl-menu-item>
          ))}
        </sl-select>
        {currentTaxType === "GST" && (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            label={"GST Number"}
            disabled={states.loading}
            value={formState.gstNumber}
            {...(formState.errors?.hstNumber && {
              class: classes.ErrorInput,
              helpText: text.error.indirectTaxNumber,
            })}
            id={"indirectTaxNumber"}
            name={"/indirectTaxNumber"}
          />
        )}
        {currentTaxType === "HST" && (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            label={"HST Number"}
            disabled={states.loading}
            value={formState.indirectTaxNumber}
            {...(formState.errors?.indirectTaxNumber && {
              class: classes.ErrorInput,
              helpText: text.error.indirectTaxNumber,
            })}
            id={"indirectTaxNumber"}
            name={"/indirectTaxNumber"}
          />
        )}
        {formState.province === "QC" && (
          <div>
            <sl-checkbox checked={qst} onInput={() => setQst((q) => !q)}>
              Registered for QST?
            </sl-checkbox>
            {qst && (
              <sl-input
                required
                exportparts="label: input-label"
                class={classes.Input}
                label={"QST Number"}
                disabled={states.loading}
                value={formState.indirectTaxNumber}
                {...(formState.errors?.indirectTaxNumber && {
                  class: classes.ErrorInput,
                  helpText: text.error.indirectTaxNumber,
                })}
                id="qstNumber"
                name="/qstNumber"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const { classes } = sheet;
  // console.log(props.data.countries);
  // console.log(props.data.provinces, "OTHEREGIONSPROVINe");
  // console.log(formState.countryCode);

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
            value={formState.selectedRegion}
            exportparts="label: input-label"
            label={text.selectedRegion}
            disabled={states.loading}
            onSl-select={(e) => callbacks.onFormChange("selectedRegion", e)}
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
          {/* Trying to stop shoelace from persisting form inputs */}
          {formState.selectedRegion === "CA" && <CanadaFields />}
          {formState.selectedRegion === "ES" && <SpainFields />}
          {formState.selectedRegion !== "CA" && (
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
              id="indirectTaxNumber"
              name="/indirectTaxNumber"
            />
          )}
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};
