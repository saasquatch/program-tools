import styled from 'styled-components';
import * as Styles from './Styles';

const DEFAULT_TAG = 'span'

type TextSizeVariants = keyof typeof Styles.sizeVariants

export type TextProps = {
  size?: TextSizeVariants
  bold?: boolean
  color?: string
  children: string
}

type StyledTextProps = Pick<TextProps, 'size' | 'bold' | 'color'>

export const Text = styled[DEFAULT_TAG]<StyledTextProps>`
  ${Styles.base}
  ${props => Styles.sizeVariants[props.size || "4"]}
  ${props => props.bold ? "font-weight: 600;" : ""}
  ${props => props.color ? `color: ${props.color};` : ""}
`
