import { css } from 'styled-components'

export const base = css`
	display: inline-block;
	position: relative;
`

export const tooltip = css`
	user-select: none;
	position: absolute;
	padding: 12px;
	border-radius: 4px;
	width: max-content;
	max-width: 144px;
	min-height: 20px;
	color: #FFFFFF;
	background: rgba(35, 35, 35, 0.9);
	font-family: Helvatica Neue, Arial;
	font-size: 14px;
	line-height: 20px;
	
	&::before {
		content: " ";
		border: solid transparent;
		left: 50%;
		height: 0;
		width: 0;
		position: absolute;
		border-width: 5px;
		margin-left: calc(5px*-1);
	}

	&.right {
		right: auto;
		left: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}

	&.right::before {
		left: calc(5px * -1);
		top: 50%;
		transform: translateX(0) translateY(-50%);
		border-right-color: rgba(35, 35, 35, 0.9);
	}

	&.left {
		left: auto;
		right: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}

	&.left::before {
		left: auto;
		right: calc(5px * -2);
		top: 50%;
		transform: translateX(0%) translateY(-50%);
		border-left-color: rgba(35, 35, 35, 0.9);
	}

	&.top {
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
	}

	&.top::before {
		top: 100%;
		transform: translateX(5%);
		border-top-color: rgba(35, 35, 35, 0.9);
	}

	&.bottom {
		top: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
	}
	
	&.bottom::before {
		bottom: calc(100%);
		left: 50%;
		transform: translateX(5%);
		border-bottom-color: rgba(35, 35, 35, 0.9);
	}
`
