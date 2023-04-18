import { Host, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock, P } from "../../global/mixins";
import { RewardStatusType } from "../sqm-coupon-code/useCouponCode";

export interface CopyTextViewProps {
  copyString: string;
  tooltiptext: string;
  open: boolean;
  copyButtonLabel?: string;
  disabled?: boolean;
  textAlign?: "left" | "center";
  buttonStyle?: "button inside" | "button outside" | "button below" | "icon";
  rewardStatus?: RewardStatusType;
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
    gap: "8px",
  },
  errorTextStyle: {
    margin: "0",
    color: "red",
  },
};

const vanillaStyle = `
  :host{
    display: block;   
    width: 100%;
  }
`;
const textAlignStyle = `
  :host{
    display: block;
  }
  sl-input::part(input){
    text-align: center;
  }
`;
const loadingStyles = `
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
        size={`${buttonStyle == "button inside" ? "small" : "medium"}`}
        style={{ width: `${buttonStyle === "button below" && "100%"}` }}
        disabled={props.disabled}
        slot="suffix"
        type="primary"
      >
        {props.copyButtonLabel || "Copy"}
      </sl-button>
    );

  const error =
    !props.loading && props.rewardStatus && props.rewardStatus !== "AVAILABLE";
  const inputText = error ? props.inputPlaceholderText : props.copyString;

  return (
    <div>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
        {props.textAlign === "center" && textAlignStyle}
        {props.loading && loadingStyles}
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
            value={props.loading ? "Loading..." : inputText}
            readonly
            disabled={props.loading}
          >
            {buttonStyle === "icon" ? (
              <sl-icon-button
                onClick={() => props.onClick?.()}
                slot="suffix"
                name="files"
                disabled={props.disabled || props.loading}
              />
            ) : (
              buttonStyle === "button inside" && copyButton
            )}
          </sl-input>
          {(buttonStyle === "button outside" ||
            buttonStyle === "button below") &&
            copyButton}
        </div>
        {error && <p class={sheet.classes.errorTextStyle}>{props.errorText}</p>}
      </sl-tooltip>
    </div>
  );
}
