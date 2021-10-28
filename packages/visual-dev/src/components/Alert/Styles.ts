import { css } from "styled-components";

export const AlertDivStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  border: 1px solid;
  border-radius: 5px;
  box-sizing: border-box;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  div + div {
    padding-left: 16px;
  }
`;

export const critical = css`
  background-color: var(--sq-surface-critical-subdued);
  border-color: var(--sq-border-critical);
`;

export const warning = css`
  background-color: var(--sq-surface-warning-subdued);
  border-color: var(--sq-border-warning);
`;

export const success = css`
  background-color: var(--sq-surface-success-subdued);
  border-color: var(--sq-border-success);
`;

export const info = css`
  background-color: var(--sq-background);
  border-color: var(--sq-border);
`;
