import { css } from "styled-components";

export const base = css`
  position: relative;
  min-width: 191px;
  display: inline-block;
`;
export const subcontent = css`
  border-radius: inherit;
`;

export const subitem = css`
  text-indent: 15px;
  border-radius: inherit;
`;

export const sublist = css`
  padding: 15px;
  border-radius: inherit;
  user-select: none;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const arrow = css`
  margin-left: auto;
  svg {
    width: 12px;
    height: auto;
  }
`;

export const button = css`
  display: flex;
  user-select: none;
  padding: 7px 12px;
  border: 1px solid var(--sq-action-secondary-border);
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const content = css`
  position: absolute;
  width: max-content;
  min-width: inherit;
  z-index: 100;
  background: #ffffff;
  border: 1px solid var(--sq-action-secondary-border);
  box-sizing: border-box;
  &:empty {
    border: none;
  }
`;

export const item = css`
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
