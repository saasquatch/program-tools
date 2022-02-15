import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";
import { HostBlock } from "../../global/mixins";

export interface ShareLinkViewProps {
  shareString: string;
  open: boolean;
  disabled?: boolean;
  tooltiptext: string;
  onClick?: () => void;
}

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(base)": { background: "white", opacity: "1", cursor: "pointer" },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function ShareLinkView(props: ShareLinkViewProps) {
  return (
    <div>
      <style type="text/css">{styleString}</style>
      <sl-tooltip
        trigger="manual"
        content={props.tooltiptext}
        placement="top-end"
        disabled={props.disabled}
        open={props.open}
      >
        <sl-input
          class={sheet.classes.inputStyle}
          exportparts="label: input-label"
          value={props.shareString}
          readonly
        >
          <sl-icon-button
            onClick={() => props.onClick?.()}
            slot="suffix"
            name="files"
            disabled={props.disabled}
          />
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
