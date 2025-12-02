/**
 * Lit Components Library
 * Web components built with Lit and Haunted for state management
 */

// Export all components
export { CounterComponent } from './components/CounterComponent';
export * from './components/ReferralCode';

// Export hooks
export { HostContext, useHost, withHostProvider } from './hooks/useHost';

// Version
export const VERSION = '0.0.0';

import { setImplementation } from '@saasquatch/universal-hooks';
import * as haunted from 'haunted';

import { setUseHostImplementation } from '@saasquatch/component-boilerplate';

// Re-export useHost for component-boilerplate compatibility
import { useHost } from './hooks/useHost';

// Shoelace setup
import { registerIconLibrary, setBasePath } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/themes/light.css';

// Always set base path and icon library to ensure this version takes precedence
// Use autoloader to handle component dependencies automatically
import('@shoelace-style/shoelace/dist/shoelace-autoloader.js');

// Set base path to Shoelace CDN for asset loading (this version: 2.20.1)
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/');

// Register icon library (will override if already set)
try {
  registerIconLibrary('default', {
    resolver: (name) => `https://fast.ssqt.io/npm/bootstrap-icons@1.11.3/icons/${name}.svg`,
  });
} catch (e) {
  // Icon library already registered, that's ok
}

// Set Haunted as the implementation for universal-hooks
setImplementation(haunted);
setUseHostImplementation(useHost);
