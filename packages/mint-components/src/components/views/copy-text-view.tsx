import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";

export interface CopyTextViewProps {
  copyString: string;
  tooltiptext: string;
  open: boolean;
  copyButtonLabel?: string;
  disabled?: boolean;
  textAlign?: "left" | "center";
  buttonStyle?: "button inside" | "button outside" | "button below" | "icon";
  errorState?: "REDEEMED" | "CANCELLED" | "EXPIRED" | "PENDING";
  pendingErrorText?: string;
  cancelledErrorText?: string;
  expiredErrorText?: string;
  redeemedErrorText?: string;
  inputPlaceholderText?: string;

  onClick?: () => void;
}

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(base)": { background: "white", opacity: "1", cursor: "pointer" },
    "&::part(input)": { textOverflow: "ellipsis" },
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
    gap: "8px",
  },
  errorTextStyle: {
    margin: "0",
    color: "red",
  },
};

const textAlignStyle = `
  :host{
    display: block;
  }
  sl-input::part(input){
    text-align: center;
  }
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function CopyTextView(props: CopyTextViewProps) {
  const {
    buttonStyle = "icon",
    pendingErrorText = "Oops! Looks like we weren’t able to retrieve a code for you. Please try again later or contact support.",
    cancelledErrorText = "Oops! Your coupon code is cancelled. Please try again later or contact support.",
    expiredErrorText = "Oops! Your coupon code is expired. Please try again later or contact support.",
    redeemedErrorText = "Oops! Your coupon code has already been redeemed. Please try again later or contact support.",
  } = props;

  const copyButton =
    buttonStyle === "icon" ? null : (
      <sl-button
        onClick={() => props.onClick?.()}
        size="small"
        style={{ width: `${buttonStyle === "button below" && "100%"}` }}
        disabled={props.disabled}
        slot="suffix"
        type="primary"
      >
        {props.copyButtonLabel || "Copy"}
      </sl-button>
    );

  const error = props.errorState;
  const errorText =
    props.errorState === "CANCELLED"
      ? cancelledErrorText
      : props.errorState === "PENDING"
      ? pendingErrorText
      : props.errorState === "EXPIRED"
      ? expiredErrorText
      : props.errorState === "REDEEMED"
      ? expiredErrorText
      : "An error occured";

  const inputText =
    !props.copyString || error ? props.inputPlaceholderText : props.copyString;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {props.textAlign === "center" && textAlignStyle}
      </style>
      <sl-tooltip
        trigger="manual"
        content={props.tooltiptext}
        placement="top-end"
        disabled={props.disabled}
        open={props.open}
        skidding={-20}
      >
        <div
          class={sheet.classes.containerStyle}
          style={{
            flexDirection: `${
              buttonStyle === "button below" ? "column" : "row"
            }`,
            width: "100%",
          }}
        >
          <sl-input
            class={`${sheet.classes.inputStyle} ${
              error ? sheet.classes.inputErrorStyle : ""
            }`}
            exportparts="label: input-label"
            value={inputText}
            readonly
            style={{}}
          >
            {buttonStyle === "icon" ? (
              <sl-icon-button
                onClick={() => props.onClick?.()}
                slot="suffix"
                name="files"
                disabled={props.disabled}
              />
            ) : (
              buttonStyle === "button inside" && copyButton
            )}
          </sl-input>
          {(buttonStyle === "button outside" ||
            buttonStyle === "button below") &&
            copyButton}
        </div>
        {error && <p class={sheet.classes.errorTextStyle}>{errorText}</p>}
      </sl-tooltip>
    </div>
  );
}
