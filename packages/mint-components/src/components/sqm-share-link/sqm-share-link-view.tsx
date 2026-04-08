import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";

export type ValidationErrorCode =
  | "LINK_TAKEN"
  | "INVALID_SYMBOLS"
  | "RESTRICTED_WORD"
  | null;

export interface ValidationErrorInfo {
  code: ValidationErrorCode;
  title: string;
  description: string;
}

export interface ShareLinkViewProps {
  copyTextViewProps: CopyTextViewProps;
  customizeUrl: boolean;
  customizeLinkLabel: string;
  saveLabelText: string;
  cancelLabelText: string;
  successMessage: string;
  isEditing: boolean;
  editValue: string;
  domainPrefix: string;
  editsRemaining: number;
  maxEdits: number;
  limitReached: boolean;
  validationError: ValidationErrorInfo | null;
  isValidating: boolean;
  isSaving: boolean;
  showSuccess: boolean;
  characterLimit: number;
  charactersRemaining: number;
  editLimitText: string;
  onCustomizeClick: () => void;
  onEditValueChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const vanillaStyle = `
  :host {
    display: block;
    width: 100%;
  }
`;

export function ShareLinkView(props: ShareLinkViewProps) {
  const {
    copyTextViewProps,
    customizeUrl,
    customizeLinkLabel,
    saveLabelText,
    cancelLabelText,
    successMessage,
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining,
    maxEdits,
    limitReached,
    validationError,
    isValidating,
    isSaving,
    showSuccess,
    characterLimit,
    charactersRemaining,
    editLimitText,
    onCustomizeClick,
    onEditValueChange,
    onSave,
    onCancel,
  } = props;

  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-x-small)",
      width: "100%",
    },
    CustomizeLinkText: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      fontWeight: "600",
      cursor: "pointer",
      color: "var(--sl-color-neutral-900)",
      textAlign: "left" as const,
      "&:hover": {
        textDecoration: "underline",
      },
    },
    CustomizeLinkDisabled: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      fontWeight: "600",
      color: "var(--sl-color-neutral-400)",
      cursor: "default",
      textAlign: "left" as const,
    },
    EditContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--sl-spacing-x-small)",
      width: "100%",
    },
    EditInputWrapper: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      border:
        "var(--sqm-border-thickness, 1px) solid var(--sqm-input-border-color, #d1d5db)",
      borderRadius: "var(--sqm-border-radius-normal, 4px)",
      background: "var(--sqm-input-background, #fff)",
      overflow: "hidden",
      "&:focus-within": {
        borderColor: "#999999",
        boxShadow:
          "0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color)",
      },
    },
    DomainPrefix: {
      padding: "0 0 0 var(--sl-spacing-medium)",
      fontSize: "var(--sl-font-size-medium)",
      color: "var(--sl-color-neutral-500)",
      whiteSpace: "nowrap",
      userSelect: "none",
      lineHeight: "var(--sl-input-height-medium)",
    },
    EditInput: {
      flex: "1",
      border: "none",
      outline: "none",
      padding: "0 var(--sl-spacing-medium) 0 0",
      fontSize: "var(--sl-font-size-medium)",
      fontFamily: "var(--sl-font-sans)",
      color: "var(--sl-input-color)",
      background: "transparent",
      lineHeight: "var(--sl-input-height-medium)",
      minWidth: "0",
    },
    EditLabel: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sl-color-neutral-500)",
    },
    HelperText: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sl-color-neutral-500)",
    },
    ErrorText: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sqm-danger-color-text, #dc2626)",
    },
    ErrorBanner: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--sl-spacing-small)",
      padding: "var(--sl-spacing-small) var(--sl-spacing-medium)",
      borderRadius: "var(--sqm-border-radius-normal, 4px)",
      fontSize: "var(--sl-font-size-small)",
      lineHeight: "1.4",
    },
    ErrorBannerLinkTaken: {
      background: "var(--sl-color-primary-50, #eff6ff)",
      color: "var(--sl-color-neutral-900)",
    },
    ErrorBannerInvalidSymbols: {
      background: "#fef9c3",
      color: "var(--sl-color-neutral-900)",
    },
    ErrorBannerRestrictedWord: {
      background: "#fef9c3",
      color: "var(--sl-color-neutral-900)",
    },
    ErrorBannerIcon: {
      flexShrink: "0",
      marginTop: "2px",
    },
    ErrorBannerContent: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    ErrorBannerTitle: {
      fontWeight: "600",
      margin: "0",
    },
    ErrorBannerDescription: {
      margin: "0",
    },
    SuccessText: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      color: "var(--sl-color-success-600, #16a34a)",
    },
    ActionRow: {
      display: "flex",
      gap: "var(--sl-spacing-medium)",
      alignItems: "center",
    },
    SaveButton: {
      cursor: "pointer",
      fontFamily: "var(--sl-font-sans)",
      fontSize: "var(--sl-font-size-small)",
      fontWeight: "600",
      padding: "var(--sl-spacing-x-small) var(--sl-spacing-medium)",
      borderRadius: "var(--sqm-border-radius-normal, 4px)",
      border: "1px solid var(--sl-color-neutral-900)",
      background: "var(--sl-color-neutral-900)",
      color: "#fff",
      "&:disabled": {
        opacity: "0.5",
        cursor: "default",
      },
    },
    CancelButton: {
      margin: "0",
      fontSize: "var(--sl-font-size-small)",
      fontWeight: "600",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "0",
      fontFamily: "var(--sl-font-sans)",
      color: "var(--sl-color-neutral-500)",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const errorBannerClass = validationError
    ? validationError.code === "LINK_TAKEN"
      ? sheet.classes.ErrorBannerLinkTaken
      : validationError.code === "INVALID_SYMBOLS"
        ? sheet.classes.ErrorBannerInvalidSymbols
        : sheet.classes.ErrorBannerRestrictedWord
    : "";

  const errorIcon =
    validationError?.code === "LINK_TAKEN"
      ? "info-circle"
      : "exclamation-triangle";

  const showCharactersRemaining = charactersRemaining <= 7;

  // Editing state
  if (isEditing) {
    return (
      <div class={sheet.classes.Container}>
        <style type="text/css">
          {styleString}
          {vanillaStyle}
        </style>
        <p class={sheet.classes.EditLabel}>Enter your link</p>
        <div class={sheet.classes.EditInputWrapper}>
          <span class={sheet.classes.DomainPrefix}>{domainPrefix}</span>
          <input
            class={sheet.classes.EditInput}
            type="text"
            value={editValue}
            onInput={(e: Event) =>
              onEditValueChange((e.target as HTMLInputElement).value)
            }
            disabled={isSaving}
            maxLength={characterLimit}
          />
        </div>
        <p class={sheet.classes.HelperText}>
          {editLimitText}
          {showCharactersRemaining &&
            ` Characters remaining: ${charactersRemaining}`}
        </p>
        {validationError && (
          <div class={`${sheet.classes.ErrorBanner} ${errorBannerClass}`}>
            <sl-icon
              class={sheet.classes.ErrorBannerIcon}
              name={errorIcon}
            />
            <div class={sheet.classes.ErrorBannerContent}>
              <p class={sheet.classes.ErrorBannerTitle}>
                {validationError.title}
              </p>
              <p class={sheet.classes.ErrorBannerDescription}>
                {validationError.description}
              </p>
            </div>
          </div>
        )}
        {isValidating && <p class={sheet.classes.HelperText}>Validating...</p>}
        <div class={sheet.classes.ActionRow}>
          <button
            class={sheet.classes.SaveButton}
            onClick={onSave}
            disabled={
              isSaving || isValidating || !!validationError || !editValue
            }
          >
            {isSaving ? "Saving..." : saveLabelText}
          </button>
          <button
            class={sheet.classes.CancelButton}
            onClick={onCancel}
            disabled={isSaving}
          >
            {cancelLabelText}
          </button>
        </div>
      </div>
    );
  }

  // Default / Customized / Limit reached states
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <CopyTextView {...copyTextViewProps} />
      {showSuccess && <p class={sheet.classes.SuccessText}>{successMessage}</p>}
      {customizeUrl && (
        <p
          class={
            limitReached
              ? sheet.classes.CustomizeLinkDisabled
              : sheet.classes.CustomizeLinkText
          }
          onClick={limitReached ? undefined : onCustomizeClick}
        >
          {customizeLinkLabel}
        </p>
      )}
    </div>
  );
}
