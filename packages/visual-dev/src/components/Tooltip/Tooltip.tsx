import React from 'react'
import styled from 'styled-components'
import { useState } from "react";

import * as Styles from './Styles'

interface TooltipProps {
	text?: string;
	direction?: 'top' | 'left' | 'bottom' | 'right'
	delay?: number
	children?: React.ReactNode
}

const TooltipDiv = styled.div`
	${Styles.base}
`;

const TooltipTip = styled.div`
	${Styles.tooltip}
`;

export const Tooltip: React.FC<TooltipProps> = ({
	text = "",
	direction = "top",
	delay = 0,
	children
}) => {
	let timeout: ReturnType<typeof setTimeout>;
	const [active, setActive] = useState(false);

	const showTooltip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay);
	}

	const hideTooltip = () => {
		clearInterval(timeout);
		setActive(false);
	}

	return (
		<TooltipDiv
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
		>
		{children}
		{active && (
			<TooltipTip
				className={direction}>
				{text}
			</TooltipTip>
		)}
		</TooltipDiv>
	);
}