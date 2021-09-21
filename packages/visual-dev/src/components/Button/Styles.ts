import { css } from 'styled-components'

export const base = css`
	padding: 5px 14px;
	font: 700 14px Helvetica;
	line-height: 16px;
	box-sizing: border-box;
	border-radius: 4px;	
`

export const primary = css`
	border: 1px solid transparent;
	background: #f49c20;
	color: #ffffff;
	&:hover{
		background: #DC8F32;
	}
`

export const secondary = css`
	border: 1px solid #A6B9BD;
	background: #ffffff;
	color: #575757;
	&:hover{
		color: #ffffff;
		background: #A6B9BD;
	}
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
	user-select: none;
	pointer-events: none;
`

export const loading_secondary = css`
	color: #EBEBEB;
	border-color: #EBEBEB;
	user-select: none;
	pointer-events: none;
`

export const disable_secondary = css`
	color: #EBEBEB;
	border-color: #EBEBEB;
	user-select: none;
	pointer-events: none;
`

export const danger = css`
	background-color: #FE6666;
	&:hover{
		background: #CB0000;
	}
`
export const success = css`
	background-color: #57AC59;
	&:hover{
		background: #479449;
	}
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