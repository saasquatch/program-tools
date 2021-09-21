import { css } from 'styled-components'

export const base = css`
	&:disabled {
		user-select: none;
		cursor: not-allowed;
		pointer-events: none;
		background-color: #ebebeb;
	}
`

export const primary = css`
	padding: 5px 12px;
	font: 700 14px Helvetica;
	line-height: 16px;
	border: 1px solid transparent;
	box-sizing: border-box;
	border-radius: 4px;
	background: #f49c20;
	color: #ffffff;
`

export const pill = css`
	padding: 5px 16px;
	border-radius: 100px;
`
export const loading = css`
	background-color: #ebebeb;
`
export const danger = css`
	background-color: #FE6666;
`
export const success = css`
	background-color: #57AC59;
`

// SIZE variants
export const small = css`
  padding: 0 4px;
  font-size: 12px;
`
export const medium = css`
  padding: 2px 8px;
`
export const large = css`
  padding: 4px 16px;
`