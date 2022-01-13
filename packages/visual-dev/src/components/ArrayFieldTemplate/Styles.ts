import { css } from "styled-components";

export const Container = css``;

export const FieldContainer = css`
  margin: 0 0 var(--sq-spacing-xx-large);
`;

export const FrontMatterContainer = css`
  margin: 0 0 var(--sq-spacing-xx-large);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-button-medium);
  font-family: var(--sq-font-family-sans);
`;

export const Title = css`
  color: var(--sq-text);
  font-weight: var(--sq-font-weight-semibold);
  font-size: var(--sq-font-size-caption);
`;

export const Description = css`
  color: var(--sq-text-subdued);
  margin: var(--sq-spacing-small) 0 0;
`;

export const RequiredLabel = css`
  color: var(--sq-placeholder-text-on-secondary);
`;
