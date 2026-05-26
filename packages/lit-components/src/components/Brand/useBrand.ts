import { useEffect } from '@saasquatch/universal-hooks';
import { BrandProps } from './Brand';

export interface UseBrandResult {
  font: string;
  brandColorCss: string;
}

function buildFontsCssUrl(font: string): string {
  return `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}`;
}

function escapeCssString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function getBrandColorCss(brandColor?: string): string {
  if (!brandColor) {
    return '';
  }

  return `
    --sql-brand-color: ${brandColor};
    --sl-color-primary-50: color-mix(in srgb, var(--sql-brand-color) 8%, white);
    --sl-color-primary-100: color-mix(in srgb, var(--sql-brand-color) 16%, white);
    --sl-color-primary-200: color-mix(in srgb, var(--sql-brand-color) 28%, white);
    --sl-color-primary-300: color-mix(in srgb, var(--sql-brand-color) 44%, white);
    --sl-color-primary-400: color-mix(in srgb, var(--sql-brand-color) 70%, white);
    --sl-color-primary-500: var(--sql-brand-color);
    --sl-color-primary-600: color-mix(in srgb, var(--sql-brand-color) 88%, black);
    --sl-color-primary-700: color-mix(in srgb, var(--sql-brand-color) 72%, black);
    --sl-color-primary-800: color-mix(in srgb, var(--sql-brand-color) 56%, black);
    --sl-color-primary-900: color-mix(in srgb, var(--sql-brand-color) 40%, black);
    --sl-color-primary-950: color-mix(in srgb, var(--sql-brand-color) 28%, black);
  `;
}

export function useBrand(props: BrandProps): UseBrandResult {
  const sanitizedFont = (props.brandFont || 'Nunito Sans').trim() || 'Nunito Sans';

  useEffect(() => {
    const sheet = document.createElement('link');
    sheet.setAttribute('href', buildFontsCssUrl(sanitizedFont));
    sheet.setAttribute('rel', 'stylesheet');
    document.head.appendChild(sheet);

    return () => {
      if (sheet.parentNode) {
        document.head.removeChild(sheet);
      }
    };
  }, [sanitizedFont]);

  return {
    font: escapeCssString(sanitizedFont),
    brandColorCss: getBrandColorCss(props.brandColor),
  };
}
