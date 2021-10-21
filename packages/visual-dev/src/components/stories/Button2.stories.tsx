import React, { useState } from 'react'
import { PrimaryButton } from '../Button'
import { Icon } from '../Icon'

export default {
  title: 'Components / PrimaryButton',
  component: PrimaryButton,
}
// size='small'
// size='medium'
// size='large'
export const primarySmall = () => <PrimaryButton size='small'>Primary</PrimaryButton>
export const primaryMedium = () => <PrimaryButton size='medium'>Primary</PrimaryButton>
export const primaryLarge = () => <PrimaryButton size='large'>Primary</PrimaryButton>

export const primaryIconSmall = () => <PrimaryButton size='small' icon='checkmark' />
export const primaryIconMedium = () => <PrimaryButton size='medium' icon='checkmark' />
export const primaryIconLarge = () => <PrimaryButton size='large' icon='checkmark' />

export const primaryCritical = () => <PrimaryButton critical>Critical</PrimaryButton>

export const primarySuccess = () => <PrimaryButton success>Success</PrimaryButton>
