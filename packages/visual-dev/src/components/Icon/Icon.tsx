import * as React from 'react';
import styled from 'styled-components'

import { custom } from './Styles.tsx'

const default_size = {
	"small": "12px",
	"medium": "23px",
	"large": "36px"
}

interface IconProps {
	icon: string;
	color?: string;
	size?: "small" | "medium" | "large" | string;
	padding?: string;
	margin?: string;
}

export const StyledIcon = styled.i<{
	color?: string;
	size: "small" | "medium" | "large" | string;
	padding?: string;
	margin?: string;
}>`
	color: ${(props) => props.color};
	font-size: ${(props) => default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
`;

export const StyledSVG = styled.div<{
	color: string;
	size: "small" | "medium" | "large" | string;
	padding: string;
	margin: string;
}>`
	color: ${(props) => props.color};
	width: ${(props) => default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size};
	height: ${(props) => default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
`;

export const Icon: React.FC<IconProps> = ({
	icon,
	color = "#7c7c7c",
	size = "medium",
	padding = "0px",
	margin = "0px",
}) => {
	return (
		icon.startsWith('sqh') ?
			<StyledSVG
				size={size}
				padding={padding}
				margin={margin}
				color={color}
			>
				{custom[icon]}
			</StyledSVG>
		:	
			<StyledIcon
				className={icon}
				size={size}
				padding={padding}
				margin={margin}
				color={color}
			></StyledIcon>
	)
}
