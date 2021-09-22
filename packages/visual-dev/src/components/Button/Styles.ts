import { css } from 'styled-components'

export const base = css`
	cursor: pointer;
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
export const primary_small = css`
	padding: 2.5px 7px;
`
export const primary_medium = css`
	padding: 5px 14px;
`
export const primary_large = css`
	padding: 7.5px 21px;
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
export const secondary_small = css`
	padding: 2.5px 7px;
`
export const secondary_medium = css`
	padding: 5px 14px;
`
export const secondary_large = css`
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
	&:hover{
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
	border: 1px solid #A6B9BD;		
	background: #ffffff;
	color: #575757;
	padding: 0px;
	width:	40px;
	height: 40px;
	border-radius: 100%;
	&:hover{
		color: #ffffff;
		background: #A6B9BD;
	}
`

export const circle_small = css`
	width:	36px;
	height: 36px;
`

export const circle_medium = css`
	width:	44px;
	height: 44px;
`

export const circle_large = css`
	width:	60px;
	height: 60px;
`

export const pill = css`
	padding: 5px 16px;
	border-radius: 100px;
`
export const primary_disable = css`
	user-select: none;
	cursor: not-allowed;
	background-color: #ebebeb;
	&:hover{
		background-color: #ebebeb;
	}
`

export const primary_loading = css`
	background-color: #ebebeb;
	user-select: none;
	pointer-events: none;
`

export const secondary_loading = css`
	color: #EBEBEB;
	border-color: #EBEBEB;
	user-select: none;
	pointer-events: none;
`

export const secondary_disable = css`
	color: #EBEBEB;
	border-color: #EBEBEB;
	user-select: none;
	cursor: not-allowed;
	&:hover{
		color: #EBEBEB;
		border-color: #EBEBEB;
		background-color: #ffffff;
	}
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
