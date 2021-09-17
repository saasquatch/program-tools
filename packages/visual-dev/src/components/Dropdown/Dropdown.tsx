import * as React from 'react'
import styled, { CSSProp } from 'styled-components'

import * as Styles from './Styles'

type DropdownProps = OptionProps & StyleProps & React.ComponentProps<'div'>

interface OptionProps {
  text?: string
  menu?: boolean
  pill?: boolean
  center?: boolean
  narrow?: boolean
  disabled?: boolean
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
  position: relative;
  width: 191px;
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
  ${Styles.content} // border-radius: ${(props) => (props.pill == true ? '4px' : '20px')};
  &:empty {
    border: none;
  }
`
const DropdownItemStyle = styled('div')`
  padding: 15px;
  cursor: pointer;
  color: #575757;
  font-family: Helvetica;
  font-size: 14px;
  border-radius: inherit;

  &:hover {
    background: #eef6ff;
  }
`

const SublistContent = styled('div')`
  border-radius: inherit;
`

const DropdownSubItemStyle = styled('div')`
  padding-left: 15px;
  border-radius: inherit;
`

const DropdownSublistStyle = styled('div')`
  padding: 15px;
  border-radius: inherit;

  user-select: none;
  color: #575757;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: bold;
`

const ArrowStyle = styled('span')`
  position: relative;
  bottom: 1px;
  float: right;
`

// const DropdownContainer = styled("div")`
// 	background: red;
// `

// const DropdownButton = styled("button")`
// `
// const DropdownHeader = styled("div")``

// const DropdownListContainer = styled("div")``
// const DropdownList = styled("ul")``
// const ListItem = styled("li")``

export const Dropdown: React.FC<DropdownProps> = ({ text = '', menu = false, pill = false, center = false, narrow = false, disabled = false, onClickDropdown, children }) => {
  return (
    <DropdownContainer>
      <DropdownButton pill={pill} center={center} narrow={narrow} disabled={disabled} onClick={onClickDropdown}>
        {text} <ArrowStyle>{menu ? arrow_up : arrow_down}</ArrowStyle>
      </DropdownButton>
      {menu && <DropdownContent pill={pill}>{children}</DropdownContent>}
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

// export const DropdownList: React.FC<DropdownProps> = ({
// 	children
// }) => {
// 	return (
// 		<ListItem>
// 			{children}
// 		</ListItem>
// 	)
// }

// export const DropdownItem: React.FC<DropdownProps> = ({
// 	children
// }) => {
// 	return (
// 		<ListItem>
// 			{children}
// 		</ListItem>
// 	)
// }

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
