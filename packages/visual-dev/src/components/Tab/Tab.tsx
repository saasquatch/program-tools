import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import * as Styles from './Styles'

type TabProps = OptionProps & StyleProps & React.ComponentProps<'div'>

type TabGroupProps = StyleProps & React.ComponentProps<'div'> & ITabGroupContext

interface ITabGroupContext {
  color?: string
  selected: number
  onTabClicked: (label: number) => void
}

interface OptionProps {
  label: number
  children?: React.ReactNode
}

interface StyleProps {
  css?: CSSProp
}

const TabGroupStyle = styled('div')<Required<StyleProps> & { color?: string }>`
  ${Styles.tabgroup}
  display: flex;
  background: transparent;
  color: ${(props) => props.color || '#003B45'};
  ${(props) => props.css}
  border-color: ${(props) => props.color || '#003B45'};
  border: none;
`

const TabStyle = styled('div')<Required<StyleProps & { selected: boolean }>>`
  ${Styles.tab}
  font-family: Helvetica;
  font-weight: normal;
  padding: 15px 12.5px;
  margin: 4px 18px;
  color: #999999;
  &:hover {
    color: inherit;
  }
  ${(props) => props.selected && `border-bottom: 2px solid white; color: inherit;`}
  border-color: inherit;
  ${(props) => props.css}
`

interface CompoundedComponent extends React.ForwardRefExoticComponent<TabGroupProps & React.RefAttributes<React.ElementRef<'div'>>> {
  Tab: typeof Tab
}

const TabGroupContext = React.createContext<ITabGroupContext>({ selected: 0, onTabClicked: () => {} })

export const TabGroup = React.forwardRef<React.ElementRef<'div'>, TabGroupProps>((props, forwardedRef) => {
  const { selected, color, onTabClicked, children, css = {}, ...rest } = props

  return (
    <TabGroupStyle color={color} {...rest} ref={forwardedRef} css={css}>
      <TabGroupContext.Provider value={{ selected, onTabClicked }}>{children}</TabGroupContext.Provider>
    </TabGroupStyle>
  )
}) as CompoundedComponent

const Tab = React.forwardRef<React.ElementRef<'div'>, TabProps>((props, forwardedRef) => {
  const { children, label, css = {}, ...rest } = props

  const { selected, onTabClicked } = React.useContext(TabGroupContext)

  return (
    <TabStyle selected={selected == label} onClick={() => onTabClicked(label)} {...rest} ref={forwardedRef} css={css}>
      {children}
    </TabStyle>
  )
})

TabGroup.Tab = Tab
