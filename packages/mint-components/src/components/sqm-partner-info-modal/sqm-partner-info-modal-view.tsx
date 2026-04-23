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
    allowBankingCollection: boolean;
    checkboxError: string;
    disabled: boolean;
  };
  callbacks: {
    onCountryChange: (e: any) => void;
    onCurrencyChange: (e: any) => void;
    onCheckboxChange: (e: any) => void;
    setCurrencySearch: (c: any) => void;
    setCountrySearch: (c: any) => void;
    onSubmit: () => void;
    onClose: () => void;
  };
  text: {
    modalHeader: string;
    descriptionNewPartner: string;
    descriptionExistingPartner: string;
    countryLabel: string;
    currencyLabel: string;
    submitButtonLabel: string;
    confirmButtonLabel: string;
    searchCountryPlaceholder: string;
    searchCurrencyPlaceholder: string;
    supportDescriptionExistingPartner: string;
    modalHeaderExistingPartner: string;
    allowBankingCollection: string;
    termsAndConditionsLabel: string;
    termsAndConditionsLink: string;
  };
}

const style = {
  Dialog: {
    "&::part(panel)": {
      maxWidth: "480px",
    },
    "&::part(body)": {
      padding: "0 var(--sl-spacing-x-large)",
      fontSize: "var(--sl-font-size-small)",
      overflow: "visible",
    },
    "&::part(overlay)": {
      background: "var(--sl-overlay-background-color)",
    },
  },
  DialogTitle: {
    fontSize: "var(--sl-font-size-x-large)",
    fontWeight: "600",
    padding: "var(--sl-spacing-large) 0 0 0",
    margin: "0",
  },
  FormFields: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    marginTop: "var(--sl-spacing-large)",
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
  DescriptionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sl-spacing-medium)",
    margin: "0",
    "& > p": {
      margin: "0",
    },
  },
  CheckboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  SubmitButton: {
    width: "100%",
    marginTop: "var(--sl-spacing-large)",
  },
};

export function PartnerInfoModalContentView(props: PartnerInfoModalViewProps) {
  const { states, callbacks, text } = props;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const description = states.isExistingPartner ? (
    <span class={sheet.classes.DescriptionContainer}>
      <p>{text.descriptionExistingPartner}</p>
      <p>{text.supportDescriptionExistingPartner}</p>
    </span>
  ) : (
    <p class={sheet.classes.DescriptionContainer}>
      {text.descriptionNewPartner}
    </p>
  );

  const buttonLabel = states.isExistingPartner
    ? text.confirmButtonLabel
    : text.submitButtonLabel;

  const bankingCollectionText = intl.formatMessage(
    {
      id: "bankingCollectionText",
      defaultMessage: text.allowBankingCollection,
    },
    {
      termsAndConditionsLink: (
        <a href={text.termsAndConditionsLink} target="_blank">
          {text.termsAndConditionsLabel}
        </a>
      ),
    },
  );

  return (
    <div>
      <style type="text/css"> {styleString}</style>
      <div class={sheet.classes.FormFields}>
        {description}
        <sl-select
          exportparts="label: input-label, base: input-base"
          label={text.countryLabel}
          value={states.countryCode}
          disabled={states.submitting || !!states.isExistingPartner}
          required
          hoist
          onSl-select={callbacks.onCountryChange}
        >
          <sl-input
            class={sheet.classes.SearchInput}
            placeholder={text.searchCountryPlaceholder}
            onKeyDown={(e: any) => e.stopPropagation()}
            onSl-input={(e: any) => {
              callbacks.setCountrySearch(e.target?.value);
            }}
          />
          {states.filteredCountries?.map((c) => (
            <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
          ))}
        </sl-select>

        <sl-select
          exportparts="label: input-label, base: input-base"
          label={text.currencyLabel}
          value={states.currency}
          disabled={states.submitting || !!states.isExistingPartner}
          required
          hoist
          onSl-select={callbacks.onCurrencyChange}
        >
          <sl-input
            class={sheet.classes.SearchInput}
            placeholder={text.searchCurrencyPlaceholder}
            onKeyDown={(e: any) => e.stopPropagation()}
            onSl-input={(e: any) =>
              callbacks.setCurrencySearch(e.target?.value)
            }
          />
          {states.filteredCurrencies?.map((c) => (
            <sl-menu-item value={c.currencyCode}>
              {c.currencyCode} - {c.displayName}
            </sl-menu-item>
          ))}
        </sl-select>
        <div class={sheet.classes.CheckboxWrapper}>
          <sl-checkbox
            checked={states.allowBankingCollection === true}
            onSl-change={callbacks.onCheckboxChange}
            disabled={states.submitting}
            required
            value={states.allowBankingCollection}
            id="allowBankingCollection"
            name="/allowBankingCollection"
          >
            {bankingCollectionText}
          </sl-checkbox>
          {states.checkboxError && (
            <p class={sheet.classes.ErrorMessage}>{states.checkboxError}</p>
          )}
        </div>
      </div>
      {states.error && <p class={sheet.classes.ErrorMessage}>{states.error}</p>}
      <sl-button
        slot="footer"
        type="primary"
        loading={states.submitting}
        disabled={
          states.submitting ||
          !states.countryCode ||
          !states.currency ||
          !states.allowBankingCollection
        }
        onClick={callbacks.onSubmit}
        class={sheet.classes.SubmitButton}
        exportparts="base: primarybutton-base"
      >
        {buttonLabel}
      </sl-button>
    </div>
  );
}

export function PartnerInfoModalView(props: PartnerInfoModalViewProps) {
  const { states, text, callbacks } = props;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  if (!states.open) return <div></div>;

  return (
    <div>
      <style type="text/css"> {styleString}</style>
      <sl-dialog
        class={sheet.classes.Dialog}
        open={states.open}
        noHeader
        label={
          states.isExistingPartner
            ? text.modalHeaderExistingPartner
            : text.modalHeader
        }
        onSl-request-close={(e: any) => {
          e.preventDefault();
        }}
        onSl-hide={(e: any) => {
          if (e.target?.tagName === "SL-DIALOG") {
            e.preventDefault();
          }
        }}
      >
        <h2 class={sheet.classes.DialogTitle}>
          {states.isExistingPartner
            ? text.modalHeaderExistingPartner
            : text.modalHeader}
        </h2>
        <PartnerInfoModalContentView {...props} />
      </sl-dialog>
    </div>
  );
}
