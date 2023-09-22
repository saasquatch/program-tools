import { css } from "styled-components";

export const ItemDiv = css`
  padding: var(--sq-spacing-x-small) var(--sq-spacing-small);
  color: var(--sq-text);
  position: relative;
  left: -1px;
  cursor: pointer;

  &:hover {
    background: var(--sq-surface-subdued);
  }
`;

export const ContainerDiv = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: max-content;
  margin: auto;
  border-left: 1px solid var(--sq-border);
  max-width: 180px;
`;
