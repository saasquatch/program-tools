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

export const Klip = `
:root{
	--sl-color-primary-50: #E8E5F8;
    --sl-color-primary-100: #C6BEED;
    --sl-color-primary-200: #A192E2;
    --sl-color-primary-300: #7B66D6;
    --sl-color-primary-400: #5E46CD;
    --sl-color-primary-500: #4225C4;
    --sl-color-primary-600: #3C21BE;
    --sl-color-primary-700: #331BB6;
    --sl-color-primary-800: #2B16AF;
    --sl-color-primary-900: #1D0DA2;
}
`;
