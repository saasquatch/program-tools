import { css } from "styled-components";

export const BarStyle = css`
  width: 100%;
  min-width: 110px;
`;

export const ListStyle = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--sq-spacing-x-small);
  list-style-position: inside;
  padding: 0;

  & .item-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--sq-spacing-x-small);
    align-items: flex-start;
    justify-content: center;
  }
`;
