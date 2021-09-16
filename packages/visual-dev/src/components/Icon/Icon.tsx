import * as React from 'react';
import styled from 'styled-components'
import * as SVGs from './SVGs.tsx'

type IconProps = OptionProps & StyleProps

interface OptionProps {
	icon: string
}

interface StyleProps {
	color?: string
	size?: "small" | "medium" | "large" | string
	padding?: string
	margin?: string
}

export const StyledIcon = styled.i<Required<StyleProps>>`
	color: ${(props) => props.color};
	font-size: ${(props) => SVGs.default_size.hasOwnProperty(props.size) ? SVGs.default_size[props.size] : props.size};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
`;

export const StyledSVG = styled.div<Required<StyleProps>>`
	color: ${(props) => props.color};
	width: ${(props) => SVGs.default_size.hasOwnProperty(props.size) ? SVGs.default_size[props.size] : props.size};
	height: ${(props) => SVGs.default_size.hasOwnProperty(props.size) ? SVGs.default_size[props.size] : props.size};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
`;

function getIcon(props:{icon: SVGs.IconKey})
{
	console.log(SVGs.icons[props.icon])
}

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
				{getIcon({icon: icon})}
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
