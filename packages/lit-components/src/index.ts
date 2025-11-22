/**
 * Lit Components Library
 * Web components built with Lit and Haunted for state management
 */

// Export all components
export { CounterComponent } from './components/CounterComponent';

// Export hooks
export { useHost, withHostProvider, HostContext } from './hooks/useHost';

// Version
export const VERSION = '0.0.0';

import { setImplementation } from '@saasquatch/universal-hooks';
import * as haunted from 'haunted';

import { setUseHostImplementation } from '@saasquatch/component-boilerplate';

// Re-export useHost for component-boilerplate compatibility
// import { useHost } from './hooks/useHost';

// setUseHostImplementation(useHost);

// Set Haunted as the implementation for universal-hooks
setImplementation(haunted);
