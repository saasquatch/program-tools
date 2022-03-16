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
  display: contents;
  & > p {
    color: var(--sq-text-subdued) !important;
    margin: var(--sq-spacing-xx-small) 0 0;
  }
`;

export const RequiredLabel = css`
  color: var(--sq-placeholder-text-on-secondary);
`;

export const HelpText = css`
  display: contents;
  & > p {
    color: var(--sq-text-subdued) !important;
    margin: var(--sq-spacing-small) 0 0;
  }
`;

export const Errors = css`
  margin: var(--sq-spacing-small) 0;
  padding-left: 0;
  list-style-type: none;
  & > * {
    color: var(--sq-on-surface-critical);
    margin: var(--sq-spacing-small) 0 0 !important;
  }
`;

export const ErrorItem = css`
  & > span {
    margin-left: var(--sq-spacing-x-small);
  }
`;
