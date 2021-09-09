import * as React from "react";
import styled from "styled-components";
import { Icon } from "../Icons";
import * as Styles from "./Styles";

interface BadgeProps {
  status: "info" | "success" | "active" | "critical" | "warning";
  children?: any[] | string;
  icon?: boolean | string;
}

const BadgeStyled = styled.div<BadgeProps>`
  ${Styles.base}
  ${(props) => Styles[props.status]}
`;

export const Badge: React.FC<BadgeProps> = ({ status, children, icon }) => {
  return (
    <BadgeStyled status={status}>
      {icon && (
        <Icon
          color="inherit"
          icon={icon === true ? Styles.defaultIcon : icon}
          margin="0px 4px"
        />
      )}
      {children}
    </BadgeStyled>
  );
};
