import { css } from "styled-components";

export const Item = css`
  padding: var(--sq-spacing-x-small);
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  border-radius: inherit;
  &:hover {
    background: var(--sq-surface-hover);
  }
`;

export const ItemContainer = css`
  position: absolute;
  min-width: inherit;
  z-index: 100;
  box-sizing: border-box;
  list-style-type:none;
  width: 300px;
  padding: 0;
  background: var(--sq-surface);
  border: 2px solid var(--sq-border);
  border-radius: 0 0 4px 4px;
  border-top: none;
  top: 28px;

  &:empty {
    border: none;
  }
`;

export const SelectInputStyle = css`
  cursor:pointer;
  display: flex;
  justify-content: space-between;
  align-items: center
  position: relative;
  width: 300px;
  height: 30px;
  text-indent: 6px;
  color: var(--sq-text);
  background: var(--sq-surface);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  border: 2px solid var(--sq-border);
  border-radius: 4px;
`;