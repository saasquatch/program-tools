import { css } from 'styled-components'

export const InputBoxStyle = css`
  width: 300px;
  height: 30px;

  font: 400 14px Helvetica;
  text-indent: 6px;

  color: #575757;
  background: #ffffff;

  border: 2px solid #e2e2e2;
  border-radius: 4px;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #448ee1;
  }

  &:disabled {
    user-select: none;
    cursor: not-allowed;
    pointer-events: none;
    color: #bdbdbd;
    background-color: #ebebeb;
  }
`

export const invalid = css`
  color: #575757;
  background: #faf2ee;

  border: 2px solid #d14040;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #d14040;
  }
`
