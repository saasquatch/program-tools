import { css } from "styled-components";

export const base = css`
  padding: var(--sq-spacing-x-small) 10px;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sq-spacing-x-small);
  max-height: 25px;
`;

export const pill_false = css`
  border-radius: var(--sq-border-radius-normal);
`;
export const pill_true = css`
  border-radius: var(--sq-border-radius-pill);
`;

export const default_style = css`
  background-color: var(--sq-border);
  border: 1px solid var(--sq-text-subdued);
  color: var(--sq-text);
`;

export const success = css`
  background-color: var(--sq-surface-success-subdued);
  border: 1px solid var(--sq-surface-success);
  color: var(--sq-badge-text-success);
`;

export const critical = css`
  background-color: var(--sq-surface-critical-subdued);
  border: 1px solid var(--sq-badge-text-critical);
  color: var(--sq-badge-text-critical);
`;

export const warning = css`
  background-color: var(--sq-surface-warning-subdued);
  border: 1px solid var(--sq-surface-warning);
  color: var(--sq-badge-text-warning);
`;

export const info = css`
  background-color: var(--sq-badge-surface-info);
  border: 1px solid var(--sq-border-info);
  color: var(--sq-badge-text-info);
`;

export const small = css`
  padding: var(--sq-spacing-xxx-small) var(--sq-spacing-xx-small);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-small);
  gap: var(--sq-spacing-xx-small);
  height: var(--sq-spacing-medium);
`;
