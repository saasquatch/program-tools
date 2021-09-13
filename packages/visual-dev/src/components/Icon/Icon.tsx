import * as React from 'react';
import styled from 'styled-components'

import { custom } from './Styles.tsx'

interface IconProps {
	icon: string;
	color?: string;
	padding?: string;
	margin?: string;
	fontSize?: string;
	fontWeight?: string;
}

export const StyledIcon = styled.i<{
  color?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
}>`
    color: ${(props) => (props.color ? props.color : "#7c7c7c")} ;
    ${(props) => props.padding && `padding: ${props.padding};`}
    ${(props) => props.margin && `margin: ${props.margin};`}
    ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
    ${(props) => props.fontWeight && `font-size: ${props.fontWeight};`}

    &:before{
      color: ${(props) => (props.color ? props.color : "#7c7c7c")} ;
    }
	
`;


export const StyledSVG = styled.div<{
	color?: string;
	padding?: string;
	margin?: string;
	fontSize?: string;
	fontWeight?: string;
  }>`
	  color: ${(props) => (props.color ? props.color : "#7c7c7c")} ;
	  ${(props) => props.padding && `padding: ${props.padding};`}
	  ${(props) => props.margin && `margin: ${props.margin};`}
	  ${(props) => props.fontSize && `width: ${props.fontSize};`}
	  ${(props) => props.fontSize && `height: ${props.fontSize};`}
  
	  &:before{
		color: ${(props) => (props.color ? props.color : "#7c7c7c")} ;
	  }	  
  `;

export const Icon: React.FC<IconProps> = ({
	icon,
	color,
	padding,
	margin,
	fontSize,
	fontWeight
}) => {
	return (
			icon.startsWith('sqh') ?
				<StyledSVG
					fontSize={fontSize}
					padding={padding}
					margin={margin}
					color={color}
					className={icon}
					fontWeight={fontWeight}
				>{custom[icon]}</StyledSVG>
			:	
				<StyledIcon
					fontSize={fontSize}
					padding={padding}
					margin={margin}
					color={color}
					className={icon}
					fontWeight={fontWeight}
				></StyledIcon>
	)
}


