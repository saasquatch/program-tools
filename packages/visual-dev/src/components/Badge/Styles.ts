import { css } from "styled-components";

export const base = css`
  padding: var(--sq-spacing-xx-small) var(--sq-spacing-large);
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  width: max-content;
`;

export const pill_false = css`
  border-radius: 4px;
`;
export const pill_true = css`
  border-radius: 50px;
`;

export const info = css`
  background-color: var(--sq-border);
  border-color: var(--sq-border);
  color: var(--sq-text);
`;

export const success = css`
  background-color: var(--sq-surface-success);
  border-color: var(--sq-border-success);
  color: var(--sq-surface);
`;

export const critical = css`
  background-color: var(--sq-surface-critical);
  border-color: var(--sq-surface-critical);
  color: var(--sq-surface);
`;

export const warning = css`
  background-color: var(--sq-border-warning);
  border-color: var(--sq-border-warning);
  color: var(--sq-surface);
`;
