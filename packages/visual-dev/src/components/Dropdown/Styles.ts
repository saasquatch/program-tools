import { css } from 'styled-components'

export const base = css`
	position: relative;
	width: 191px;
	min-width: 191px;
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
	position: relative;
	bottom: 1px;
	float: right;
`

export const button = css`
	padding: 7px 12px;
	font-family: Helvetica;
	font-size: 14px;
	border: 1px solid #A6B9BD;
`

export const content = css`
	position: absolute;
	width: max-content;
	min-width: inherit;
	z-index: 100;
	top: 120%;
	background: #FFFFFF;
	border: 1px solid #A6B9BD;
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