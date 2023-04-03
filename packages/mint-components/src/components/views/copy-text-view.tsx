import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock } from "../../global/mixins";

export interface CopyTextViewProps {
  copyString: string;
  open: boolean;
  disabled?: boolean;
  tooltiptext: string;
  isCopyIcon?: boolean;
  textAlign?: "left" | "center";

  onClick?: () => void;
}

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(base)": { background: "white", opacity: "1", cursor: "pointer" },
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
  const { isCopyIcon = true } = props;

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
        <sl-input
          class={sheet.classes.inputStyle}
          exportparts="label: input-label"
          value={props.copyString}
          readonly
        >
          {isCopyIcon ? (
            <sl-icon-button
              onClick={() => props.onClick?.()}
              slot="suffix"
              name="files"
              disabled={props.disabled}
            />
          ) : (
            <sl-button
              onClick={() => props.onClick?.()}
              slot="suffix"
              name="files"
              size="small"
              disabled={props.disabled}
            >
              Copy
            </sl-button>
          )}
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
