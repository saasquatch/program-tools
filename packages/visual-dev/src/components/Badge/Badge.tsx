import * as React from 'react';
import styled from 'styled-components'
import { Icon } from "../Icons";

import * as Styles from './Styles'

interface BadgeProps {
    status: "info" | "success" | "active" | "critical" | "warning";
    children?: any[] | string;
    icon?: string;
}

const BadgeStyled = styled.a<BadgeProps>`
  ${Styles.base}
  ${props => Styles[props.status]}
`

export const Badge: React.FC<BadgeProps> = ({
  status,
  children,
  icon
}) => {
  return <BadgeStyled status={status}>
      {icon && 
        <Icon color={Styles.statusColors[status]['color']} icon={icon} margin="0px 4px"/>}
        {children}
    </BadgeStyled>
}