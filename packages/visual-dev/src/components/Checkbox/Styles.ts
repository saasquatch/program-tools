import { css } from 'styled-components'

export const disabled_color = css`
  user-select: none;
  cursor: not-allowed;
  pointer-events: none;
  color: #858585;
`
export const disabled_bg = css`
  user-select: none;
  cursor: not-allowed;
  pointer-events: none;
  background: #ebebeb;
  box-shadow: 0 0 0 1px #e2e2e2;
`
export const CheckboxLabelStyle = css`
  user-select: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  color: #575757;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
`

export const CheckboxTickStyle = css`
  position: absolute;
  color: inherit;
  width: 20px;
  height: 20px;
  transform: scale(0);
  transition: transform 0.15s;
`
export const CheckboxInputStyle = css`
  display: none;

  //   &:checked + div {
  //     box-shadow: 0 0 0 2px #575757;
  //   }

  &:checked + div > div {
    transform: scale(1);
  }
`
export const CheckboxStyle = css`
  width: 16px;
  height: 16px;
  box-shadow: 0 0 0 1px #575757;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 0 2px #575757;
  }
`

export const checked_border = css`
  &:checked + div {
    box-shadow: 0 0 0 2px #575757;
  }
`

export const checked_disabled = css`
  &:checked + div {
    box-shadow: 0 0 0 2px #858585;
  }
`
