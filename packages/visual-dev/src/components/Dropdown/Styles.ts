import { css } from "styled-components";

export const DropdownDiv = css`
  position: relative;
  min-width: 191px;
  display: inline-block;
`;
export const SublistDiv = css`
  border-radius: inherit;
`;

export const subitem = css`
  text-indent: var(--sq-spacing-x-large);
  border-radius: inherit;
`;

export const DropdownSublistDiv = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  border-radius: inherit;
  user-select: none;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-bold);
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

export const ButtonDiv = css`
  display: flex;
  user-select: none;
  padding: 7px 12px;
  border: 2px solid var(--sq-border);
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  cursor: pointer;
`;

export const ContentDiv = css`
  position: absolute;
  width: max-content;
  min-width: inherit;
  z-index: 100;
  background: #ffffff;
  border: 2px solid var(--sq-text-interactive);
  box-sizing: border-box;
  &:empty {
    border: none;
  }
`;

export const ItemDiv = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
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

export const ItemTitleContainerDiv = css`
  display: flex;
  align-items: center;
  & > *:not(last-child) {
    margin-right: var(--sq-spacing-xx-small);
  }
`;

export const ItemSideDescriptionSpan = css`
  font-size: var(--sq-font-size-regular);
  color: var(--sq-placeholder-text-on-secondary);
  margin-left: auto;
`;

export const ItemDescriptionP = css`
  margin: 0;
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-placeholder-text-on-secondary);
`;

export const PlaceHolderSpan = css`
  color: var(--sq-placeholder-text-on-secondary);
  font-size: inherit;
`;
