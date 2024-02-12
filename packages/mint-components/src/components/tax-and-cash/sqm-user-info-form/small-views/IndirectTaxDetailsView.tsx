import { h } from "@stencil/core";
import { intl } from "../../../../global/global";
import { createStyleSheet } from "../../../../styling/JSS";
import { INDIRECT_TAX_PROVINCES } from "../../subregions";

export interface IndirectDetailsSlotViewProps {
  states: {
    loading: boolean;
    hide: boolean;
    formState: {
      selectedRegion?: string;
      subRegion?: string;
      subRegionTaxNumber?: string;
      qstNumber?: string;
      province?: string;
      indirectTaxNumber?: number;
      // AL: for handling income tax Spain
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
    countries?: {
      countryCode: string;
      displayName: string;
    }[];
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

export type TaxType = "GST" | "HST" | "VAT" | "JST";
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

  const IndirectTaxNumberInput = ({
    label,
    name,
  }: {
    label: string;
    name: string;
  }) => {
    return (
      <sl-input
        required
        exportparts="label: input-label"
        class={classes.Input}
        label={label}
        disabled={states.loading}
        value={formState[name]}
        {...(formState.errors?.[name] && {
          class: classes.ErrorInput,
          helpText: text.error[name],
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
          // onSl-select={(e) => callbacks.onFormChange("subRegion", e)}
          disabled={states.loading}
          {...(formState.errors?.indirectTaxNumber && {
            class: classes.ErrorInput,
            helpText: text.error.indirectTaxNumber,
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
        />
        <sl-checkbox
          exportparts="label: input-label"
          checked={formState.hasSubRegionTaxNumber}
          onSl-change={callbacks.onSpainToggle}
        >
          {text.isRegisteredSubRegionIncomeTax}
        </sl-checkbox>
        {formState.hasSubRegionTaxNumber && (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            label={text.subRegionTaxNumberLabel}
            disabled={states.loading}
            value={formState.subRegionTaxNumber}
            {...(formState.errors?.subRegionTaxNumberError && {
              class: classes.ErrorInput,
              helpText: text.error.indirectTaxNumber,
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
          <IndirectTaxNumberInput
            label={getTaxFieldLabel("GST")}
            name={"indirectTaxNumber"}
          />
        )}
        {currentTaxType === "HST" && (
          <IndirectTaxNumberInput
            label={getTaxFieldLabel("HST")}
            name={"indirectTaxNumber"}
          />
        )}
        {formState.province === "QC" && (
          <div class={classes.ConditionalInputsContainer}>
            <sl-checkbox
              exportparts="label: input-label"
              onSl-change={callbacks.onQstToggle}
              checked={formState.hasQst}
            >
              {text.isRegisteredQST}
            </sl-checkbox>
            {formState.hasQst && (
              <IndirectTaxNumberInput label={"QST Number"} name={"qstNumber"} />
            )}
          </div>
        )}
      </div>
    );
  };

  // console.log(props.data.countries);
  // console.log(props.data.provinces, "OTHEREGIONSPROVINe");
  // console.log(formState.countryCode);

  const getActiveForm = (selectedRegion: string) => {
    switch (selectedRegion) {
      case "CA":
        return <CanadaFields />;
      case "ES":
        return <SpainFields />;
      default:
        return (
          <sl-input
            required
            exportparts="label: input-label"
            class={classes.Input}
            value={formState.indirectTaxNumber}
            label={getTaxFieldLabel("VAT")}
            disabled={states.loading}
            {...(formState.errors?.indirectTaxNumber && {
              class: classes.ErrorInput,
              helpText: text.error.indirectTaxNumber,
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
          {activeForm}
        </div>
        <hr class={classes.HR} />
      </form>
    </div>
  );
};
