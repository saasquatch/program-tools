import { h } from '@stencil/core';

export interface ShareLinkViewProps {
  buttondisabled?: boolean;
  icon?: string;
  iconlabel?: string;

  tooltiptext?: string;
  disabletooltip?: boolean;

  customstyle?: string;
}

const copyInput = `
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
        style={`
          margin-top: 12px;
        `}
        content={props.tooltiptext}
        placement="top-end"
      >
        <sl-input style={`${copyInput} `} value="https://ssqt.co" disabled readonly>
          <sl-icon-button name="clipboard" />
        </sl-input>
      </sl-tooltip>
    </div>
  );
}
