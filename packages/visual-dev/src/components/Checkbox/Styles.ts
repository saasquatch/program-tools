import { css } from "styled-components";

export const disabled_color = css`
  user-select: none;
  cursor: not-allowed;
  pointer-events: none;
  color: var(--sq-text-subdued);
`;
export const disabled_bg = css`
  user-select: none;
  cursor: not-allowed;
  pointer-events: none;
  background: var(--sq-surface-input-disabled);
  box-shadow: 0 0 0 1px var(--sq-border);
`;
export const CheckboxLabelStyle = css`
  user-select: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
`;

export const CheckboxTickStyle = css`
  position: absolute;
  color: inherit;
  width: 20px;
  height: 20px;
  transform: scale(0);
  transition: transform 0.15s;
`;
export const CheckboxInputStyle = css`
  display: none;

  &:checked + div > div {
    transform: scale(1);
  }
`;
export const CheckboxStyle = css`
  display: flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px var(--sq-text);
  margin-right: 18px;
  flex-shrink: 0;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 0 2px var(--sq-text);
  }
`;

export const checked_border = css`
  &:checked + div {
    box-shadow: 0 0 0 2px var(--sq-text);
  }
`;

export const checked_disabled = css`
  &:checked + div {
    box-shadow: 0 0 0 2px var(--sq-text-subdued);
  }
`;
