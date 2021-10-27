import { css } from "styled-components"

export const RadioLabelStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-right: 10px;
  padding: 20px;
  user-select: none;
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`
export const RadioInputStyle = css`
  display: none;

  &:checked + div {
    border-color: var(--sq-action-primary);
  }

  &:checked + div::after {
    transform: scale(1);
  }
`
export const RadioButtonStyle = css`
  margin-top: 2.5px;
  width: 14px;
  height: 14px;
  border: 1.5px solid var(--sq-text);
  border-radius: 50%;
  margin-right: 20px;
  box-sizing: border-box;
  padding: 1.5px;
  flex-shrink: 0;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    display: block;
    background: var(--sq-action-primary);
    border-radius: 100%;
    transform: scale(0);
    transition: transform 0.15s;
  }
`
export const RadioTextStyle = css`
  flex-direction: column;
`
