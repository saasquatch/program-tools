import { css } from "styled-components";

export const base = css`
  padding: var(--sq-spacing-xxx-small) var(--sq-spacing-medium);
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  width: max-content;
`;

export const pill_false = css`
  border-radius: var(--sq-border-radius-normal);
`;
export const pill_true = css`
  border-radius: var(--sq-border-radius-pill);
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
  background-color: var(--sq-badge-surface-warning);
  border-color: var(--sq-badge-surface-warning);
  color: var(--sq-text);
`;

export const small = css`
  padding: var(--sq-spacing-xxx-small) var(--sq-spacing-xx-small);
  font-weight: var(--sq-font-weight-regular);
`