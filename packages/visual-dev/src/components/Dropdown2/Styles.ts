import { css } from "styled-components";

export const DropdownDiv = css`
  position: relative;
  display: inline-block;
`;

export const ContentDiv = css`
  position: absolute;
  width: max-content;
  min-width: inherit;
  z-index: 100;
  background: var(--sq-surface);
  box-shadow: 0px 1px 4px var(--iui-serenity-gray);
  border-radius: var(--sq-border-radius-normal);
  box-sizing: border-box;
  padding: var(--sq-spacing-xx-small);
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
  border-radius: var(--sq-border-radius-normal);
  &:hover {
    background: var(--iui-pale-gray);
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
  color: var(--sq-text-subdued);
`;

export const EmptyTextSpan = css`
  color: var(--sq-text-subdued);
  font-size: var(--sq-font-size-regular);
  font-style: italic;
`;

export const SublistDiv = css`
  border-radius: inherit;
`;

export const SubItemDiv = css`
  text-indent: var(--sq-spacing-small);
  border-radius: inherit;
`;

export const DropdownSublistDiv = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  border-radius: inherit;
  user-select: none;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const MenuPosition = {
  left: css`
    right: 0;
  `,
  center: css`
    transform: translateX(50%);
    right: 50%;
  `,
  right: css``,
};
