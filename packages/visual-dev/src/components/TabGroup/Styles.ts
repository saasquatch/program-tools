import { css } from "styled-components";

export const tabgroup = css`
  display: flex;
`;

export const tab = css`
  font: 700 18px Helvetica;
  font-weight: normal;
  padding: 15px 15px;
  margin: 4px 18px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  &:hover {
    color: inherit;
  }
`;
export const selected = css`
  color: inherit;
  border-color: inherit;
`;
export const primary_bg = css`
  background: var(--sq-nav-surface-primary);
`;
export const secondary_bg = css`
  background: var(--sq-nav-surface-secondary);
`;
export const primary_text = css`
  color: var(--sq-nav-text-on-primary);
`;
export const secondary_text = css`
  color: var(--sq-nav-text-on-secondary);
`;
export const primary_grey = css`
  color: var(--sq-nav-text-on-primary-subdued);
`;
export const secondary_grey = css`
  color: var(--sq-nav-text-on-secondary-subdued);
`;
