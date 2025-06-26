import * as Themes from "./../components/sqm-stencilbook/Themes";

const LOCAL_STORAGE_BRAND_KEY = "localStorageBrandKey";

export const initializeGlobalBrandingConfig = () => {
  const brand = localStorage.getItem(LOCAL_STORAGE_BRAND_KEY);

  const effectiveBrandName =
    brand && Themes[brand as keyof typeof Themes] ? brand : "Netflix"; // Default if not found or invalid

  window.SquatchBrandingConfig =
    Themes[effectiveBrandName as keyof typeof Themes] || Themes.Netflix; // Use fallback

  const event = new CustomEvent("brandingConfigUpdated", {
    detail: window.SquatchBrandingConfig,
  });
  window.dispatchEvent(event);
};
