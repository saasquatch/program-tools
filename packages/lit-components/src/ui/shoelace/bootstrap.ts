/**
 * Side-effect Shoelace bootstrap.
 *
 * Moved out of `src/index.ts` so that switching to a different UI framework
 * means not importing this file (and not importing the Shoelace adapter).
 *
 * Sets up:
 *   - the Shoelace autoloader (auto-registers components on first use)
 *   - the CDN base path for icon/asset loading
 *   - the default icon library (bootstrap-icons)
 *   - Shoelace's light theme stylesheet
 */
import { registerIconLibrary, setBasePath } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/themes/light.css';

// Autoloader handles component dependencies automatically.
import('@shoelace-style/shoelace/dist/shoelace-autoloader.js');

// Pin asset loading to the bundled Shoelace version (2.20.1).
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

try {
  registerIconLibrary('default', {
    resolver: (name) => `https://fast.ssqt.io/npm/bootstrap-icons@1.11.3/icons/${name}.svg`,
  });
} catch {
  // Already registered; safe to ignore.
}
