import React from 'react'
import { Badge } from '../Badge'

export default {
  title: 'Components / Badge',
  component: Badge,
}

export const defaultBadge = () => <Badge status='info'>Default Badge</Badge>

export const defaultBadgeWithIcon = () => (
  <Badge status='info' icon='gift'>
    Badge with icon
  </Badge>
)

export const successBadge = () => <Badge status='success'>Default Badge</Badge>

export const successBadgeWithIcon = () => (
  <Badge status='success' icon='gift'>
    Badge with icon
  </Badge>
)

export const activeBadge = () => <Badge status='active'>Default Badge</Badge>

export const activeBadgeWithIcon = () => (
  <Badge status='active' icon='gift'>
    Badge with icon
  </Badge>
)

export const criticalBadge = () => <Badge status='critical'>Default Badge</Badge>

export const criticalBadgeWithIcon = () => (
  <Badge status='critical' icon='gift'>
    Badge with icon
  </Badge>
)

export const warningBadge = () => <Badge status='warning'>Default Badge</Badge>

export const warningBadgeWithIcon = () => (
  <Badge status='warning' icon='gift'>
    Badge with icon
  </Badge>
)

export const defaultLongBadge = () => <Badge status='info'>A badge with a really really long name</Badge>

export const defaultLongBadgeWithIcon = () => (
  <Badge status='info' icon='gift'>
    A badge with a really really long name
  </Badge>
)

export const iconOnly = () => <Badge status='info' icon='trash' />

export const badgeCSS = () => (
  <Badge status='info' css='color: yellow; background: blue;'>
    CSS Badge
  </Badge>
)
