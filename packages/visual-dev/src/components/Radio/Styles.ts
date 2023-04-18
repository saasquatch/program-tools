import { css } from "styled-components";

export const RadioLabelStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-right: 10px;
  user-select: none;
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`;

export const RadioInputStyle = css`
  display: none;

  &:checked + div {
    border-color: var(--sq-action-primary);
  }

  &:checked + div::after {
    transform: scale(1) translate(-50%, -50%);
  }
`;

export const RadioButtonStyle = css`
  margin-top: 2px;
  width: 14px;
  height: 14px;
  border: 1.5px solid var(--sq-text);
  border-radius: 50%;
  margin-right: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;

  &::after {
    transform-origin: top left;
    position: relative;
    content: "";
    width: 8px;
    height: 8px;
    display: block;
    background: var(--sq-action-primary);
    border-radius: 100%;
    left: 50%;
    top: 50%;
    transform: scale(0) translate(-50%, -50%);
    transition: transform 0.15s;
  }
`;
