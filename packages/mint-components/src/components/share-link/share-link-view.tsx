import { h } from '@stencil/core';
import { css } from 'emotion';

export interface ShareLinkViewProps {
  buttondisabled?: boolean;
  icon?: string;
  iconlabel?: string;

  tooltiptext?: string;
  disabletooltip?: boolean;

  customstyle?: string;
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
      >
        <sl-input
          class={copyInput}
          css={css`
            ${props.customstyle}
          `}
          value="https://ssqt.co"
          disabled
          readonly
        >
          <sl-icon-button slot="suffix" name="clipboard"/>
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
