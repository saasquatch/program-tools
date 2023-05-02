import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";

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
  inputPlaceholderText?: string;
  dateAvailable?: string;
  loading?: boolean;

  onClick?: () => void;
}

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(input)": { textOverflow: "ellipsis" },
    "&::part(base)": { cursor: "pointer" },
    width: "100%",
  },
  inputErrorStyle: {
    "&::part(base)": {
      border: "2px solid red",
    },
  },
  containerStyle: {
    display: "flex",
    alignItems: "center",
    gap: "var(--sl-spacing-x-small)",
  },
  errorTextStyle: {
    margin: "0",
    color: "var(--sl-color-danger-500)",
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

  const copyButton =
    buttonStyle === "icon" ? null : (
      <sl-button
        onClick={() => props.onClick?.()}
        size={"medium"}
        style={{ width: `${buttonStyle === "button-below" && "100%"}` }}
        disabled={props.disabled}
        slot="suffix"
        type="primary"
      >
        {props.copyButtonLabel || "Copy"}
      </sl-button>
    );

  const error = !props.loading && props.error;
  const inputText = error ? props.inputPlaceholderText : props.copyString;
  const disabled = error || props.loading || props.disabled;
  const tooltipPlacement =
    props.buttonStyle === "button-below" ? "top" : "top-end";

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
        {textAlignStyle[props.textAlign]}
        {disabled && disabledStyles}
      </style>
      <sl-tooltip
        trigger="manual"
        content={props.tooltiptext}
        placement={tooltipPlacement}
        disabled={disabled}
        open={props.open}
        skidding={props.buttonStyle === "icon" ? -20 : 0}
      >
        <div
          class={sheet.classes.containerStyle}
          style={{
            flexDirection: `${
              buttonStyle === "button-below" ? "column" : "row"
            }`,
            width: "100%",
          }}
        >
          <sl-input
            class={`${sheet.classes.inputStyle} ${
              error ? sheet.classes.inputErrorStyle : ""
            }`}
            exportparts="label: input-label"
            value={props.loading ? "Loading..." : inputText}
            readonly
            disabled={disabled}
          >
            {buttonStyle === "icon" && (
              <sl-icon-button
                onClick={() => props.onClick?.()}
                slot="suffix"
                name="files"
                disabled={disabled}
              />
            )}
            {error && (
              <p slot="help-text" class={sheet.classes.errorTextStyle}>
                {props.errorText}
              </p>
            )}
          </sl-input>
          {(buttonStyle === "button-outside" ||
            buttonStyle === "button-below") &&
            copyButton}
        </div>
      </sl-tooltip>
    </div>
  );
}
