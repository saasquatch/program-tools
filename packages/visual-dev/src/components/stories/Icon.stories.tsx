import React from 'react'
import { Icon } from '../Icon'

export default {
  title: 'Components / Icon',
  component: Icon,
}

export const add = () => <Icon icon={'add'} />
export const SizeSmall = () => <Icon size='small' icon={'add'} />
export const SizeMedium = () => <Icon size='medium' icon={'add'} />
export const SizeLarge = () => <Icon size='large' icon={'add'} />
export const SizeCustom = () => <Icon size='88px' icon={'add'} />
export const CSSCustom = () => <Icon css='color: red; width: 50px; height: 50px; margin-left: 50px;' icon={'add'} />
export const close = () => <Icon icon={'close'} />
export const ChevronDown = () => <Icon icon={'chevron_down'} />
export const calendar = () => <Icon icon={'calendar'} />
export const block = () => <Icon icon={'block'} />
export const edit = () => <Icon icon={'edit'} />
export const checkmark = () => <Icon icon={'checkmark'} />
export const CheckmarkCircle = () => <Icon icon={'checkmark_circle'} />
export const actions = () => <Icon icon={'actions'} />
export const ChevronLeft = () => <Icon icon={'chevron_left'} />
export const ChevronRight = () => <Icon icon={'chevron_right'} />
export const mail = () => <Icon icon={'mail'} />
export const action = () => <Icon icon={'action'} />
export const arrowDropdown = () => <Icon icon={'arrow_dropdown'} />
export const help = () => <Icon icon={'help'} />
export const loading = () => <Icon color='var(--sq-action-primary)' icon={'loading'} />
export const gift = () => <Icon icon={'gift'} />
export const copy = () => <Icon color='var(--sq-action-primary)' icon={'copy'} />
export const alert = () => <Icon icon={'alert'} />
export const search = () => <Icon icon={'search'} />
export const filter = () => <Icon icon={'filter'} />
export const trash = () => <Icon icon={'trash'} />
export const info = () => <Icon icon={'info'} />
export const settings = () => <Icon icon={'settings'} />
export const avatar = () => <Icon icon={'avatar'} />
export const leftwardArrow = () => <Icon icon={'leftward_arrow'} />
