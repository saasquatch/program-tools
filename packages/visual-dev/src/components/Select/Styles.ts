import { css } from "styled-components";

export const Item = css`
  padding: 15px;
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  border-radius: inherit;
  &:hover {
    background: var(--sq-surface-hover);
  }
`;

export const ItemContainer = css`
  position: relative;
  width: max-content;
  min-width: inherit;
  z-index: 100;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid var(--sq-action-secondary-border);
  box-sizing: border-box;
  &:empty {
    border: none;
  }
`;

export const IconStyle = css`
  position: relative;
  width: 22px;
  bottom: 28px;
`;
