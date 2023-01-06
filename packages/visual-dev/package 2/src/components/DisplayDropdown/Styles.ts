import { css } from "styled-components";

export const MenuContainerDiv = css`
  position: relative;
  width: min-content;
  cursor: pointer;
`;

export const HandleDiv = css`
  color: var(--sq-text);
  font-size: var(--sq-font-size-regular);
  width: max-content;
  display: flex;
  align-items: center;
  gap: var(--sq-spacing-x-small);
`;

export const MenuDiv = css`
  position: absolute;
  background-color: var(--sq-surface);
  border: 1px solid var(--sq-border);
  border-radius: var(--sq-border-radius-normal);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.08);
  min-width: 80px;
  transform: translate(-16%,-45%);;
`;

export const MenuItemDiv = css`
  font-size: var(--sq-font-size-regular);
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  box-sizing: border-box;
  cursor: pointer;
  min-width: 200px;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  overflow: hidden;
  &:hover {
    background: #fafafa;
  }
`;