import { h } from '@stencil/core';
import { css } from 'emotion';
import { useState } from 'haunted';

export interface ShareLinkViewProps {
  sharelink: string;

  disabled?: boolean;
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
  tooltiplifespan?: number;

  onClick?: () => void;
}

const copyInput = css`
  &::part(base) {
    background: white;
    opacity: 1;
    cursor: pointer;
  }
`;

const DEFAULT_TOOLTIP_LIFESPAN = 1000;

export function ShareLinkView(props: ShareLinkViewProps) {
  const [open, setOpen] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(props.sharelink);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan ?? DEFAULT_TOOLTIP_LIFESPAN);
  }

  return (
    <div>
      <sl-tooltip
        css={css`
          margin-top: 12px;
        `}
        trigger="manual"
        content={props.tooltiptext}
        placement="top-end"
        disabled={props.disabled}
        open={open && props.tooltiptext}
      >
        <sl-input class={copyInput} value={props.sharelink} disabled readonly>
          <sl-icon-button
            onClick={() => {
              onClick();
              props.onClick?.();
            }}
            slot="suffix"
            name="clipboard"
            disabled={props.disabled}
          />
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
