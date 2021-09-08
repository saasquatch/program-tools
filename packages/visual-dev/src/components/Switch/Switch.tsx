import * as React from 'react';
import styled from 'styled-components'

import * as Styles from './Styles'

interface SwitchProps {
    color?: "green" | "red"
    size?: "small" | "medium" | "large"
    children: string
}

const Button = styled.button<Required<SwitchProps>>`
    ${Styles.base}
    ${props => Styles[props.color]}
    ${props => Styles[props.size]}
`

export const Switch: React.FC<SwitchProps> = ({
    color = "green",
    size = "medium",
    children
}) => {
    return (
    <   div>
            <CheckBoxWrapper>
                <CheckBox id="checkbox" type="checkbox" />
                <CheckBoxLabel htmlFor="checkbox" />
            </CheckBoxWrapper>
        </div>
    )
}

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
    ${Styles.color}
  position: absolute;
  border: 8px solid #E2E2E2;
  top: 0;
  left: 0;
  width: 82px;
  height: 37px;
  border-radius: 100px;
  background: #ebebeb;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin: -5px;
    background: #ffffff;
    border: 8px solid #e2e2e2;
    transition: 0.1s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;

  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #57ac59;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      margin-left: 40px;
      transition: 0.1s;
    }
  }
`;