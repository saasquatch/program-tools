import { css } from 'styled-components'

export const base = css`
	position: absolute;
	top: 0;
	left: 0;
	width: 40px;
	height: 20px;
	border: 3px solid var(--sq-border);
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
		background: var(--sq-surface);
		border: 3px solid var(--sq-border);
		transition: 0.1s;
	}
`

export const label = css`
	display: flex;
	align-items: center;
	font-family: Helvatica Neue, Arial;
	font-size: 14px;
	line-height: 18px;
	color: var(--sq-text-dark);
	user-select: none;
`

export const success = css`
	background: var(--sq-border-success);
`

export const critical = css`
	background: var(--sq-border-critical);
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
