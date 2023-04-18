import React from "react";
import { Badge, BadgeView } from ".";

export default {
  title: "Components / Badge",
  component: Badge,
};

export const defaultBadge = () => (
  <BadgeView status="info">Default Badge</BadgeView>
);

export const defaultBadgeWithIcon = () => (
  <BadgeView status="info" icon="gift">
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

export const longBadge = () => (
  <BadgeView status="info">A badge with a really really long name</BadgeView>
);

export const longBadgeWithIcon = () => (
  <BadgeView status="info" icon="gift">
    A badge with a really really long name
  </BadgeView>
);

export const badgeIcon = () => <BadgeView status="info" icon="trash" />;

export const defaultBadgePill = () => (
  <BadgeView status="info" pill>
    Default Badge
  </BadgeView>
);

export const defaultBadgeWithIconPill = () => (
  <BadgeView status="info" icon="gift" pill>
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

export const longBadgePill = () => (
  <BadgeView status="info" pill>
    A badge with a really really long name
  </BadgeView>
);

export const longBadgeWithIconPill = () => (
  <BadgeView status="info" icon="gift" pill>
    A badge with a really really long name
  </BadgeView>
);

export const badgeIconPill = () => (
  <BadgeView status="info" icon="trash" pill />
);

export const badgeCSS = () => (
  <BadgeView
    status="info"
    customCSS="color: yellow; background: blue; font-size: 10px"
  >
    CSS Badge
  </BadgeView>
);

export const smallBadge = () => (
  <BadgeView status="info" size="small">
    Small Badge
  </BadgeView>
);

export const smallBadgePill = () => (
  <BadgeView status="info" size="small" pill>
    Small Badge
  </BadgeView>
);
