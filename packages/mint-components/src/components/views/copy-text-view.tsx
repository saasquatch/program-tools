import { h } from "@stencil/core";
import { HostBlock } from "../../global/mixins";
import { createStyleSheet } from "../../styling/JSS";

export interface CopyTextViewProps {
  copyString: string;
  tooltiptext: string;
  open: boolean;
  copyButtonLabel?: string;
  disabled?: boolean;
  textAlign?: "left" | "center" | "right";
  buttonStyle?: "button-outside" | "button-below" | "icon";
  error?: boolean;
  errorText?: string;
  notificationText?: string;
  showNotificationText?: boolean;
  inputPlaceholderText?: string;
  dateAvailable?: string;
  loading?: boolean;
  isCopied?: boolean;
  onClick?: () => void;
}

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(input)": { textOverflow: "ellipsis", width: "100%" },
    "&::part(base)": { cursor: "pointer", overflow: "visible" },
    width: "100%",
  },
  inputErrorStyle: {
    "&::part(base)": {
      border: "2px solid red",
    },
  },
  ContainerDiv: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    gap: "var(--sl-spacing-x-small)",
    width: "100%",
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    gap: "var(--sl-spacing-x-small)",
    width: "100%",
  },
  errorTextStyle: {
    margin: "0",
    color: "var(--sl-color-danger-500)",
  },
  notificationTextStyle: {
    margin: "0",
    color: "var(--sl-color-neutral-500)",
  },
};

const vanillaStyle = `
  :host{
    display: block;   
    width: 100%;
  }
`;
const textAlignStyle = {
  right: `
sl-input::part(input){
  text-align: right;
}`,
  center: `  
sl-input::part(input){
  text-align: center;
}`,
  left: ``,
};

const disabledStyles = `
  sl-input::part(input){
    cursor: default;
  }
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function CopyTextView(props: CopyTextViewProps) {
  const { buttonStyle = "icon" } = props;

  const error = !props.loading && props.error;
  const inputText = error ? props.inputPlaceholderText : props.copyString;
  const disabled = error || props.loading || props.disabled;
  const tooltipPlacement =
    props.buttonStyle === "button-below"
      ? "bottom"
      : props.buttonStyle === "button-outside"
      ? "top"
      : "top-end";

  const copyButton = (
    <sl-tooltip
      trigger="manual"
      content={props.tooltiptext}
      placement={tooltipPlacement}
      disabled={props.disabled}
      open={props.open}
      skidding={props.buttonStyle === "icon" ? -5 : 0}
      slot="suffix"
    >
      {buttonStyle === "icon" ? (
        <sl-icon-button
          exportparts="base: icon-button-base"
          onClick={() => props.onClick?.()}
          name="files"
          disabled={disabled}
        />
      ) : (
        <sl-button
          exportparts="base: copy-button-base"
          onClick={() => props.onClick?.()}
          size={"medium"}
          style={{ width: `${buttonStyle === "button-below" && "100%"}` }}
          disabled={disabled}
          type="primary"
        >
          {props.copyButtonLabel || "Copy"}
        </sl-button>
      )}
    </sl-tooltip>
  );

  return (
    <div class={sheet.classes.ContainerDiv}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
        {textAlignStyle[props.textAlign]}
        {disabled && disabledStyles}
      </style>

      <div
        class={sheet.classes.containerStyle}
        style={{
          flexDirection: `${buttonStyle === "button-below" ? "column" : "row"}`,
        }}
      >
        <sl-input
          class={`${sheet.classes.inputStyle} ${
            error ? sheet.classes.inputErrorStyle : ""
          }`}
          exportparts="base: input-base, input: input-label"
          value={props.loading ? "Loading..." : inputText}
          readonly
          disabled={disabled}
        >
          {buttonStyle === "icon" && copyButton}
          {error && (
            <p slot="help-text" class={sheet.classes.errorTextStyle}>
              {props.errorText}
            </p>
          )}
        </sl-input>
        {(buttonStyle === "button-outside" || buttonStyle === "button-below") &&
          copyButton}
      </div>
      {props.isCopied &&
        props.showNotificationText &&
        props.notificationText && (
          <p
            part="sqm-notification-text"
            class={sheet.classes.notificationTextStyle}
          >
            {props.notificationText}
          </p>
        )}
    </div>
  );
}
