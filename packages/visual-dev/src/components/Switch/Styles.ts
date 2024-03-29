import { css } from "styled-components";

export const base = css`
  position: absolute;
  width: 40px;
  height: 20px;
  border: 2px solid var(--sq-border);
  border-radius: var(--sq-border-radius-pill);
  background: var(--sq-surface-input-disabled);
  cursor: pointer;
  transform: translateX(-100%);
  box-sizing: border-box;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: -2px;
    background: var(--sq-surface);
    border: 2px solid var(--sq-border);
    transition: 0.1s;
    box-sizing: border-box;
  }
`;

export const label = css`
  display: flex;
  align-items: center;
  font-family: var(--sq-font-family-sans);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
  color: var(--sq-text-dark);
  user-select: none;
`;

export const success = css`
  background: var(--sq-border-success);
  transition: 0.15s ease-out;
`;

export const critical = css`
  background: var(--sq-border-critical);
  transition: 0.15s ease-out;
`;

export const off = css`
  opacity: 0;
  z-index: 1;
  border-radius: var(--sq-border-radius-pill);
  width: 40px;
  height: 20px;
  margin: 0;
`;

export const on = css`
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: 17px;
    transition: 0.1s ease-out;
  }
`;

export const wrapper = css`
  position: relative;
  display: inline-block;
  height: 20px;
`;
