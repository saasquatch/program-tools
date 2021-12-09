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

export const Orangey = `
:root{
    ${autoColorScaleCss("orange")}
}
`;

export const Netflix = `
:root{
    ${autoColorScaleCss("#e50914")}
}
`;

export const SaaSquatchCorporate = `
:root{
    ${autoColorScaleCss("green")}
    --sl-font-sans: Arial;
}
`;

export const NYTimes = `
:root{
    ${autoColorScaleCss("black")}
    --sl-font-sans: Georgia, 'Times New Roman', serif;
}
`;
