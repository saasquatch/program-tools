import * as React from 'react';
import styled from 'styled-components'
import '../../styles.css'
import * as Styles from './Styles'

interface AvatarProps {
	firstName?: string
	lastName?: string
}

const AvatarStyle = styled.div``

const AvatarCircle = styled.div`
	background-color: var(--sq-background);
	border-radius: 50%;
	width: 34px;
	height: 34px;
	text-align: center;
	border: 1px solid #E2E2E2;
	box-sizing: border-box;
	border-radius: 50px;
`
const AvatarText = styled.span`
	position: relative;
	top: 6.5px;
	font-family: Helvetica;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 20px;
`

export const Avatar: React.FC<AvatarProps> = ({
	firstName,
	lastName
}) => {
	let initials
	if (firstName && lastName) {
		initials = firstName.charAt(0) + lastName.charAt(0)
		console.log(initials)
	}
	return (
		<AvatarStyle>
			{!(firstName && lastName) ? SVG :
			<AvatarCircle>
				<AvatarText>{initials}</AvatarText>
			</AvatarCircle>}	
		</AvatarStyle>
	)
}

// TODO: Use Icon component when it is merged to remaster branch
const SVG = 
	<svg
		width={38}
		height={38}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		>
		<mask
			id="prefix__a"
			style={{
			maskType: "alpha",
			}}
			maskUnits="userSpaceOnUse"
			x={3}
			y={3}
			width={32}
			height={32}
		>
			<circle cx={19} cy={19} r={16} fill="#C4C4C4" />
		</mask>
		<g mask="url(#prefix__a)">
			<path fill="url(#prefix__pattern0)" d="M2 2h34v34H2z" />
		</g>
		<circle cx={19} cy={19} r={16.5} stroke="#003B45" />
		<circle cx={19} cy={19} r={18} stroke="#fff" strokeWidth={2} />
		<defs>
			<pattern
			id="prefix__pattern0"
			patternContentUnits="objectBoundingBox"
			width={1}
			height={1}
			>
			<use xlinkHref="#prefix__image0" transform="scale(.00472)" />
			</pattern>
			<image
			id="prefix__image0"
			width={212}
			height={212}
			xlinkHref="data:image/png;base64,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"
			/>
		</defs>
		</svg>

