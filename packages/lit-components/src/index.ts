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

import {
  SlAlert,
  SlAnimation,
  SlAvatar,
  SlBadge,
  SlButton,
  SlButtonGroup,
  SlCard,
  SlCheckbox,
  SlColorPicker,
  SlDetails,
  SlDialog,
  SlDrawer,
  SlDropdown,
  SlFormatBytes,
  SlFormatDate,
  SlFormatNumber,
  SlIcon,
  SlIconButton,
  SlImageComparer,
  SlInclude,
  SlInput,
  SlMenu,
  SlMenuItem,
  SlMenuLabel,
  SlProgressBar,
  SlProgressRing,
  SlRadio,
  SlRange,
  SlRating,
  SlRelativeTime,
  SlResizeObserver,
  SlSelect,
  SlSkeleton,
  SlSpinner,
  SlSwitch,
  SlTab,
  SlTabGroup,
  SlTabPanel,
  SlTag,
  SlTooltip,
} from '@shoelace-style/shoelace';

setBasePath('/dist/shoelace');
registerIconLibrary('default', {
  resolver: (name) => `https://fast.ssqt.io/npm/bootstrap-icons@1.11.3/icons/${name}.svg`,
});

// Set Haunted as the implementation for universal-hooks
setImplementation(haunted);
setUseHostImplementation(useHost);
try {
  customElements.define('sl-alert', SlAlert);
  customElements.define('sl-animation', SlAnimation);
  customElements.define('sl-avatar', SlAvatar);
  customElements.define('sl-badge', SlBadge);
  customElements.define('sl-button', SlButton);
  customElements.define('sl-button-group', SlButtonGroup);
  customElements.define('sl-card', SlCard);
  customElements.define('sl-checkbox', SlCheckbox);
  customElements.define('sl-color-picker', SlColorPicker);
  customElements.define('sl-details', SlDetails);
  customElements.define('sl-dialog', SlDialog);
  customElements.define('sl-drawer', SlDrawer);
  customElements.define('sl-dropdown', SlDropdown);
  customElements.define('sl-format-bytes', SlFormatBytes);
  customElements.define('sl-format-date', SlFormatDate);
  customElements.define('sl-format-number', SlFormatNumber);
  customElements.define('sl-icon', SlIcon);
  customElements.define('sl-icon-button', SlIconButton);
  customElements.define('sl-image-comparer', SlImageComparer);
  customElements.define('sl-include', SlInclude);
  customElements.define('sl-input', SlInput);
  customElements.define('sl-menu', SlMenu);
  customElements.define('sl-menu-item', SlMenuItem);
  customElements.define('sl-menu-label', SlMenuLabel);
  customElements.define('sl-progress-bar', SlProgressBar);
  customElements.define('sl-progress-ring', SlProgressRing);
  customElements.define('sl-radio', SlRadio);
  customElements.define('sl-range', SlRange);
  customElements.define('sl-rating', SlRating);
  customElements.define('sl-relative-time', SlRelativeTime);
  customElements.define('sl-resize-observer', SlResizeObserver);
  customElements.define('sl-select', SlSelect);
  customElements.define('sl-skeleton', SlSkeleton);
  customElements.define('sl-spinner', SlSpinner);
  customElements.define('sl-switch', SlSwitch);
  customElements.define('sl-tab', SlTab);
  customElements.define('sl-tab-group', SlTabGroup);
  customElements.define('sl-tab-panel', SlTabPanel);
  customElements.define('sl-tag', SlTag);
  customElements.define('sl-tooltip', SlTooltip);
} catch (error) {
  console.log('components already registered');
}
