import * as React from 'react';
import styled from 'styled-components'
import * as SVGs from './SVGs'

type IconProps = OptionProps & StyleProps & React.ComponentProps<"div">

interface OptionProps {
	icon: keyof typeof SVGs
}

interface StyleProps {
	color?: string
	size?: "small" | "medium" | "large" | string
}

export const default_size = {
	"small": "12px",
	"medium": "23px",
	"large": "36px"
}

export const StyledSVG = styled.div<Required<StyleProps> `
	color: ${(props) => props.color};
	width: ${(props) => default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size};
	height: ${(props) => default_size.hasOwnProperty(props.size) ? default_size[props.size] : props.size};
`;

export const Icon: React.FC<IconProps> = ({
	icon,
	color = "var(--sq-text-subdued)",
	size = "medium",
	...rest
}) => {
	return (
			<StyledSVG
				size={size}
				color={color}
				{...rest}
			>
				{ Object.keys(SVGs).includes(icon) ? SVGs[icon] : SVGs['placeholder'] }
			</StyledSVG>
	)
}
