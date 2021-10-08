import React from 'react';
import styled, { CSSProp } from 'styled-components'
import { Text } from '../Text'
import * as Styles from './Styles'

const DEFAULT_TAG = 'h1'

type HeadingSizeVariants = {size?: keyof typeof Styles.sizeVariants}
export type HeadingProps = HeadingSizeVariants & { as?: any, css?: CSSProp }

type StyledHeadingProps = Required<HeadingProps>
const StyledHeading = styled(Text)<StyledHeadingProps>`
  ${Styles.base}
  ${props => Styles.sizeVariants[props.size]}
  ${props => props.css}
`

export const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = (props) => {
  const {size = "1", ...rest} = props

  return <StyledHeading size={size} as={DEFAULT_TAG} {...rest} />
}
