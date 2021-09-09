import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface AlertProps {
	type: "critical" | "warning" | "success" | "info"
	title: string
	children: React.ReactNode
}

const AlertDiv = styled.div<Pick<AlertProps, 'type'>>`
	${Styles.base}
	${props => Styles[props.type]}
`

export const Alert: React.FC<AlertProps> = ({
	type,   
	title,
	children
}) => {
	return (
		<AlertDiv type={type}>
			{SVG[type]}
			<div style={{paddingLeft: 16}}>
				<div>
					<div style={{fontWeight: 'bold'}}>{title} </div>
					<div>{children}</div>
				</div>
			</div>
		</AlertDiv>
	)
}

// TODO: Use Icon component for these SVGs when finished.
const SVG = {
	'critical':
	<svg
		style={{minHeight: "23px", minWidth: "23px"}}
		xmlns="http://www.w3.org/2000/svg"
		width="23"
		height="23"
		fill="none"
		viewBox="0 0 23 23"
		>
		<path
			fill="#FE6666"
			d="M10.375 14.875h2.25v2.25h-2.25v-2.25zm0-9h2.25v6.75h-2.25v-6.75zM11.489.25C5.279.25.25 5.29.25 11.5s5.029 11.25 11.239 11.25c6.221 0 11.261-5.04 11.261-11.25S17.71.25 11.489.25zM11.5 20.5c-4.973 0-9-4.027-9-9s4.027-9 9-9 9 4.027 9 9-4.027 9-9 9z"
		></path>
	</svg>,

	'warning': 
	<svg
		style={{minHeight: "23px", minWidth: "23px"}}
		xmlns="http://www.w3.org/2000/svg"
		width="23"
		height="23"
		fill="none"
		viewBox="0 0 23 23"
		>
		<path
			fill="#F1C359"
			d="M10.375 14.875h2.25v2.25h-2.25v-2.25zm0-9h2.25v6.75h-2.25v-6.75zM11.489.25C5.279.25.25 5.29.25 11.5s5.029 11.25 11.239 11.25c6.221 0 11.261-5.04 11.261-11.25S17.71.25 11.489.25zM11.5 20.5c-4.973 0-9-4.027-9-9s4.027-9 9-9 9 4.027 9 9-4.027 9-9 9z"
		></path>
	</svg>,

	'success':
	<svg
		style={{minHeight: "23px", minWidth: "23px"}}
		xmlns="http://www.w3.org/2000/svg"
		width="23"
		height="23"
		fill="none"
		viewBox="0 0 23 23"
		>
		<path
			stroke="#57AC59"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M5.15 12.186l4.457 4.457 7.243-9.286"
		></path>
		<circle
			cx="11.65"
			cy="11.35"
			r="9.75"
			stroke="#57AC59"
			strokeWidth="2"
		></circle>
	</svg>,

	'info':
	<svg
		style={{minHeight: "23px", minWidth: "23px"}}
		xmlns="http://www.w3.org/2000/svg"
		width="23"
		height="23"
		fill="none"
		viewBox="0 0 23 23"
		>
		<path
			fill="#575757"
			d="M10.375 18.25h2.25V16h-2.25v2.25zM11.5.25C5.29.25.25 5.29.25 11.5S5.29 22.75 11.5 22.75s11.25-5.04 11.25-11.25S17.71.25 11.5.25zm0 20.25c-4.961 0-9-4.039-9-9s4.039-9 9-9 9 4.039 9 9-4.039 9-9 9zm0-15.75A4.499 4.499 0 007 9.25h2.25A2.257 2.257 0 0111.5 7a2.257 2.257 0 012.25 2.25c0 2.25-3.375 1.969-3.375 5.625h2.25c0-2.531 3.375-2.813 3.375-5.625 0-2.486-2.014-4.5-4.5-4.5z"
		></path>
	</svg>

}