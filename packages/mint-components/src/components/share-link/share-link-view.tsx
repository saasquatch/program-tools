import { h } from '@stencil/core';
import { css } from 'emotion';

export interface ShareLinkViewProps {
  sharelink: string;

  disabled?: boolean;
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;

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
        css={css`
          margin-top: 12px;
        `}
        content={props.tooltiptext}
        placement="top-end"
        disabled={props.disabled}
      >
        <sl-input class={copyInput} value={props.sharelink} disabled readonly>
          <sl-icon-button onClick={props.onClick} slot="suffix" name="clipboard" disabled={props.disabled} />
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
