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
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  buttonType?: "primary" | "secondary" | "tertiary";
  borderColor?: string;
  onClick?: () => void;
}

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

export function CopyTextView(props: CopyTextViewProps) {
  const { buttonStyle = "icon" } = props;

  const style = {
    HostBlock: HostBlock,
    inputStyle: {
      "&::part(input)": {
        textOverflow: "ellipsis",
        width: "100%",
        color: props.textColor || "var(--sqm-text)",
      },
      "&::part(base)": {
        "--sl-input-border-radius": "var(--sqm-border-radius-normal)",
        "--sl-input-background-color": "var(--sl-color-white)",
        "--sl-input-color": "var(--sqm-text)",
        "--sl-input-border-color": "#D6D8F0",
        "--sl-input-border-color-hover": "#999999",
        "--sl-input-border-color-focus": "#999999",
        "--sl-input-color-hover": "var(--sqm-input-color-hover)",
        "--sl-input-color-focus": "var(--sqm-input-color-focus)",
        "--sl-input-color-disabled": "var(--sqm-input-disabled-color)",
        "--sl-input-background-color-focus": "var(--sqm-portal-background)",
        "--sl-input-background-color-hover": "var(--sqm-portal-background)",
        cursor: "pointer",
        overflow: "visible",
        borderRadius:
          `${props.borderRadius}px` || "var(--sqm-border-radius-normal)",
        background: props.backgroundColor || "var(--sqm-portal-background)",
        border: `1px solid ${props.borderColor || "#d4d4d8"}`,
      },
      width: "100%",
    },
    icon: {
      "&::part(base)": {
        color: props.textColor || "var(--sqm-text)",
      },
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
      color: "var(--sqm-danger-color-text)",
    },
    notificationTextStyle: {
      margin: "0",
      color: "inherit",
    },
  };

  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

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
          class={sheet.classes.icon}
          exportparts="base: icon-button-base"
          onClick={() => props.onClick?.()}
          name="files"
          disabled={disabled}
        />
      ) : (
        <sl-button
          exportparts={`base: ${props.buttonType || "primary"}button-base`}
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
