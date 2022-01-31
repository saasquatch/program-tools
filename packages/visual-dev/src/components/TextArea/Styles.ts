import { css } from "styled-components";

export const TextareaBoxStyle = css`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
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

export const invalid = css`
  background: var(--sq-surface-critical-subdued);
  border: 2px solid var(--sq-border-critical);
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: var(--sq-border-critical);
  }
`;

export const Container = css`
  display: inline-block;
  width: 100%;
  position: relative;
  height: 100%;
`;
