import { css } from "emotion";

export const H2 = css`
  font-size: var(--sl-font-size-large);
  font-weight: 600;
  margin: 0;
`;

export const H4 = css`
  font-size: var(--sl-font-size-medium);
  font-weight: 600;
  margin: 0;
`;

export const P = css`
  font-size: var(--sl-font-size-small);
  color: var(--sl-color-gray-800);
  margin-top: 0px;

  &.subtitle {
    color: var(--sl-color-gray-500);
    margin: 0px;
  }
`;
