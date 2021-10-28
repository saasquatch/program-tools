import { css } from "styled-components"

export const RadioLabelStyle = css`
  display: flex;
  flex-direction: row;
  //   width: 85%;
  height: 138px;
  border: 2px solid var(--sq-border);
  border-radius: 4px;
  align-items: flex-start;
  //   margin: 10px;
  user-select: none;
  cursor: pointer;
  color: var(--sq-text);
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: var(--sq-font-weight-regular);
  font-size: var(--sq-font-size-regular);
  line-height: var(--sq-line-height-regular);
`

export const RadioGridStyle = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
  padding: 20px;
`

export const RightSegmentStyle = css`
  width: auto;
  //   width: 371px;
  height: 100%;
  float: right;
  border-left: 2px solid #ebebeb;
`

export const LeftSegmentStyle = css`
  float: left;
  width: 117px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
