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
  cursor: pointer;
  color: var(--sq-text);
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  font-weight: var(--sq-font-weight-regular);
  line-height: var(--sq-line-height-regular);
  /* width: max-content; */
`;

export const CheckboxTickStyle = css`
  position: absolute;
  color: inherit;
  width: 20px;
  height: 20px;
  transition: transform 0.1s;
  transform: scale(0);
`;
export const CheckboxInputStyle = css`
  display: none;

  &:checked + div > span {
    transform: scale(1);
  }
`;
export const CheckboxStyle = css`
  margin-right: 18px;
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
