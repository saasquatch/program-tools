import { css } from "styled-components"

export const InputBoxStyle = css`
  position: relative;

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
    color: #bdbdbd;
    background-color: #ebebeb;
  }

  &::-webkit-inner-spin-button {
    opacity: 1;
    margin-right: 10px;
    padding: 10px 1px 10px 1px;
  }
`

export const IconStyle = css`
  position: relative;
  width: 22px;
  bottom: 28px;
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
