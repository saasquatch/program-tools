import React from 'react';
import styled from 'styled-components'
import {Text, TextProps} from '../Text'
import * as Styles from './Styles'

type ParagraphSizeVariants = { size?: "1" | "2" }
export type ParagraphProps = ParagraphSizeVariants

const StyledParagraph = styled(Text)`
  ${Styles.base}
`

export const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>> = (props) => {
  const { size = "1", ...rest} = props

  const textSize: Record<typeof size, TextProps['size']> = {
    '1': '4',
    '2': '5',
  }

  return <StyledParagraph as={'p'} size={textSize[size]} {...rest} />
}
