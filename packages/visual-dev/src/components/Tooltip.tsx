import React from 'react'
import { useState } from "react";
import styled from 'styled-components';

const color = '#FFFFFF';
const background = 'rgba(35, 35, 35, 0.9)'
const margin = '55px';
const arrow = '5px';

const TooltipStyle = styled.div`
	
	&.Tooltip-Wrapper {
		display: inline-block;
		position: relative;
	}
	
	&.Tooltip-Tip {
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
		white-space: nowrap;
	}

	&.Tooltip-Tip::before {
		content: " ";
		border: solid transparent;
		left: 50%;
		height: 0;
		width: 0;
		position: absolute;
		border-width: ${arrow};
		margin-left: calc(${arrow}*-1);
	}
	
	&.Tooltip-Tip.right {
		right: auto;
		left: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}
	
	&.Tooltip-Tip.right::before {
		left: calc(${arrow} * -1);
		top: 50%;
		transform: translateX(0) translateY(-50%);
		border-right-color: ${background};
	}

	&.Tooltip-Tip.left {
		left: auto;
		right: calc(100% + 10px);
		top: 50%;
		transform: translateX(0) translateY(-50%);
	}
	
	&.Tooltip-Tip.left::before {
		right: calc(${arrow} * -1);
		top: 50%;
		transform: translateX(1440%) translateY(-50%);
		border-left-color: ${background};
	}

	


	&.Tooltip-Tip.top {
		top: calc(${margin} * -1);
	}
	
	&.Tooltip-Tip.top::before {
		top: 100%;
		border-top-color: ${background};
	}
	
	&.Tooltip-Tip.bottom {
		bottom: calc(${margin} * -1);
	}
	
	&.Tooltip-Tip.bottom::before {
		bottom: 50%;
		bottom: calc(${margin} * 0.8);
		border-bottom-color: ${background};
	}
	  

  
`;

interface Props {
	text: string;
	direction?: string;
}

const Tooltip: React.FC<Props> = (props) => {

	const [active, setActive] = useState(false);
	
	let delay: ReturnType<typeof setTimeout>;

	const showTooltip = () => {
		delay = setTimeout(() => {
			setActive(true);
		}, 250);
	};

	const hideTooltip = () => {
		clearInterval(delay);
		setActive(false);
	};

	return (
		<TooltipStyle
			className="Tooltip-Wrapper"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
		{props.children}
		{active && (
			<TooltipStyle className={`Tooltip-Tip ${props.direction || "top"}`}>
				{props.text}
			</TooltipStyle>
		)}
		</TooltipStyle>
	);
}

export default Tooltip;