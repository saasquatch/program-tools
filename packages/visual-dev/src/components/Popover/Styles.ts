import { css } from "styled-components";

export const StyledSection = css`
  box-sizing: border-box;
  padding: 12px 24px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--sq-border);
  }
`;

export const StyledAction = css`
  padding: 0px;
  box-sizing: border-box;
  font-size: var(--sq-font-size-small);
  text-decoration: none;
  color: var(--sq-action-primary);
`;

export const StyledContainer = css`
  position: absolute;
  z-index: 999;
  background: var(--sq-surface);
  max-width: 300px;
  width: fit-content;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid var(--sq-border);
  color: var(--sq-text);
  font-size: var(--sq-font-size-small);
  line-height: var(--sq-line-height-regular);
  font-family: var(--sq-font-family-sans);
  box-shadow: 3px 3px 7px 0px #00000014;
`;
