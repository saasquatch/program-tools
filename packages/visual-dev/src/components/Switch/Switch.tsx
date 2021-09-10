import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface SwitchProps {
	id: string
	status?: "on" | "off"
	color?: "success" | "critical"
}

const SwitchDiv = styled.div`
	${Styles.wrapper}
`;

const SwitchLabel = styled.label`
	${Styles.base}
`;

const SwitchBox = styled.input<Required<{color:string}>>`
	${Styles.off}
	&:checked + ${SwitchLabel} {
		${props => Styles[props.color]}
		${Styles.on}
	}
`;

export const Switch: React.FC<SwitchProps> = ({
	id,
	color = "success",
	status = "off"
}) => {
	return (
		<SwitchDiv>
			<SwitchBox color={color} id={id} type="checkbox" defaultChecked={status=="on" ? true : false}/>
			<SwitchLabel htmlFor={id}/>
		</SwitchDiv>
	)
}
