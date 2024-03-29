import { css } from "styled-components";

export const Item = css`
  padding: var(--sq-spacing-x-small);
  cursor: pointer;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  border-radius: inherit;
  &:hover {
    background: var(--sq-surface-hover);
  }
`;

export const ItemDisabled = css`
  ${Item}
  cursor: default;
  background: var(--sq-surface-subdued);
  color: var(--sq-placeholder-text-on-secondary);

  &:hover {
    background: var(--sq-surface-subdued);
  }
`;

export const ItemContainer = css`
  position: absolute;
  z-index: 9;
  box-sizing: border-box;
  list-style-type: none;
  width: 100%;
  padding: 0;
  margin: 0;
  background: var(--sq-surface);
  border: 1px solid var(--sq-focused);
  border-radius: 0 0 var(--sq-border-radius-normal)
    var(--sq-border-radius-normal);
  border-top: none;
  outline: none;
  overflow-y: auto;

  &:empty {
    border: none;
  }
`;

export const ButtonContainer = css`
  position: absolute;
  display: flex;
  align-items: center;
  text-indent: 0px;
  padding-right: var(--sq-spacing-small);
  right: 0px;
  top: 5px;
  & > :not(:last-child) {
    margin-right: var(--sq-spacing-x-small);
  }
`;

export const ItemDescription = css`
  color: var(--sq-text-subdued);
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-regular);
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
  min-height: 36px;
  max-height: 100%;
  box-sizing: border-box;
  text-indent: 6px;
  color: var(--sq-text);
  background: var(--sq-surface);
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  border: 1px solid var(--sq-border);
  // border-radius: var(--sq-border-radius-normal);
  padding: 1px var(--sq-spacing-x-small);

  &:focus {
    border-color: var(--sq-focused);
  }
`;

export const SelectedValue = css`
  padding-top: var(--sq-spacing-xxx-small);
  margin: 4px 0 auto;
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

  & svg {
    &:hover {
      cursor: pointer;
    }
  }

  & > :not(:last-child) {
    margin-right: var(--sq-spacing-xx-small);
  }
`;

export const TagsSlotWrapper = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: auto;
  gap: var(--sq-spacing-xx-small);
  max-width: 100%;
`;

export const EmptyContainerDiv = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sq-spacing-xx-small);
  flex-direction: column;
  min-height: 50px;
`;

export const LabelSpan = css`
  font-weight: var(--sq-font-weight-bold);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  text-align: center;
`;

export const ComboboxContainerDiv = css`
  display: flex;
  border: 1px solid var(--sq-border);
  border-radius: var(--sq-border-radius-normal);
  flex-wrap: wrap;
  &:focus {
    outline: none;
    border-color: var(--sq-focused);
  }
`;

export const InputWrapperDiv = css`
  flex-grow: 1;
`;
