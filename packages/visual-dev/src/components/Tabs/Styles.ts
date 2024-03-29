import { css } from "styled-components";

export const root = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  border-bottom: 1px solid var(--sq-border);
  width: 100%;
`;

export const Tab = css`
  cursor: pointer;
`;

export const defaultTabStyle = css`
  border-bottom: 2px solid transparent;

  padding: 12px 32px;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid #575757;
  }

  &.disabled {
    color: var(--sq-text-subdued);
    cursor: default;
  }
`;
