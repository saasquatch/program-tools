import { css } from "styled-components";

export const InputBoxStyle = css`
  position: relative;
  width: 300px;
  height: 30px;
  text-indent: 6px;
  color: var(--sq-text);
  background: var(--sq-surface);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);

  border: 2px solid var(--sq-border);
  border-radius: 4px;

  &::placeholder {
    color: var(--sq-text-input-disabled);
  }

  &:focus {
    outline: none;
    border-color: var(--sq-focused);
  }

  &:disabled {
    user-select: none;
    color: var(--sq-text-input-disabled);
    background-color: var(--sq-surface-input-disabled);
  }

  &::-webkit-inner-spin-button {
    opacity: 1;
    margin-right: 10px;
    padding: 10px 1px 10px 1px;
  }
`;

export const IconStyle = css`
  position: relative;
  width: 22px;
  bottom: 28px;
`;

export const invalid = css`
  background: var(--sq-surface-critical-subdued);
  border: 2px solid var(--sq-border-critical);
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: var(--sq-border-critical);
  }
`;
