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
export const Default = `
 // No CSS
`;

export const Netflix = `
:root{
    --sqm-portal-background: #101010 !important;
      --sqm-text: white;

          --sqm-accent-color-icon: #E50914;
    }
`;

export const Amazon = `
:root{
    --sqm-portal-background: #ffffff !important;
    --sqm-text: #2f2f2f;
    --sqm-border-color: #d5d9d9;

    --sqm-accent-color-icon: #FF9900;
}
`;

export const Spotify = `
:root{
    --sqm-portal-background: #121212 !important;
      --sqm-text: white;
}
`;

export const Google = `
:root{
    --sqm-portal-background: #ffffff !important;
    --sqm-text: #212124;
    --sqm-border-color: #E0E0E0;

        --sqm-accent-color-icon: #4285F4;
    
}
`;
