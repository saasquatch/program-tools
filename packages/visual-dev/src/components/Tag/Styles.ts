import { css } from "styled-components";

export const base = css`
  display: flex;
  flex-direction: row;
  background: var(--sq-background);
  box-sizing: border-box;
  align-items: center;
  width: max-content;
  border: 1px solid var(--sq-border);
  border-radius: 2px;
`;

export const textSegment = css`
  box-sizing: border-box;
  border-left: 1px solid var(--sq-border);
  padding: var(--sq-spacing-xx-small) var(--sq-spacing-x-small);
  font-weight: 400;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  font-family: var(--sq-font-family-sans);
  color: var(--sq-text-dark);
`;

export const iconSegment = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 3px 7px;
  width: 28px;
  height: 26px;
  fill: var(--sq-text-subdued);
  &:hover {
    background: #f4f4f4;
    fill: var(--sq-text-dark);
    cursor: pointer;
  }
  & svg {
    &:hover {
      cursor: pointer;
    }
  }
`;
