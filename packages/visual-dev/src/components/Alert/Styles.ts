import { css } from 'styled-components'

export const base = css`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 16px;
	font-family: Helvatica Neue, Arial;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 20px;
	color: #575757;
	box-sizing: border-box;
	border: 1px solid;
	border-radius: 5px;
`

export const critical = css`
	background-color: var(--sq-surface-critical-subdued);
	border-color: var(--sq-border-critical);
`

export const warning = css`
	background-color: var(--sq-surface-warning-subdued);
	border-color: var(--sq-border-warning);
`

export const success = css`
	background-color: var(--sq-surface-success-subdued);
	border-color: var(--sq-border-success);
`

export const info = css`
	background-color: var(--sq-background);
	border-color: var(--sq-border);
`