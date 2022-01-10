import { css } from "styled-components";

export const Container = css`
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-button-medium);
  font-family: var(--sq-font-family-sans);
`;

export const Label = css`
  font-weight: var(--sq-font-weight-semibold);
  display: block;
  color: var(--sq-text);
  margin: 0 0 var(--sq-spacing-small);
`;

export const Description = css`
  color: var(--sq-text-subdued);
  display: contents;
  & > p {
    margin: var(--sq-spacing-xx-small) 0 0 !important;
  }
`;

export const RequiredLabel = css`
  color: var(--sq-placeholder-text-on-secondary);
`;

export const HelpText = css`
  color: var(--sq-text-subdued);
  display: contents;
  & > p {
    margin: var(--sq-spacing-small) 0 0;
  }
`;

export const Errors = css`
  color: var(--sq-on-surface-critical);
  display: contents;
  & > * {
    margin: var(--sq-spacing-small) 0 0 !important;
  }
`;
