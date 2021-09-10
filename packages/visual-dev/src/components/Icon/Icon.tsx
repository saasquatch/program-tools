import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface ExampleComponentProps {
	status: "success" | "error" | "info"
	children: string
	size?: "small" | "medium" | "large"
}

const Button = styled.button<Required<ExampleComponentProps>>`
	${Styles.base}
	${props => Styles[props.status]}
	${props => Styles[props.size]}
`

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
	size = "medium",
	status,
	children
}) => {
	return <Button status={status} size={size}>{children}</Button>
}
