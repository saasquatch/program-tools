import { css } from "styled-components";

export const base = css`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: var(--sq-spacing-xxx-small);
  flex-direction: column;
`;

export const iconContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--sq-spacing-x-small);
`;

export const statusText = css`
  margin: 0;
  font-size: var(--sq-font-size-small);
  font-weight: var(--sq-font-weight-regular);
  color: var(--sq-text);
`;

export const descriptionText = css`
  margin: 0;
  font-size: var(--sq-font-size-small);
  font-weight: var(--sq-font-weight-regular);
  color: var(--iui-bleakest-gray);
`;
