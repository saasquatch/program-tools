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
  z-index: 100;
  box-sizing: border-box;
  list-style-type: none;
  width: 100%;
  padding: 0;
  background: var(--sq-surface);
  border: 2px solid var(--sq-focused);
  border-radius: 0 0 4px 4px;
  border-top: none;
  top: 17px;
  outline: none;

  &:empty {
    border: none;
  }
`;

export const ButtonContainer = css`
  position: absolute;
  right: 100%;
  display: flex;
  align-items: center;
  text-indent: 0px;
  padding-right: var(--sq-spacing-small);
  right: 4px;
  top: 10px;

  & > :not(:last-child) {
    margin-right: var(--sq-spacing-x-small);
  }
`;

export const ItemDescription = css`
  color: var(--sq-text-subdued);
  font-size: var(--sq-font-size-small);
`;

export const Container = css`
  display: inline-block;
  width: 100%;
  position: relative;
`;

export const SelectInputStyle = css`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  text-indent: 6px;
  color: var(--sq-text);
  background: var(--sq-surface);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  border: 2px solid var(--sq-border);
  border-radius: 4px;
  padding: 1px 6px;

  &:focus {
    border-color: var(--sq-focused);
  }
`;

export const SelectedValue = css`
  padding-top: var(--sq-spacing-xxx-small);
  margin: auto 0;
  text-indent: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ButtonDiv = css`
  display: flex;
  align-items: center;
  text-indent: 0px;
  padding: 2px 4px 0px;
  margin: auto 0;

  & > :not(:last-child) {
    margin-right: var(--sq-spacing-xx-small);
  }
`;
