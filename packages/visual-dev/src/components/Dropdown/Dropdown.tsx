import * as React from 'react'
import styled, { CSSProp } from 'styled-components'
import { IconKey, Icon } from '../Icon'
import * as Styles from './Styles'

type DropdownProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  text?: string
  showMenu?: boolean
  pill?: boolean
  center?: boolean
  narrow?: boolean
  disabled?: boolean
  icon?: IconKey
  onClickDropdown?: () => void
  children?: React.ReactNode
}

interface ButtonProps {
  pill?: boolean
  center?: boolean
  narrow?: boolean
  disabled?: boolean
}

interface StyleProps {
  css?: CSSProp
}

const DropdownContainer = styled('div')`
  ${Styles.base}
`

const DropdownButton = styled('div')<Required<ButtonProps>>`
  ${Styles.button}
  border-radius: ${(props) => (props.pill == true ? '100px' : '4px')};
  text-align: ${(props) => (props.center == true ? 'center' : 'left')};
  line-height: ${(props) => (props.narrow == true ? '10px' : '16px')};
  color: ${(props) => (props.disabled == true ? '#A6B9BD' : '#575757')};
  background: ${(props) => (props.disabled == true ? '#F6F6F6' : '#FFFFFF')};
  user-select: none;
  &:hover {
    ${(props) => (props.disabled == true ? '' : 'box-shadow: inset 0 0 0 1px #A6B9BD;')}
    ${(props) => (props.disabled == true ? 'cursor: not-allowed;' : '')};
  }
`
const DropdownContent = styled('div')<Pick<DropdownProps, 'pill'>>`
  ${Styles.content}
  border-radius: ${(props) => (props.pill ? '20px' : '4px')};
`

const DropdownItemStyle = styled('div')`
  ${Styles.item}
`

const SublistContent = styled('div')`
  ${Styles.subcontent}
`

const DropdownSubItemStyle = styled('div')`
  ${Styles.subitem}
`

const DropdownSublistStyle = styled('div')`
  ${Styles.sublist}
`

const ArrowStyle = styled('span')`
  ${Styles.arrow}
`

export const Dropdown: React.FC<DropdownProps> = ({ text = '', showMenu = false, pill = false, center = false, narrow = false, disabled = false, icon, onClickDropdown, children }) => {
  return (
    <DropdownContainer>
      <DropdownButton pill={pill} center={center} narrow={narrow} disabled={disabled} onClick={onClickDropdown}>
        {icon && <Icon color='inherit' size='16px' icon={icon} style={{ marginRight: '8px' }} />}
        {text} <ArrowStyle>{showMenu ? arrow_up : arrow_down}</ArrowStyle>
      </DropdownButton>
      {showMenu && <DropdownContent pill={pill}>{children}</DropdownContent>}
    </DropdownContainer>
  )
}
interface DropdownItemProps {
  onClick?: () => void
  children?: React.ReactNode
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ onClick, children }) => {
  return <DropdownItemStyle onClick={onClick}>{children}</DropdownItemStyle>
}
interface DropdownSublistProps {
  name: string
  children: React.ReactNode
}

export const DropdownSublist: React.FC<DropdownSublistProps> = ({ name, children }) => {
  return (
    <SublistContent>
      <DropdownSublistStyle>{name}</DropdownSublistStyle>
      <DropdownSubItemStyle>{children}</DropdownSubItemStyle>
    </SublistContent>
  )
}

const arrow_up = (
  <svg width={10} height={6} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' clipRule='evenodd' d='M.146 4.517L1.25 5.4 5 2.4l3.75 3 1.104-.883L5 .634.146 4.517z' fill='#858585' />
  </svg>
)

const arrow_down = (
  <svg width={10} height={6} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' clipRule='evenodd' d='M.146 1.483L1.25.6 5 3.6l3.75-3 1.104.883L5 5.366.146 1.483z' fill='#858585' />
  </svg>
)
