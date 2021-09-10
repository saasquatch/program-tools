import { css } from 'styled-components'

export const base = css`
color: #555;
font-size: 14px;
border-radius: 9999px;
background-color: #fefefe;
padding: 2px 8px;
border: 1px solid #eaeaea;
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

// STATUS variants
export const success = css`
	background-color: #f3fff6;
	color: #507d4f;
	border-color: rgba(80, 125, 79, 0.6);
	`
	export const error = css`
	background-color: #fff3f3;
	color: #aa1d1d;
	border-color: #ee9898;
	`
	export const info = css`
	background-color: #f0f5f9;
	color: #52616b;
	border-color: #b0c0cb;
`
