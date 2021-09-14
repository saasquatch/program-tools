import * as React from 'react';
import styled from 'styled-components'
import '../../styles.css'
import { Icon } from '../Icon';

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
			{icons[type]}
			<div style={{paddingLeft: 16}}>
				<div style={{fontWeight: 'bold'}}>{title} </div>
				<div>{children}</div>
			</div>
		</AlertDiv>
	)
}

const icons = {
	'critical': <Icon icon={"sqh-alert"} color='var(--sq-surface-critical)'/>,
	'warning': <Icon icon={"sqh-alert"} color='var(--sq-surface-warning)'/>,
	'success': <Icon icon={"sqh-checkmark-circle"} color='var(--sq-text-subdued)'/>,
	'info': <Icon icon={"sqh-help"} color='var(--sq-text)'/>,
}
