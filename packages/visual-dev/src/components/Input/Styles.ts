import { css } from "styled-components";

export const InputBoxStyle = css`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  height: 36px;
  text-indent: var(--sq-spacing-small);
  color: var(--sq-text);
  background: var(--sq-surface);
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);

  border: 2px solid var(--sq-border);
  border-radius: var(--sq-border-radius-normal);

  &[type="date"] {
    text-indent: 6px;
    padding-right: var(--sq-spacing-small);
  }

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

export const ExtrasDiv = css`
  position: absolute;
  top: 8px;
  display: inline-flex;
`;

export const invalid = css`
  border: 2px solid var(--sq-border-critical);
  border-radius: var(--sq-border-radius-normal);

  &:focus {
    outline: none;
    border-color: var(--sq-border-critical);
  }
`;

export const Container = css`
  display: inline-block;
  width: 100%;
  position: relative;
  height: auto;
`;
