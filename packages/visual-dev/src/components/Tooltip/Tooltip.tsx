import React from 'react'
import styled from 'styled-components'
import { useState } from "react";

import * as Styles from './Styles'

interface TooltipProps {
	text: string;
	direction?: 'top' | 'left' | 'bottom' | 'right'
}

const TooltipDiv = styled.div`
	${Styles.base}
`;

export const Tooltip: React.FC<TooltipProps> = (props) => {
	let delay: ReturnType<typeof setTimeout>;
	const [active, setActive] = useState(false);

	const showTooltip = () => {
		delay = setTimeout(() => {
			setActive(true);
		}, 250);
	}

	const hideTooltip = () => {
		clearInterval(delay);
		setActive(false);
	}

	return (
		<TooltipDiv
			className="wrapper"
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
		{props.children}
		{active && (
			<TooltipDiv
				className={`tip ${props.direction || "top"}`}>
				{props.text}
			</TooltipDiv>
		)}
		</TooltipDiv>
	);
}