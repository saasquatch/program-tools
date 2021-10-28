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

export const longBadge = () => <Badge status='info'>A badge with a really really long name</Badge>

export const longBadgeWithIcon = () => (
  <Badge status='info' icon='gift'>
    A badge with a really really long name
  </Badge>
)

export const badgeIcon = () => <Badge status='info' icon='trash' />

export const defaultBadgePill = () => (
  <Badge status='info' pill>
    Default Badge
  </Badge>
)

export const defaultBadgeWithIconPill = () => (
  <Badge status='info' icon='gift' pill>
    Badge with icon
  </Badge>
)

export const successBadgePill = () => (
  <Badge status='success' pill>
    Default Badge
  </Badge>
)

export const successBadgeWithIconPill = () => (
  <Badge status='success' icon='gift' pill>
    Badge with icon
  </Badge>
)
export const criticalBadgePill = () => (
  <Badge status='critical' pill>
    Default Badge
  </Badge>
)

export const criticalBadgeWithIconPill = () => (
  <Badge status='critical' icon='gift' pill>
    Badge with icon
  </Badge>
)

export const warningBadgePill = () => (
  <Badge status='warning' pill>
    Default Badge
  </Badge>
)

export const warningBadgeWithIconPill = () => (
  <Badge status='warning' icon='gift' pill>
    Badge with icon
  </Badge>
)

export const longBadgePill = () => (
  <Badge status='info' pill>
    A badge with a really really long name
  </Badge>
)

export const longBadgeWithIconPill = () => (
  <Badge status='info' icon='gift' pill>
    A badge with a really really long name
  </Badge>
)

export const badgeIconPill = () => <Badge status='info' icon='trash' pill />

export const badgeCSS = () => (
  <Badge status='info' css='color: yellow; background: blue;'>
    CSS Badge
  </Badge>
)
