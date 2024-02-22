import { h } from "@stencil/core";
import { intl } from "../../../../global/global";
import { createStyleSheet } from "../../../../styling/JSS";
import { INDIRECT_TAX_PROVINCES } from "../../subregions";
import { TaxContext, TaxCountry } from "../../sqm-tax-and-cash/data";
import { vatLabels } from "../../countries";

export interface IndirectDetailsSlotViewProps {
  states: {
    disabled: boolean;
    loading: boolean;
    hide: boolean;
    formState: {
      selectedRegion?: string;
      subRegion?: string;
      subRegionTaxNumber?: string;
      qstNumber?: string;
      province?: string;
      indirectTaxNumber?: number;
      hasQst?: boolean;
      hasSubRegionTaxNumber?: boolean;
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
    countries?: TaxCountry[];
  };
  callbacks: {
    onFormChange: (field: string, e: CustomEvent) => void;
    onQstToggle: () => void;
    onSpainToggle: () => void;
  };
  text: {
    selectedRegion: string;
    province: string;
    indirectTaxNumber: string;
    subRegion: string;
    qstNumber: string;
    subRegionTaxNumberLabel: string;
    isRegisteredQST: string;
    isRegisteredSubRegionIncomeTax: string;
    error: {
      selectedRegion: string;
      province: string;
      indirectTaxNumber: string;
      subRegionTaxNumber: string;
      subRegion: string;
      qstNumber: string;
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
  ConditionalInputsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: "16px",
  },
  HR: {
    border: "1px solid #E0E0E0",
    margin: "10px 0",
  },
  Input: { maxWidth: "500px" },
  Checkbox: {
    "&::part(control)": {
      borderRadius: "0 !important",
    },
  },
  ErrorInput: {
    maxWidth: "500px",
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

export type TaxType =
  | "GST"
  | "HST"
  | "VAT"
  | "JST"
  | "QST"
  | "CT"
  | "SST"
  | "GENERAL";

export const OtherRegionSlotView = (props: IndirectDetailsSlotViewProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;
  const { classes } = sheet;

  const getTaxFieldLabel = (taxType: TaxType) => {
    return intl.formatMessage(
      {
        id: `tax-field-label${taxType}`,
        defaultMessage: text.indirectTaxNumber,
      },
      { taxType }
    );
  };

  const getTaxFieldError = (taxType: TaxType) => {
    return intl.formatMessage(
      {
        id: `tax-field-label${taxType}`,
        defaultMessage: text.error.indirectTaxNumber,
      },
      { taxType }
    );
  };

  const IndirectTaxNumberInput = ({
    label,
    error,
    name,
  }: {
    error: string;
    label: string;
    name: string;
  }) => {
    return (
      <sl-input
        required
        exportparts="label: input-label"
        class={classes.Input}
        label={label}
        disabled={states.loading || states.disabled}
        value={formState[name]}
        {...(formState.errors?.[name] && {
          class: classes.ErrorInput,
          helpText: error,
        })}
        id={name}
        name={`/${name}`}
      />
    );
  };

  const SpainFields = () => {
    return (
      <div class={classes.ConditionalInputsContainer}>
        <sl-select
          required
          exportparts="label: input-label"
          class={classes.Input}
          value={formState.subRegion}
          label={"Sub Region"}
          disabled={states.loading || states.disabled}
          {...(formState.errors?.indirectTaxNumber && {
            class: classes.ErrorInput,
            helpText: text.error.subRegion,
          })}
          id="subRegion"
          name="/subRegion"
        >
          {props.data.esRegions.map((r) => (
            <sl-menu-item value={r.regionCode}>{r.displayName}</sl-menu-item>
          ))}
        </sl-select>
        <IndirectTaxNumberInput
          name={"indirectTaxNumber"}
          label={getTaxFieldLabel("VAT")}
          error={getTaxFieldError("VAT")}
        />
        <sl-checkbox
          class={classes.Checkbox}
          exportparts="label: input-label"
          checked={formState.hasSubRegionTaxNumber}
          onSl-change={callbacks.onSpainToggle}
          disabled={states.disabled}
        >
          {text.isRegisteredSubRegionIncomeTax}
        </sl-checkbox>
        {formState.hasSubRegionTaxNumber && (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            label={text.subRegionTaxNumberLabel}
            disabled={states.loading || states.disabled}
            value={formState.subRegionTaxNumber}
            {...(formState.errors?.subRegionTaxNumberError && {
              class: classes.ErrorInput,
              helpText: text.error.subRegionTaxNumber,
            })}
            id={"subRegionTaxNumber"}
            name={"/subRegionTaxNumber"}
          />
        )}
      </div>
    );
  };

  const CanadaFields = () => {
    const { classes } = sheet;

    const currentTaxType = INDIRECT_TAX_PROVINCES?.find(
      (p) => p.provinceCode === formState.province
    )?.taxType as TaxType | undefined;

    return (
      <div class={classes.ConditionalInputsContainer}>
        <sl-select
          required
          value={formState.province}
          exportparts="label: input-label"
          class={classes.Input}
          label={text.province}
          disabled={states.loading || states.disabled}
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
          <IndirectTaxNumberInput
            label={getTaxFieldLabel("GST")}
            error={getTaxFieldError("GST")}
            name={"indirectTaxNumber"}
          />
        )}
        {currentTaxType === "HST" && (
          <IndirectTaxNumberInput
            label={getTaxFieldLabel("HST")}
            error={getTaxFieldError("HST")}
            name={"indirectTaxNumber"}
          />
        )}
        {formState.province === "QUEBEC" && (
          <div class={classes.ConditionalInputsContainer}>
            <sl-checkbox
              class={classes.Checkbox}
              exportparts="label: input-label"
              onSl-change={callbacks.onQstToggle}
              checked={formState.hasQst}
            >
              {text.isRegisteredQST}
            </sl-checkbox>
            {formState.hasQst && (
              <IndirectTaxNumberInput
                name={"qstNumber"}
                label={text.qstNumber}
                error={text.error.qstNumber}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  const getActiveForm = (selectedRegion: string) => {
    switch (selectedRegion) {
      case "CANADA":
        return <CanadaFields />;
      case "SPAIN":
        return <SpainFields />;
      default:
        // TODO: Pass in proper tax type for countries
        return (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            value={formState.indirectTaxNumber}
            label={getTaxFieldLabel(vatLabels[selectedRegion] || "GENERAL")}
            disabled={states.loading || states.disabled}
            {...(formState.errors?.indirectTaxNumber && {
              class: classes.ErrorInput,
              helpText: getTaxFieldError(
                vatLabels[selectedRegion] || "GENERAL"
              ),
            })}
            id="indirectTaxNumber"
            name="/indirectTaxNumber"
          />
        );
    }
  };

  const activeForm = getActiveForm(formState.selectedRegion);

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
            disabled={states.loading || states.disabled}
            onSl-select={(e) => callbacks.onFormChange("selectedRegion", e)}
            {...(formState.errors?.selectedRegion && {
              class: classes.ErrorInput,
              helpText: text.error.selectedRegion,
            })}
            id="selectedRegion"
            name="/selectedRegion"
          >
            {props.data.countries!.map((c) => (
              <sl-menu-item value={c.impactCountryCode}>
                {c.displayName}
              </sl-menu-item>
            ))}
          </sl-select>
          {/* Trying to stop shoelace from persisting form inputs */}
          {activeForm}
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};
