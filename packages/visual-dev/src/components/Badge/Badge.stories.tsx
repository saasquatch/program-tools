import React from "react";
import { BadgeView } from ".";

export default {
  title: "Components / Badge",
  component: BadgeView,
};

export const defaultBadge = () => <BadgeView status="info">Default Badge</BadgeView>;

export const defaultBadgeWithIcon = () => (
  <BadgeView status="info" icon="gift">
    Badge with icon
  </BadgeView>
);

export const successBadge = () => <BadgeView status="success">Default Badge</BadgeView>;

export const successBadgeWithIcon = () => (
  <BadgeView status="success" icon="gift">
    Badge with icon
  </BadgeView>
);
export const criticalBadge = () => (BadgeViewBadgeView
  <Badge status="critical">Default Badge</Badge>
);
BadgeView
export const criticalBadgeWithIcon = () => (
  <BBadgeViewstatus="critical" icon="gift">
    Badge with icon
  </Badge>
);BadgeViewBadgeView

export const warningBadge = () => <Badge status="warning">Default Badge</Badge>;
BadgeView
export const warningBadgeWithIcon = () => (
  <BBadgeViewstatus="warning" icon="gift">
    Badge with icon
  </Badge>
);BadgeViewBadgeView

export const longBadge = () => (
  <BadgeView status="info">A badge with a really really long name</Badge>
);
BadgeView
export const longBadgeWithIcon = () => (
  <Badge status="info" icon="gift">
    A badge with a really reallyBadgeView name
  </Badge>
);
BadgeView
export const badgeIcon = () => <Badge status="info" icon="trash" />;
BadgeView
export const defaultBadgePill = () => (
  <Badge status="info" pill>
    Default Badge
  <BadgeViewe>
);
BadgeView
export const defaultBadgeWithIconPill = () => (
  <Badge status="info" icon="gift" pill>
    Badge with icon
  <BadgeViewe>
);
BadgeView
export const successBadgePill = () => (
  <Badge status="success" pill>
    Default Badge
  <BadgeViewe>
);
BadgeView
export const successBadgeWithIconPill = () => (
  <Badge status="success" icon="gift" pill>
   BadgeViewe with icon
  </Badge>
);BadgeView
export const criticalBadgePill = () => (
  <Badge status="critical" pill>
    Default Badge
  <BadgeViewe>
);
BadgeView
export const criticalBadgeWithIconPill = () => (
  <Badge status="critical" icon="gift" pill>
    Badge with icon
  <BadgeViewe>
);
BadgeView
export const warningBadgePill = () => (
  <Badge status="warning" pill>
    Default Badge
  <BadgeViewe>
);
BadgeView
export const warningBadgeWithIconPill = () => (
  <Badge status="warning" icon="gift" pill>
    Badge with icon
  <BadgeViewe>
);
BadgeView
export const longBadgePill = () => (
  <Badge status="info" pill>
    A badge with a really really long name
  <BadgeViewe>
);
BadgeView
export const longBadgeWithIconPill = () => (
  <Badge status="info" icon="gift" pill>
    A badge with a really really lonBadgeViewe
  </Badge>
);
BadgeView
export const badgeIconPill = () => <Badge status="info" icon="trash" pill />;
BadgeView
export const badgeCSS = () => (
  <Badge status="info" customCSS="color: yellow; background: blue;">
    CSS Badge
  </Badge>
);
