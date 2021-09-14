import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface SwitchProps {
	id: string
	checked: boolean
	onChange: () => void
	color?: "success" | "critical"
	textLeft?: string
	textRight?: string
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
	textLeft = "",
	textRight = ""
}) => {
	const spaceLeft = textLeft == "" ? "0px" : "10px"
	const spaceRight = textRight == "" ? "0px" : "10px" 
	return (
		<SwitchLabel htmlFor={id}>
			{ textLeft }
			<SwitchBox style={{marginLeft: spaceLeft, paddingRight: spaceRight}}> 
				<SwitchBackground color={color} id={id} type="checkbox" checked={checked} onChange={onChange}/>
				<SwitchButton htmlFor={id}/>
			</SwitchBox>
			{ textRight }
		</SwitchLabel>
	)
}
