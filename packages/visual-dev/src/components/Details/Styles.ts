import { css } from "styled-components";

export const DivStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--sq-spacing-small);
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
`;

export const SummaryContainerDivStyle = css`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--sq-spacing-x-small);
  cursor: pointer;
`;

export const ParagraphStyle = css`
  margin: 0;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  color: var(--sq-text);
`;
