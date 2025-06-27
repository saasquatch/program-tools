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
    font: "Netflix Sans, Arial, sans-serif",
    textColor: "white",
    secondaryTextColor: "#B3B3B3",
  },
  border: {
    color: "#333333",
    radius: "4px",
    thickness: "1px",
  },
  color: {
    primaryColor: "#E50914",
    background: "#101010",
    accentColorShades: {
      text: "#E50914",
      icon: "#E50914",
      border: "#E50914",
      background: "#300609",
      iconAndBadge: "#E50914",
    },
    success: {
      text: "#66BB6A",
      icon: "#4CAF50",
      border: "#4CAF50",
      background: "#1B5E20",
      iconAndBadge: "#4CAF50",
    },
    warning: {
      text: "#FFCA28",
      icon: "#FFA726",
      border: "#FFA726",
      background: "#F57C00",
      iconAndBadge: "#FFA726",
    },
    critical: {
      text: "#EF9A9A",
      icon: "#E50914",
      border: "#E50914",
      background: "#B71C1C",
      iconAndBadge: "#E50914",
    },
    informative: {
      text: "#64B5F6",
      icon: "#42A5F5",
      border: "#42A5F5",
      background: "#1976D2",
      iconAndBadge: "#42A5F5",
    },
    neutral: {
      text: "white",
      icon: "#B3B3B3",
      border: "#333333",
      background: "#222222",
      iconAndBadge: "#B3B3B3",
    },
  },
  primaryButton: {
    buttonColor: "#E50914",
    buttonTextColor: "#FFFFFF",
    borderRadius: "4px",
    buttonBorderColor: "transparent",
    hoverColor: "#CC0000",
    hoverTextColor: "#FFFFFF",
  },
  secondaryButton: {
    buttonColor: "transparent",
    buttonTextColor: "#FFFFFF",
    buttonBorderColor: "#B3B3B3",
    borderRadius: "4px",
    hoverColor: "#333333",
    hoverTextColor: "#FFFFFF",
  },
  tertiaryButton: {
    buttonColor: "transparent",
    buttonTextColor: "#FFFFFF",
    borderRadius: "4px",
  },
  inputs: {
    background: "#222222",
    borderColor: "#B3B3B3",
    borderRadius: "4px",
    textColor: "white",
    labelColor: "#B3B3B3",
    borderThickness: "1px",
    disabledBackground: "#333333",
    disabledTextColor: "#777777",
    labelFontSize: "14px",
    focusBorderColor: "#E50914",
    hoverBorderColor: "#777777",
  },
};

export const Amazon: BrandingConfig = {
  font: {
    font: "Amazon Ember, Arial, sans-serif",
    textColor: "#2f2f2f",
    secondaryTextColor: "#565959",
  },
  border: {
    color: "#d5d9d9",
    radius: "4px",
    thickness: "1px",
  },
  color: {
    primaryColor: "#FF9900",
    background: "#ffffff",
    accentColorShades: {
      text: "#FF9900",
      icon: "#FF9900",
      border: "#FFBF66",
      background: "#FFF4DD",
      iconAndBadge: "#FF9900",
    },
    success: {
      text: "#198754",
      icon: "#28A745",
      border: "#BCE8B2",
      background: "#D4EDDA",
      iconAndBadge: "#28A745",
    },
    warning: {
      text: "#856404",
      icon: "#FFC107",
      border: "#FFEBA2",
      background: "#FFF3CD",
      iconAndBadge: "#FFC107",
    },
    critical: {
      text: "#721C24",
      icon: "#DC3545",
      border: "#F5C6CB",
      background: "#F8D7DA",
      iconAndBadge: "#DC3545",
    },
    informative: {
      text: "#004085",
      icon: "#007BFF",
      border: "#B8DAFF",
      background: "#CCE5FF",
      iconAndBadge: "#007BFF",
    },
    neutral: {
      text: "#232F3E",
      icon: "#565959",
      border: "#D5D9D9",
      background: "#F0F2F2",
      iconAndBadge: "#565959",
    },
  },
  primaryButton: {
    buttonColor: "#FF9900",
    buttonTextColor: "#FFFFFF",
    borderRadius: "7px",
    buttonBorderColor: "transparent",
    hoverColor: "#EB9100",
    hoverTextColor: "#FFFFFF",
  },
  secondaryButton: {
    buttonColor: "#FFFFFF",
    buttonTextColor: "#232F3E",
    buttonBorderColor: "#888C8C",
    borderRadius: "7px",
    hoverColor: "#F0F2F2",
    hoverTextColor: "#232F3E",
  },
  tertiaryButton: {
    buttonColor: "transparent",
    buttonTextColor: "#007185",
    borderRadius: "7px",
  },
  inputs: {
    background: "#FFFFFF",
    borderColor: "#D5D9D9",
    borderRadius: "3px",
    textColor: "#2f2f2f",
    labelColor: "#565959",
    borderThickness: "1px",
    disabledBackground: "#EAEDED",
    disabledTextColor: "#888C8C",
    labelFontSize: "14px",
    focusBorderColor: "#007185",
    hoverBorderColor: "#A2A2A2",
  },
  // widgetSize would need specific values based on context, so keeping as default if not provided
  // widgetSize: {
  //   embeddedWidgets: {},
  //   popupWidgets: {},
  // },
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
  primaryButton: {
    buttonColor: "#1ed760",
    buttonTextColor: "#121212",
    borderRadius: "30px",
    buttonBorderColor: "transparent",
    hoverColor: "#1DB954",
    hoverTextColor: "#121212",
  },
  secondaryButton: {
    buttonColor: "#191414",
    buttonTextColor: "#FFFFFF",
    buttonBorderColor: "#FFFFFF",
    borderRadius: "30px",
    hoverColor: "#282828",
    hoverTextColor: "#121212",
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
    radius: "8px",
    thickness: "1px",
  },
  font: {
    font: "Roboto, Arial, sans-serif",
    textColor: "#212124",
    secondaryTextColor: "#5F6368",
  },
  primaryButton: {
    buttonColor: "#4285F4",
    buttonTextColor: "#FFFFFF",
    borderRadius: "4px",
    buttonBorderColor: "transparent",
    hoverColor: "#3C7CD1",
    hoverTextColor: "#FFFFFF",
  },
  secondaryButton: {
    buttonColor: "#FFFFFF",
    buttonTextColor: "#4285F4",
    buttonBorderColor: "#DADCE0",
    borderRadius: "4px",
    hoverColor: "#E8F0FE",
    hoverTextColor: "#4285F4",
  },
  tertiaryButton: {
    buttonColor: "transparent",
    buttonTextColor: "#4285F4",
    borderRadius: "4px",
  },
  inputs: {
    background: "#FFFFFF",
    borderColor: "#DADCE0",
    borderThickness: "1px",
    borderRadius: "8px",
    textColor: "#202124",
    focusBorderColor: "#4285F4",
    labelColor: "#5F6368",
    hoverBorderColor: "#9AA0A6",
    labelFontSize: "12px",
    disabledTextColor: "#9AA0A6",
    disabledBackground: "#F1F3F4",
  },
};
