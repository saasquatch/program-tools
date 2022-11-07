import { css } from "styled-components";


export const ContainerDiv = css`
  min-width: 280px;
  max-width: 280px;
  border: 2px solid var(--sq-border);
  padding: var(--sq-spacing-xx-small) var(--sq-spacing-x-small);
  display: flex;
  flex-wrap: wrap;
  gap: var(--sq-spacing-xx-small);
  border-radius: var(--sq-border-radius-normal);
`;

export const StyledInputSpan = css`
  display: inline-block;
  padding: var(--sq-spacing-xxx-small);
  border: none;
  line-height: 28px;
  outline-width: 0;
  font-size: 14px;
  flex: 1 1 100px;
  max-width: 100%;
`;

export const TagDiv = css`
  background: var(--sq-surface-subdued);
  border-radius: var(--sq-border-radius-normal);
  border: 1px solid var(--sq-border);
  display: grid;
  grid-template-columns: auto min-content;
  grid-gap: var(--sq-spacing-xx-small);
  align-items: center;
  padding: var(--sq-spacing-xx-small) var(--sq-spacing-x-small);

  & svg {
    cursor: pointer;
  }
`;

export const customButtonCSS = css`
  &:hover {
    background: none;
    color: var(--sq-text-dark);
  }
`;