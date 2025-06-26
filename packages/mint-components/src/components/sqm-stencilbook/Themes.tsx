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
};

// export const Google: BrandingConfig = {
//   font: {
//     textColor: "#212124",
//   },
//   border: {
//     color: "#E0E0E0",
//   },
//   color: {
//     background: "#ffffff",
//     accentColorShades: {
//       icon: "#4285F4",
//     },
//   },
// };

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
      text: "#044e1d", // Darker green for text for contrast (Google's green is #34A853)
      border: "#A8DCD7", // Lighter, desaturated green for borders (e.g., Material Design Green 200/300 equivalent)
      background: "#E6F4EA", // Very light green for subtle backgrounds (e.g., Material Design Green 100 equivalent)
      iconAndBadge: "#34A853", // Google Green 500
    },
    warning: {
      text: "#996a3d", // Darker orange/brown for text (derived from Google Yellow for contrast)
      border: "#FCD667", // Lighter yellow for borders (e.g., Material Design Yellow 200/300 equivalent)
      background: "#FFF7EE", // Very light yellow for subtle backgrounds (e.g., Material Design Yellow 100 equivalent)
      iconAndBadge: "#FBBC04", // Google Yellow 500
    },
    critical: {
      // Renamed from "danger" in previous example to match common "critical" usage
      text: "#760b09", // Darker red for text for contrast (Google's red is #EA4335)
      border: "#F28B82", // Lighter red for borders (e.g., Material Design Red 200/300 equivalent)
      background: "#FCE8E6", // Very light red for subtle backgrounds (e.g., Material Design Red 100 equivalent)
      iconAndBadge: "#EA4335", // Google Red 500
    },
    informative: {
      text: "#01368c", // Darker blue for text for contrast (Google's blue is #4285F4)
      border: "#A8DCD7", // Lighter blue for borders (e.g., Material Design Blue 200/300 equivalent)
      background: "#E8F0FE", // Very light blue for subtle backgrounds (e.g., Material Design Blue 100 equivalent)
      iconAndBadge: "#4285F4", // Google Blue 500
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
