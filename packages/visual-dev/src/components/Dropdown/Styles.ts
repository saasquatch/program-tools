import { css } from 'styled-components'

export const base = css`
  position: relative;
  //   width: 191px;
  min-width: 191px;
  display: inline-block;
`
export const subcontent = css`
  border-radius: inherit;
`

export const subitem = css`
  text-indent: 15px;
  border-radius: inherit;
`

export const sublist = css`
  padding: 15px;
  border-radius: inherit;
  user-select: none;
  color: #575757;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: bold;
`

export const arrow = css`
  margin-left: auto;
`

export const button = css`
  display: flex;
  padding: 7px 12px;
  font-family: Helvetica;
  font-size: 14px;
  border: 1px solid #a6b9bd;
`

export const content = css`
  position: relative;
  width: max-content;
  min-width: inherit;
  z-index: 100;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #a6b9bd;
  box-sizing: border-box;
  &:empty {
    border: none;
  }
`

export const item = css`
  padding: 15px;
  cursor: pointer;
  color: #575757;
  font-family: Helvetica;
  font-size: 14px;
  border-radius: inherit;
  &:hover {
    background: #eef6ff;
  }
`
