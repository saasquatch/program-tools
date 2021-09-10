import { css } from 'styled-components'

const color = '#FFFFFF';
const background = 'rgba(35, 35, 35, 0.9)'
const margin = '55px';
const arrow = '5px';

export const base = css`
	&.wrapper {
		display: inline-block;
		position: relative;
	}
	&.tip {
		padding: 12px;
		border-radius: 4px;
		font-family: Helvatica Neue, Arial;
		font-size: 14px;
		line-height: 20px;
		color: ${color};
		background: ${background};
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		min-height: 20px;
		white-space: nowrap;
	}
	&.tip::before {
		content: " ";
		border: solid transparent;
		left: 50%;
		height: 0;
		width: 0;
		position: absolute;
		border-width: ${arrow};
		margin-left: calc(${arrow}*-1);
	}
	&.tip.right {
		right: auto;
		left: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}
	&.tip.right::before {
		left: calc(${arrow} * -1);
		top: 50%;
		transform: translateX(0) translateY(-50%);
		border-right-color: ${background};
	}
	&.tip.left {
		left: auto;
		right: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}
	&.tip.left::before {
		left: auto;
		right: calc(${arrow} * -2);
		top: 50%;
		transform: translateX(0%) translateY(-50%);
		border-left-color: ${background};
	}
	&.tip.top {
		top: calc(${margin} * -1);
	}
	&.tip.top::before {
		top: 100%;
		border-top-color: ${background};
	}
	&.tip.bottom {
		bottom: calc(${margin} * -1);
	}
	&.tip.bottom::before {
		bottom: 50%;
		bottom: calc(${margin} * 0.8);
		border-bottom-color: ${background};
	}
`
