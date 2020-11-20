import * as React from "react";
import styled from "styled-components";

export interface StyleProps {
  backgroundColor?: string;
  textColor?: string;
}

export interface IntegrationButtonProps extends StyleProps {
  icon?: React.ReactElement;
}

const IconWrapper = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 12px;
`;

const ButtonWrapper = styled.button<StyleProps>`
  background: ${({ backgroundColor }) => backgroundColor || "#f5a841"};
  color: ${({ textColor }) => textColor || "#fff"};

  outline: none;
  border: none;

  font-family: "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 1.5;
  border-radius: 4px;

  display: inline-flex;
  padding: 8px 12px;
  justify-content: flex-start;
  align-items: center;

  & > ${IconWrapper} > svg {
    fill: ${({ textColor }) => textColor || "#fff"};
  }
`;

export const IntegrationButton: React.FC<IntegrationButtonProps> = ({
  icon,
  children,
  backgroundColor,
  textColor
}) => {
  return (
    <ButtonWrapper backgroundColor={backgroundColor} textColor={textColor}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </ButtonWrapper>
  );
};
