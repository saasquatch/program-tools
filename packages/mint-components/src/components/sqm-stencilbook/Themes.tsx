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
    }
`;

export const Amazon = `
:root{
    --sqm-portal-background: #ffffff !important;
}
`;

export const Spotify = `
:root{
    --sqm-portal-background: #121212 !important;
}
`;

export const Google = `
:root{
    --sqm-portal-background: #ffffff !important;
}
`;
