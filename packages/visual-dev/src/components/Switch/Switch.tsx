import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface SwitchProps {
	id: string
	checked: boolean
	onChange: () => void
	color?: "success" | "critical"
	position?: "left" | "right"
	children?: React.ReactNode
}

const SwitchBox = styled.div`
	${Styles.wrapper}
`;

const SwitchButton = styled.label`
	${Styles.base}
`;

const SwitchLabel = styled.label`
	${Styles.label}
`;

const SwitchBackground = styled.input<Required<{color:string}>>`
	${Styles.off}
	&:checked + ${SwitchButton} {
		${props => Styles[props.color]}
		${Styles.on}
	}
`;

export const Switch: React.FC<SwitchProps> = ({
	id,
	color = "success",
	checked,
	onChange,
	position = "right",
	children
}) => {
	return (
		<SwitchLabel htmlFor={id}>
			{ position == "left" && children }
			<SwitchBox style={ position == "left" ? {marginLeft: "15px"} : {marginRight: "15px"} }> 
				<SwitchBackground color={color} id={id} type="checkbox" checked={checked} onChange={onChange}/>
				<SwitchButton htmlFor={id}/>
			</SwitchBox>
			{ position == "right" && children }
		</SwitchLabel>
	)
}
