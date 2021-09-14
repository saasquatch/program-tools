import React from 'react';
import styled from 'styled-components';
import * as Styles from './Styles';

const DEFAULT_TAG = 'span'

type TextSizeVariants = keyof typeof Styles.sizeVariants

export type TextProps = {
  size?: TextSizeVariants
  children: string
}

type StyledTextProps = Pick<TextProps, 'size'>

export const Text = styled[DEFAULT_TAG]<StyledTextProps>`
  ${Styles.base}
  ${props => Styles.sizeVariants[props.size || "4"]}
`
