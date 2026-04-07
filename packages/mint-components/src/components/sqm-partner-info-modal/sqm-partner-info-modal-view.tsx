import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { intl } from "../../global/global";

export interface PartnerInfoModalViewProps {
  states: {
    open: boolean;
    loading: boolean;
    submitting: boolean;
    isExistingPartner: boolean;
    countryCode: string;
    currency: string;
    error: string;
    success: boolean;
    brandName: string;
    filteredCountries: { countryCode: string; displayName: string }[];
    filteredCurrencies: { currencyCode: string; displayName: string }[];
  };
  callbacks: {
    onCountryChange: (e: any) => void;
    onCurrencyChange: (e: any) => void;
    onCountrySearch: (value: string) => void;
    onCurrencySearch: (value: string) => void;
    onSubmit: () => void;
    onClose: () => void;
  };
  text: {
    modalBrandHeader: string;
    descriptionNewPartner: string;
    descriptionExistingPartner: string;
    countryLabel: string;
    currencyLabel: string;
    submitButtonLabel: string;
    confirmButtonLabel: string;
    searchCountryPlaceholder: string;
    searchCurrencyPlaceholder: string;
  };
}

const style = {
  Dialog: {
    "&::part(panel)": {
      maxWidth: "480px",
    },
    "&::part(title)": {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "600",
      padding:
        "var(--sl-spacing-x-large) var(--sl-spacing-x-large) 0 var(--sl-spacing-x-large)",
    },
    "&::part(body)": {
      padding: "var(--sl-spacing-small) var(--sl-spacing-x-large)",
      fontSize: "var(--sl-font-size-small)",
      overflow: "visible",
    },
    "&::part(footer)": {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-small)",
      padding:
        "var(--sl-spacing-small) var(--sl-spacing-x-large) var(--sl-spacing-x-large)",
    },
    "&::part(overlay)": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&::part(close-button)": {
      display: "none",
    },
  },
  FormFields: {
    display: "flex",
    gap: "var(--sl-spacing-medium)",
    marginTop: "var(--sl-spacing-medium)",

    "& > *": {
      flex: 1,
    },
  },
  ErrorMessage: {
    color: "var(--sqm-danger-color-text, #d32f2f)",
    fontSize: "var(--sl-font-size-small)",
    marginTop: "var(--sl-spacing-x-small)",
  },
  SearchInput: {
    "&::part(base)": {
      border: "none",
      borderBottom: "1px solid var(--sl-color-neutral-300)",
      borderRadius: "0",
    },
  },
};

export function PartnerInfoModalView(props: PartnerInfoModalViewProps) {
  const { states, callbacks, text } = props;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const description = states.isExistingPartner
    ? text.descriptionExistingPartner
    : text.descriptionNewPartner;

  const buttonLabel = states.isExistingPartner
    ? text.confirmButtonLabel
    : text.submitButtonLabel;

  return (
    <sl-dialog
      class={sheet.classes.Dialog}
      open={states.open}
      noHeader={false}
      label={intl.formatMessage(
        {
          id: "modalBrandHeader",
          defaultMessage: text.modalBrandHeader,
        },
        { brandName: states.brandName },
      )}
      onSl-request-close={(e: any) => {
        e.preventDefault();
      }}
      onSl-hide={(e: any) => {
        // Prevent closing when clicking outside the dialog but not dropdowns
        if (e.target?.tagName === "SL-DIALOG") {
          e.preventDefault();
        }
      }}
    >
      <style type="text/css">{styleString}</style>

      <p>{description}</p>

      <div class={sheet.classes.FormFields}>
        <sl-select
          exportparts="label: input-label, base: input-base"
          label={text.countryLabel}
          value={states.countryCode}
          disabled={states.submitting}
          required
          onSl-select={callbacks.onCountryChange}
        >
          <sl-input
            class={sheet.classes.SearchInput}
            placeholder={text.searchCountryPlaceholder}
            onKeyDown={(e: any) => e.stopPropagation()}
            onSl-input={(e: any) =>
              callbacks.onCountrySearch(e.target?.value || "")
            }
          />
          {states.filteredCountries?.map((c) => (
            <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
          ))}
        </sl-select>

        <sl-select
          exportparts="label: input-label, base: input-base"
          label={text.currencyLabel}
          value={states.currency}
          disabled={states.submitting}
          required
          onSl-select={callbacks.onCurrencyChange}
        >
          <sl-input
            class={sheet.classes.SearchInput}
            placeholder={text.searchCurrencyPlaceholder}
            onKeyDown={(e: any) => e.stopPropagation()}
            onSl-input={(e: any) =>
              callbacks.onCurrencySearch(e.target?.value || "")
            }
          />
          {states.filteredCurrencies?.map((c) => (
            <sl-menu-item value={c.currencyCode}>
              {c.currencyCode} - {c.displayName}
            </sl-menu-item>
          ))}
        </sl-select>
      </div>

      {states.error && <p class={sheet.classes.ErrorMessage}>{states.error}</p>}

      <sl-button
        slot="footer"
        type="primary"
        loading={states.submitting}
        disabled={states.submitting || !states.countryCode || !states.currency}
        onClick={callbacks.onSubmit}
        style={{ width: "100%" }}
        exportparts="base: primarybutton-base"
      >
        {buttonLabel}
      </sl-button>
    </sl-dialog>
  );
}
