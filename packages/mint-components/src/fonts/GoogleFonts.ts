
/**
 * Build a font CSS URL using the Google Fonts CSS API
 * 
 * Docs: https://developers.google.com/fonts/docs/css2
 * 
 * @param fonts - the font family or families to load
 * @returns url to a .css file
 */
export function buildFontsCssUrl(...fonts:string[]):string{
    const queryString = fonts.map(f=>`family=${encodeURIComponent(f)}`).join("&");
    return `https://fonts.googleapis.com/css2?${queryString}`;
}