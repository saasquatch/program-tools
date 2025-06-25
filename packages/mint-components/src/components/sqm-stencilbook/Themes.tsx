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
      icon: "#E50914",
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
      icon: "#FF9900",
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
      icon: "#1ed760",
    },
  },
};

export const Google: BrandingConfig = {
  font: {
    textColor: "#212124",
  },
  border: {
    color: "#E0E0E0",
  },
  color: {
    background: "#ffffff",
    accentColorShades: {
      icon: "#4285F4",
    },
  },
};
