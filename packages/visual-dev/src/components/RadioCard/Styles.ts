import { css } from 'styled-components'

export const RadioLabelStyle = css`
  display: block;
  width: 488px;
  height: 138px;

  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: pointer;
  margin-right: 10px;

  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  border: 2px solid #ebebeb;
  border-radius: 4px;
`
export const RadioInputStyle = css`
  display: none;

  &:checked + div {
    border-color: #f49c20;
  }

  &:checked + div::after {
    transform: scale(1);
  }
`
export const RadioButtonStyle = css`
  margin-top: 2.5px;
  width: 14px;
  height: 14px;
  border: 1.5px solid #575757;
  border-radius: 50%;
  margin-right: 20px;
  box-sizing: border-box;
  padding: 1.5px;
  flex-shrink: 0;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    display: block;
    background: #f49c20;
    border-radius: 100%;
    transform: scale(0);
    transition: transform 0.15s;
  }
`
export const RadioTextStyle = css``
