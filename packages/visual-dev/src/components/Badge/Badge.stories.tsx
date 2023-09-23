import React from "react";
import { Badge, BadgeView } from ".";

export default {
  tags: ["autodocs"],
  title: "Components / Badge",
  component: Badge,
};

export const defaultBadge = () => (
  <BadgeView status="default-style">Default Badge</BadgeView>
);

export const defaultBadgeWithIcon = () => (
  <BadgeView status="default-style" icon="gift">
    Badge with icon
  </BadgeView>
);

export const successBadge = () => (
  <BadgeView status="success">Default Badge</BadgeView>
);

export const successBadgeWithIcon = () => (
  <BadgeView status="success" icon="gift">
    Badge with icon
  </BadgeView>
);
export const criticalBadge = () => (
  <BadgeView status="critical">Default Badge</BadgeView>
);

export const criticalBadgeWithIcon = () => (
  <BadgeView status="critical" icon="gift">
    Badge with icon
  </BadgeView>
);

export const warningBadge = () => (
  <BadgeView status="warning">Default Badge</BadgeView>
);

export const warningBadgeWithIcon = () => (
  <BadgeView status="warning" icon="gift">
    Badge with icon
  </BadgeView>
);

export const infoBadge = () => (
  <BadgeView status="info">Default Badge</BadgeView>
);

export const infoBadgeWithIcon = () => (
  <BadgeView status="info" icon="gift">
    Default Badge
  </BadgeView>
);

export const longBadge = () => (
  <BadgeView status="default-style">
    A badge with a really really long name
  </BadgeView>
);

export const longBadgeWithIcon = () => (
  <BadgeView status="default-style" icon="gift">
    A badge with a really really long name
  </BadgeView>
);

export const badgeIcon = () => (
  <BadgeView status="default-style" icon="trash" />
);

export const defaultBadgePill = () => (
  <BadgeView status="default-style" pill>
    Default Badge
  </BadgeView>
);

export const defaultBadgeWithIconPill = () => (
  <BadgeView status="default-style" icon="gift" pill>
    Badge with icon
  </BadgeView>
);

export const successBadgePill = () => (
  <BadgeView status="success" pill>
    Default Badge
  </BadgeView>
);

export const successBadgeWithIconPill = () => (
  <BadgeView status="success" icon="gift" pill>
    Badge with icon
  </BadgeView>
);
export const criticalBadgePill = () => (
  <BadgeView status="critical" pill>
    Default Badge
  </BadgeView>
);

export const criticalBadgeWithIconPill = () => (
  <BadgeView status="critical" icon="gift" pill>
    Badge with icon
  </BadgeView>
);

export const warningBadgePill = () => (
  <BadgeView status="warning" pill>
    Default Badge
  </BadgeView>
);

export const warningBadgeWithIconPill = () => (
  <BadgeView status="warning" icon="gift" pill>
    Badge with icon
  </BadgeView>
);

export const infoBadgePill = () => (
  <BadgeView status="info" pill>
    Default Badge
  </BadgeView>
);

export const infoBadgeWithIconPill = () => (
  <BadgeView status="info" icon="gift" pill>
    Badge with icon
  </BadgeView>
);

export const longBadgePill = () => (
  <BadgeView status="default-style" pill>
    A badge with a really really long name
  </BadgeView>
);

export const longBadgeWithIconPill = () => (
  <BadgeView status="default-style" icon="gift" pill>
    A badge with a really really long name
  </BadgeView>
);

export const badgeIconPill = () => (
  <BadgeView status="default-style" icon="trash" pill />
);

export const badgeCSS = () => (
  <BadgeView
    status="default-style"
    customCSS="color: yellow; background: blue; font-size: 10px"
  >
    CSS Badge
  </BadgeView>
);

export const smallBadge = () => (
  <BadgeView status="default-style" size="small">
    Small Badge
  </BadgeView>
);

export const smallBadgePill = () => (
  <BadgeView status="default-style" size="small" pill>
    Small Badge
  </BadgeView>
);

export const smallBadgePillWithIcon = () => (
  <BadgeView status="default-style" size="small" pill icon="gift">
    Small Badge
  </BadgeView>
);
