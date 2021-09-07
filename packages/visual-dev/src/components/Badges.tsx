import React from "react";
import styled from "styled-components";
import { Icon } from "./Icons";

interface BadgeProps {
    children?: any[] | string;
    padding?: string;
    icon?: string;
    variant: "default" | "success" | "active" | "critical" | "warning";
}

const variantStyles = {
  default: {
    background: "#E2E2E2",
    border: "#E2E2E2",
    color: "#575757",
  },
  success: {
    background: "#E4FCE3",
    border: "#E4FCE3",
    color: "#232323",
  },
  active: {
    background: "#57AC59",
    border: "#57AC59",
    color: "#fff",
  },
  critical: {
    background: "#FE6666",
    border: "#FE6666",
    color: "#fff",
  },
  warning: {
    background: "#F1C359",
    border: "#F1C359",
    color: "#232323",
  }
};

const BadgeStyled = styled.a<BadgeProps>`
  border-radius: 50px;
  min-width: 100px;
  padding: ${(props) => props.padding || `4px 20px`};
  background: ${(props) => variantStyles[props.variant]["background"]};
  border: 1px solid ${(props) => variantStyles[props.variant]["border"]};
  color:${(props) => variantStyles[props.variant]["color"]};
  font-weight: 500;
  font-size: 14px;
  font-style: normal;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  line-height: 20px;
`;

export const Badge = ({
    children,
    padding,
    icon,
    variant,
    ...props
  }: BadgeProps) => {
    return (
      <BadgeStyled
        {...props}
        padding={padding}
        variant={variant}
      >
        {icon && 
        <Icon color={variantStyles[variant]["color"]} icon={icon} margin="0px 4px"/>}
        {children}
      </BadgeStyled>
    );
};