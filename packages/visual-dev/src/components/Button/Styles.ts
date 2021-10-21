import { css } from 'styled-components'

export const base = css`
  cursor: pointer;
  font: 700 14px Helvetica;
  line-height: 16px;
  box-sizing: border-box;
  border-radius: 4px;
`

export const primary = css`
  border: 1px solid transparent;
  background: #f49c20;
  color: #ffffff;
  &:hover {
    background: #dc8f32;
  }
`
export const primary_small = css`
  font-size: 12px;
  padding: 2.5px 10.5px;
`
export const primary_medium = css`
  font-size: 14px;
  padding: 5px 16px;
`
export const primary_large = css`
  font-size: 16px;
  padding: 7.5px 21px;
`

export const secondary = css`
  border: 1px solid #a6b9bd;
  background: #ffffff;
  color: #575757;
  &:hover {
    color: #ffffff;
    background: #a6b9bd;
  }
`
export const secondary_small = css`
  font-size: 12px;
  padding: 2.5px 10.5px;
`
export const secondary_medium = css`
  font-size: 14px;
  padding: 5px 16px;
`
export const secondary_large = css`
  font-size: 16px;
  padding: 7.5px 21px;
`

export const text = css`
  border-radius: 0px;
  margin: 0px 14px;
  padding: 5px 0px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;

  color: #575757;
  &:hover {
    border-bottom: 2px solid #575757;
  }
`

export const text_small = css`
  font-size: 12px;
`
export const text_medium = css`
  font-size: 14px;
`
export const text_large = css`
  font-size: 18px;
`

export const circle = css`
  border: 1px solid #a6b9bd;
  background: #ffffff;
  color: #575757;
  padding: 0px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  &:hover {
    color: #ffffff;
    background: #a6b9bd;
  }
`

export const circle_small = css`
  width: 36px;
  height: 36px;
`

export const circle_medium = css`
  width: 44px;
  height: 44px;
`

export const circle_large = css`
  width: 60px;
  height: 60px;
`

export const pill = css`
  padding: 5px 16px;
  border-radius: 100px;
`
export const disable_primary = css`
  user-select: none;
  cursor: not-allowed;
  pointer-events: none;
  background-color: #ebebeb;
`

export const loading_primary = css`
  background-color: #ebebeb;
  &:hover {
    background: #ebebeb;
  }
`

export const loading_secondary = css`
  color: #ebebeb;
  border-color: #ebebeb;
  user-select: none;
  pointer-events: none;
`

export const disable_secondary = css`
  color: #ebebeb;
  border-color: #ebebeb;
  user-select: none;
  pointer-events: none;
`

export const critical = css`
  background-color: #fe6666;
  &:hover {
    background: #cb0000;
  }
`
export const success = css`
  background-color: #57ac59;
  &:hover {
    background: #479449;
  }
`
