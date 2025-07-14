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

import { BrandingConfiguration } from "../../saasquatch";

// @ts-nocheck
export const Default = null;

export const Netflix: BrandingConfiguration = {
  main: {
    brandFont: "Netflix Sans, Arial, sans-serif",
    brandColor: "#E50914",
  },
  border: {
    borderColor: "#333333",
    borderRadius: 4,
    borderThickness: 1,
  },
  color: {
    textColorShades: {
      mainText: "white",
      subduedText: "#B3B3B3",
    },
    backgroundColor: "#101010",
    accentColorShades: {
      text: "#E50914",
      icon: "#E50914",
      border: "#E50914",
      background: "#300609",
    },
    success: {
      text: "#66BB6A",
      border: "#4CAF50",
      background: "#1B5E20",
      iconAndBadge: "#4CAF50",
    },
    warning: {
      text: "#FFCA28",
      border: "#FFA726",
      background: "#F57C00",
      iconAndBadge: "#FFA726",
    },
    critical: {
      text: "#EF9A9A",
      border: "#E50914",
      background: "#B71C1C",
      iconAndBadge: "#E50914",
    },
    informative: {
      text: "#64B5F6",
      border: "#42A5F5",
      background: "#1976D2",
      iconAndBadge: "#42A5F5",
    },
    neutral: {
      text: "white",
      iconAndBadge: "#B3B3B3",
      border: "#333333",
      background: "#222222",
    },
  },
  primaryButton: {
    buttonColor: {
      background: "#E50914",
      border: "transparent",
      label: "#FFFFFF",
    },
    buttonHoverColor: {
      background: "#CC0000",
      border: "transparent",
      label: "#FFFFFF",
    },
    borderRadius: 4,
  },
  secondaryButton: {
    buttonColor: {
      background: "transparent",
      border: "#B3B3B3",
      label: "#FFFFFF",
    },
    buttonHoverColor: {
      background: "#333333",
      border: "#B3B3B3",
      label: "#FFFFFF",
    },
    borderRadius: 4,
  },
  formFields: {
    formFieldColor: {
      background: "#222222",
      border: "#B3B3B3",
      inputText: "#B3B3B3",
    },
    hoverStateColor: "#777777",
    selectedStateColor: "#E50914",
    borderRadius: 4,
  },
};

export const Amazon: BrandingConfiguration = {
  main: {
    brandFont: "Amazon Ember, Arial, sans-serif",
    brandColor: "#FF9900",
  },
  border: {
    borderColor: "#D5D9D9",
    borderRadius: 4,
    borderThickness: 1,
  },
  color: {
    backgroundColor: "#ffffff",
    textColorShades: {
      mainText: "#2f2f2f",
      subduedText: "#565959",
    },
    accentColorShades: {
      text: "#FF9900",
      icon: "#FF9900",
      border: "#FFBF66",
      background: "#FFF4DD",
    },
    success: {
      text: "#198754",
      border: "#BCE8B2",
      background: "#D4EDDA",
      iconAndBadge: "#28A745",
    },
    warning: {
      text: "#856404",
      border: "#FFEBA2",
      background: "#FFF3CD",
      iconAndBadge: "#FFC107",
    },
    critical: {
      text: "#721C24",
      border: "#F5C6CB",
      background: "#F8D7DA",
      iconAndBadge: "#DC3545",
    },
    informative: {
      text: "#004085",
      border: "#B8DAFF",
      background: "#CCE5FF",
      iconAndBadge: "#007BFF",
    },
    neutral: {
      text: "#232F3E",
      iconAndBadge: "#565959",
      border: "#D5D9D9",
      background: "#F0F2F2",
    },
  },
  primaryButton: {
    buttonColor: {
      background: "#FF9900",
      border: "transparent",
      label: "#FFFFFF",
    },
    buttonHoverColor: {
      background: "#EB9100",
      border: "transparent",
      label: "#FFFFFF",
    },
    borderRadius: 4,
  },
  secondaryButton: {
    buttonColor: {
      background: "#FFFFFF",
      border: "#888C8C",
      label: "#232F3E",
    },
    buttonHoverColor: {
      background: "#F0F2F2",
      border: "#888C8C",
      label: "#232F3E",
    },
    borderRadius: 4,
  },
  formFields: {
    formFieldColor: {
      background: "#FFFFFF",
      border: "#D5D9D9",
      inputText: "#2f2f2f",
    },
    borderRadius: 4,
    hoverStateColor: "#A2A2A2",
    selectedStateColor: "#007185",
  },
};

export const Spotify: BrandingConfiguration = {
  main: {
    brandColor: "#1ed760",
  },
  border: {
    borderColor: "#f4f4f4",
    borderRadius: 18,
    borderThickness: 1,
  },
  color: {
    textColorShades: {
      mainText: "white",
      subduedText: "white",
    },
    backgroundColor: "#121212",
    accentColorShades: {
      icon: "#1ed760",
    },
  },
  primaryButton: {
    buttonColor: {
      background: "#1ed760",
      border: "transparent",
      label: "#121212",
    },
    buttonHoverColor: {
      background: "#1DB954",
      border: "transparent",
      label: "#121212",
    },
    borderRadius: 30,
  },
  secondaryButton: {
    buttonColor: {
      background: "#191414",
      border: "#FFFFFF",
      label: "#FFFFFF",
    },
    buttonHoverColor: {
      background: "#282828",
      border: "#FFFFFF",
      label: "#121212",
    },
    borderRadius: 30,
  },
  formFields: {
    formFieldColor: {
      background: "#121212",
      border: "#7c7c7c",
      inputText: "#fff",
    },
    borderRadius: 30,
    hoverStateColor: "white",
    selectedStateColor: "white",
  },
};

export const Google: BrandingConfiguration = {
  main: { brandColor: "#4285F4", brandFont: "Roboto, Arial, sans-serif" },
  border: {
    borderColor: "#DADCE0",
    borderRadius: 4,
    borderThickness: 1,
  },
  color: {
    textColorShades: {
      mainText: "#212124",
      subduedText: "#5F6368",
    },
    backgroundColor: "#FFFFFF",
    accentColorShades: {
      text: "#1A73E8",
      border: "#8AB4F8",
      background: "#E8F0FE",
      icon: "#4285F4",
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
  primaryButton: {
    buttonColor: {
      background: "#4285F4",
      border: "transparent",
      label: "#FFFFFF",
    },
    buttonHoverColor: {
      background: "#3C7CD1",
      border: "transparent",
      label: "#FFFFFF",
    },
    borderRadius: 4,
  },
  secondaryButton: {
    buttonColor: {
      background: "#FFFFFF",
      border: "#DADCE0",
      label: "#4285F4",
    },
    buttonHoverColor: {
      background: "#E8F0FE",
      border: "#DADCE0",
      label: "#4285F4",
    },
    borderRadius: 4,
  },
  formFields: {
    formFieldColor: {
      background: "#FFFFFF",
      border: "#DADCE0",
      inputText: "#202124",
    },
    borderRadius: 4,
    hoverStateColor: "#9AA0A6",
    selectedStateColor: "#4285F4",
  },
};
