import { css } from "styled-components";

export const AlertDiv = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: var(--sq-spacing-medium);
  border: 1px solid;
  border-radius: var(--sq-border-radius-normal);
  box-sizing: border-box;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  & > :first-child {
    margin-right: var(--sq-spacing-medium);
  }
`;

const textAlertStyle = css`
  background-color: transparent;
  border: none;
  padding: 0;
`;

export const critical = css`
  background-color: var(--sq-surface-critical-subdued);
  border-color: var(--sq-border-critical);
`;

export const textCritical = css`
  ${textAlertStyle}
`;

export const warning = css`
  background-color: var(--sq-surface-warning-subdued);
  border-color: var(--sq-border-warning);
`;

export const textWarning = css`
  ${textAlertStyle}
`;

export const success = css`
  background-color: var(--sq-surface-success-subdued);
  border-color: var(--sq-border-success);
`;

export const default_style = css`
  background-color: var(--sq-background);
  border-color: var(--sq-border);
`;

export const info = css`
  background-color: var(--sq-surface-info);
  border-color: var(--sq-border-info);
`;
