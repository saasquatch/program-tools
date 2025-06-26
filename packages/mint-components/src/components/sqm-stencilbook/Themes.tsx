/**
 *
 * Themes
 *
 * Export only valid CSS. Those will be injected into style tags.
 *
 * Useful links:
 *  - https://brandcolors.net/
 *  - Shoelace color generator: https://codepen.io/claviska/full/QWveRgL
 *
 */

import { autoColorScaleCss } from "./AutoColor";

//
export const Default = null;

export const Netflix: BrandingConfig = {
  font: {
    textColor: "white",
  },
  color: {
    background: "#101010",
    accentColorShades: {
      iconAndBadge: "#E50914",
    },
  },
};

export const Amazon: BrandingConfig = {
  font: {
    textColor: "#2f2f2f",
  },
  border: {
    color: "#d5d9d9",
  },
  color: {
    background: "#ffffff",
    accentColorShades: {
      iconAndBadge: "#FF9900",
    },
  },
};

export const Spotify: BrandingConfig = {
  font: {
    textColor: "white",
  },
  color: {
    background: "#121212",
    accentColorShades: {
      iconAndBadge: "#1ed760",
    },
  },
  inputs: {
    background: "#121212",
    borderColor: "#7c7c7c",
    borderThickness: "1px",
    borderRadius: "30px",
    textColor: "#fff",
    focusBorderColor: "white",
    labelColor: "white",
    hoverBorderColor: "white",
    labelFontSize: "18px",
    disabledTextColor: "white",
    disabledBackground: "#303030",
  },
};

export const Google: BrandingConfig = {
  color: {
    primaryColor: "#4285F4",
    background: "#FFFFFF",
    accentColorShades: {
      text: "#1A73E8",
      border: "#8AB4F8",
      background: "#E8F0FE",
      iconAndBadge: "#4285F4",
    },
    success: {
      text: "#044e1d",
      border: "#A8DCD7",
      background: "#E6F4EA",
      iconAndBadge: "#34A853",
    },
    warning: {
      text: "#996a3d",
      border: "#FCD667",
      background: "#FFF7EE",
      iconAndBadge: "#FBBC04",
    },
    critical: {
      text: "#760b09",
      border: "#F28B82",
      background: "#FCE8E6",
      iconAndBadge: "#EA4335",
    },
    informative: {
      text: "#01368c",
      border: "#A8DCD7",
      background: "#E8F0FE",
      iconAndBadge: "#4285F4",
    },
    neutral: {
      text: "#202124",
      border: "#DADCE0",
      background: "#F8F9FA",
      iconAndBadge: "#5F6368",
    },
  },
  border: {
    color: "#DADCE0",
    radius: 8,
    width: 1,
  },
  font: {
    font: "Roboto, Arial, sans-serif",
    textColor: "#212124",
    secondaryTextColor: "#5F6368",
  },
  primaryButton: {
    buttonColor: "#4285F4",
    buttonTextColor: "#FFFFFF",
    borderRadius: 4,
  },
  secondaryButton: {
    buttonColor: "#FFFFFF",
    buttonTextColor: "#4285F4",
    buttonBorderColor: "#DADCE0",
    borderRadius: 4,
  },
  tertiaryButton: {
    buttonColor: "transparent",
    buttonTextColor: "#4285F4",
    borderRadius: 4,
  },
};
