import { h } from "@stencil/core";

export interface ShareLinkViewProps {
  sharelink: string;
  open: boolean;

  disabled?: boolean;
  tooltiptext: string;

  onClick?: () => void;
}

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
        <sl-input value={props.sharelink} disabled readonly>
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
