import { css } from 'styled-components'

export const base = css`
	position: absolute;
	border: 3px solid #E2E2E2;
	top: 0;
	left: 0;
	width: 40px;
	height: 20px;
	border-radius: 100px;
	background: #ebebeb;
	cursor: pointer;
	&::after {
		content: "";
		display: block;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		margin: -3px;
		background: #ffffff;
		border: 3px solid #e2e2e2;
		transition: 0.1s;
	}
`

export const label = css`
	display: flex;
	align-items: center;
	font-family: Helvatica Neue, Arial;
	font-size: 14px;
	line-height: 18px;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

export const success = css`
	background: #57AC59;
`

export const critical = css`
	background: #D14040;
`

export const off = css`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 40px;
	height: 20px;
`

export const on = css`
	&::after {
		content: "";
		display: block;
		border-radius: 50%;
		width: 20px;
		height: 20px;
		margin-left: 17px;
		transition: 0.1s;
	}
`

export const wrapper = css`
	position: relative;
`
