import { Fragment, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { intl } from "../../global/global";

export interface PartnerInfoModalViewProps {
  states: {
    open: boolean;
    loading: boolean;
    submitting: boolean;
    isExistingPartner: boolean;
    shouldDisplayNameFields: boolean;
    firstName: string;
    lastName: string;
    countryCode: string;
    currency: string;
    error: string;
    success: boolean;
    filteredCountries: { countryCode: string; displayName: string }[];
    filteredCurrencies: { currencyCode: string; displayName: string }[];
    allowBankingCollection: boolean;
    disabled: boolean;
  };
  callbacks: {
    onFirstNameChange: (e: any) => void;
    onLastNameChange: (e: any) => void;
    onCountryChange: (e: any) => void;
    onCurrencyChange: (e: any) => void;
    onCheckboxChange: (e: any) => void;
    setCurrencySearch: (c: any) => void;
    setCountrySearch: (c: any) => void;
    onSubmit: () => void;
    onClose: () => void;
    onInitialFocus?: (e: any) => void;
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
    supportLink: string;
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
  NameInput: {
    "&::part(label)": {
      fontWeight: "var(--sl-font-weight-normal)",
      fontSize: "var(--sl-input-label-font-size-medium)",
    },
  },
  ErrorMessage: {
    marginTop: "var(--sl-spacing-x-small)",
  },
  SearchInput: {
    "&::part(base)": {
      border: "none",
      borderBottom: "1px solid var(--sl-color-neutral-300)",
      borderRadius: "0",
    },
  },
  SelectMenu: {
    maxHeight: "300px",
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
  Checkbox: {
    "&::part(label)": {
      fontSize: "var(--sl-font-size-small)",
    },
  },
  SubmitButton: {
    width: "100%",
    marginTop: "var(--sl-spacing-large)",
    "&::part(base)": {
      color: "var(--sqm-primary-button-color)",
      backgroundColor: "var(--sqm-primary-button-background)",
      border: "var(--sqm-primary-button-color-border)",
      borderRadius: "var(--sqm-primary-button-radius)",
    },
  },
};

export function PartnerInfoModalContentView(props: PartnerInfoModalViewProps) {
  const { states, callbacks, text } = props;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const supportMessage = intl.formatMessage(
    {
      id: "supportDescriptionExistingPartner",
      defaultMessage: text.supportDescriptionExistingPartner,
    },
    {
      supportLink: (
        <a target="_blank" href={`mailto:advocate-payment-support@impact.com`}>
          {text.supportLink}
        </a>
      ),
    }
  );

  const description = states.isExistingPartner ? (
    <span class={sheet.classes.DescriptionContainer}>
      <p>{text.descriptionExistingPartner}</p>
      <p>{supportMessage}</p>
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
    }
  );

  return (
    <div>
      <style type="text/css">{styleString}</style>
      <div class={sheet.classes.FormFields}>
        {description}
        {states.shouldDisplayNameFields && (
          <Fragment>
            <sl-input
              exportparts="label: input-label, base: input-base"
              class={sheet.classes.NameInput}
              label="First Name"
              value={states.firstName}
              onSl-input={callbacks.onFirstNameChange}
              disabled={states.submitting}
              required
            />
            <sl-input
              exportparts="label: input-label, base: input-base"
              class={sheet.classes.NameInput}
              label="Last Name"
              value={states.lastName}
              onSl-input={callbacks.onLastNameChange}
              disabled={states.submitting}
              required
            />
          </Fragment>
        )}
        <sl-select
          exportparts="label: input-label, base: input-base, menu: select-menu"
          label={text.countryLabel}
          value={states.countryCode}
          disabled={
            states.submitting ||
            (!!states.countryCode && states.isExistingPartner)
          }
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
          <div class={sheet.classes.SelectMenu}>
            {states.filteredCountries?.map((c) => (
              <sl-menu-item value={c.countryCode}>{c.displayName}</sl-menu-item>
            ))}
          </div>
        </sl-select>

        <sl-select
          exportparts="label: input-label, base: input-base"
          label={text.currencyLabel}
          value={states.currency}
          disabled={
            states.submitting || (!!states.currency && states.isExistingPartner)
          }
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
          <div class={sheet.classes.SelectMenu}>
            {states.filteredCurrencies?.map((c) => (
              <sl-menu-item value={c.currencyCode}>
                {c.currencyCode} - {c.displayName}
              </sl-menu-item>
            ))}
          </div>
        </sl-select>
        <div class={sheet.classes.CheckboxWrapper}>
          <sl-checkbox
            class={sheet.classes.Checkbox}
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
        </div>
      </div>
      {states.error && (
        <div class={sheet.classes.ErrorMessage}>
          <sqm-form-message class={sheet.classes.ErrorMessage} type="error">
            <p part="alert-description">{states.error}</p>
          </sqm-form-message>
        </div>
      )}

      <sl-button
        slot="footer"
        type="primary"
        loading={states.submitting}
        disabled={
          states.submitting ||
          !states.countryCode ||
          !states.currency ||
          !states.allowBankingCollection ||
          (states.shouldDisplayNameFields &&
            (!states.firstName || !states.lastName))
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

  const modalHeader = states.isExistingPartner
    ? text.modalHeaderExistingPartner
    : text.modalHeader;

  return (
    <div>
      <style type="text/css"> {styleString}</style>
      <sl-dialog
        class={sheet.classes.Dialog}
        open={states.open}
        noHeader
        label={modalHeader}
        onSl-request-close={(e: any) => {
          e.preventDefault();
        }}
        onSl-hide={(e: any) => {
          if (e.target?.tagName === "SL-DIALOG") {
            e.preventDefault();
          }
        }}
        onSl-initial-focus={callbacks.onInitialFocus}
      >
        <h2 class={sheet.classes.DialogTitle}>{modalHeader}</h2>
        <PartnerInfoModalContentView {...props} />
      </sl-dialog>
    </div>
  );
}
