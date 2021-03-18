import { h } from "@stencil/core";
import { css } from "emotion";

export interface ShareLinkViewProps {
  sharelink: string;
  open: boolean;

  disabled?: boolean;
  tooltiptext: string;

  onClick?: () => void;
}

const copyInput = css`
  &::part(base) {
    background: white;
    opacity: 1;
    cursor: pointer;
  }
`;

export function ShareLinkView(props: ShareLinkViewProps) {
  return (
    <div>
      <sl-tooltip
        trigger="manual"
        content={props.tooltiptext}
        placement="top-end"
        disabled={props.disabled}
        open={props.open}
      >
        <sl-input class={copyInput} value={props.sharelink} disabled readonly>
          <sl-icon-button
            onClick={() => props.onClick?.()}
            slot="suffix"
            name="clipboard"
            disabled={props.disabled}
          />
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
