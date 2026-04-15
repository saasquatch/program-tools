import { h } from "@stencil/core";
import { intl } from "../../global/global";
import { createStyleSheet } from "../../styling/JSS";
import { CopyTextView, CopyTextViewProps } from "../views/copy-text-view";

export type ValidationErrorCode =
  | "EXISTING_CODE_CONFLICT"
  | "INVALID_CHARACTERS"
  | "PROFANITY"
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
  isEditing: boolean;
  editValue: string;
  domainPrefix: string;
  editsRemaining: number;
  maxEdits: number;
  limitReached: boolean;
  validationError: ValidationErrorInfo | null;
  isValidating: boolean;
  isSaving: boolean;
  characterLimit: number;
  minCharacters: number;
  charactersRemaining: number;
  editLimitText: string;
  editLimitReachedText: string;
  supportLinkText: string;
  customizeDisabled: boolean;
  customizeDisabledTooltip: string;
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
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining,
    maxEdits,
    limitReached,
    validationError,
    isValidating,
    isSaving,
    characterLimit,
    minCharacters,
    charactersRemaining,
    editLimitText,
    editLimitReachedText,
    supportLinkText,
    customizeDisabled,
    customizeDisabledTooltip,
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

  const errorMessageType =
    validationError?.code === "EXISTING_CODE_CONFLICT" ? "info" : "warning";

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
          <sqm-form-message type={errorMessageType}>
            <p part="alert-title">{validationError.title}</p>
            {validationError.description}
          </sqm-form-message>
        )}
        {isValidating && <p class={sheet.classes.HelperText}>Validating...</p>}
        <div class={sheet.classes.ActionRow}>
          <button
            class={sheet.classes.SaveButton}
            onClick={onSave}
            disabled={
              isSaving || isValidating || !!validationError || !editValue || editValue.length < minCharacters
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
      {customizeUrl && (customizeDisabled ? (
        <sl-tooltip content={customizeDisabledTooltip} placement="top" style={{ display: "inline-block", width: "fit-content" }}>
          <p class={sheet.classes.CustomizeLinkDisabled}>
            {customizeLinkLabel}
          </p>
        </sl-tooltip>
      ) : (
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
      ))}
      {customizeUrl && limitReached && (
        <p class={sheet.classes.HelperText}>
          {intl.formatMessage(
            {
              id: "editLimitReached",
              defaultMessage: editLimitReachedText,
            },
            {
              supportLink: (
                <a target="_blank" href="https://example.com">
                  {supportLinkText}
                </a>
              ),
            },
          )}
        </p>
      )}
    </div>
  );
}
