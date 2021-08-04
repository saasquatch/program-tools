import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";

import "@formatjs/intl-pluralrules/polyfill";
import "@formatjs/intl-pluralrules/dist/locale-data/en";
import "babel-polyfill";
import { useHost } from "@saasquatch/stencil-hooks";
import { setUseHostImplementation } from "@saasquatch/component-boilerplate";
import { createIntl, createIntlCache } from "@formatjs/intl";
import debugFn from "debug";
setUseHostImplementation(useHost);

const debug = debugFn("sq:global");
const cache = createIntlCache();
export const intl = createIntl(
  {
    locale: "en",
  },
  cache
);

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
  SlForm,
  SlFormatBytes,
  SlFormatDate,
  SlFormatNumber,
  SlIcon,
  SlIconButton,
  SlImageComparer,
  SlInclude,
  SlInput,
  SlMenu,
  SlMenuDivider,
  SlMenuItem,
  SlMenuLabel,
  SlProgressBar,
  SlProgressRing,
  SlRadio,
  SlRange,
  SlRating,
  SlRelativeTime,
  SlResizeObserver,
  SlResponsiveEmbed,
  SlSelect,
  SlSkeleton,
  SlSpinner,
  SlSwitch,
  SlTab,
  SlTabGroup,
  SlTabPanel,
  SlTag,
  SlTextarea,
  SlTooltip,
  setBasePath,
  registerIconLibrary,
} from "@shoelace-style/shoelace";

try {
  setBasePath("/dist/shoelace");
  // SlAlert.register();
  registerIconLibrary("default", {
    // same link that shoelace uses internally
    resolver: (name) =>
      `https://fast.ssqt.io/npm/bootstrap-icons@1.2.0/icons/${name}.svg`,
  });
  // SlAlert.register();
  customElements.define("sl-alert", SlAlert);
  customElements.define("sl-animation", SlAnimation);
  customElements.define("sl-avatar", SlAvatar);
  customElements.define("sl-badge", SlBadge);
  customElements.define("sl-button", SlButton);
  customElements.define("sl-button-group", SlButtonGroup);
  customElements.define("sl-card", SlCard);
  customElements.define("sl-checkbox", SlCheckbox);
  customElements.define("sl-color-picker", SlColorPicker);
  customElements.define("sl-details", SlDetails);
  customElements.define("sl-dialog", SlDialog);
  customElements.define("sl-drawer", SlDrawer);
  customElements.define("sl-dropdown", SlDropdown);
  customElements.define("sl-form", SlForm);
  customElements.define("sl-format-bytes", SlFormatBytes);
  customElements.define("sl-format-date", SlFormatDate);
  customElements.define("sl-format-number", SlFormatNumber);
  customElements.define("sl-icon", SlIcon);
  customElements.define("sl-icon-button", SlIconButton);
  customElements.define("sl-image-comparer", SlImageComparer);
  customElements.define("sl-include", SlInclude);
  customElements.define("sl-input", SlInput);
  customElements.define("sl-menu", SlMenu);
  customElements.define("sl-menu-divider", SlMenuDivider);
  customElements.define("sl-menu-item", SlMenuItem);
  customElements.define("sl-menu-label", SlMenuLabel);
  customElements.define("sl-progress-bar", SlProgressBar);
  customElements.define("sl-progress-ring", SlProgressRing);
  customElements.define("sl-radio", SlRadio);
  customElements.define("sl-range", SlRange);
  customElements.define("sl-rating", SlRating);
  customElements.define("sl-relative-time", SlRelativeTime);
  customElements.define("sl-resize-observer", SlResizeObserver);
  customElements.define("sl-responsive-embed", SlResponsiveEmbed);
  customElements.define("sl-select", SlSelect);
  customElements.define("sl-skeleton", SlSkeleton);
  customElements.define("sl-spinner", SlSpinner);
  customElements.define("sl-switch", SlSwitch);
  customElements.define("sl-tab", SlTab);
  customElements.define("sl-tab-group", SlTabGroup);
  customElements.define("sl-tab-panel", SlTabPanel);
  customElements.define("sl-tag", SlTag);
  customElements.define("sl-textarea", SlTextarea);
  customElements.define("sl-tooltip", SlTooltip);
} catch (error) {
  debug("components already registered");
}

import { insertCSS } from "../insertcss";

import CSS from "./styles";

try {
  insertCSS(CSS as any);
} catch (error) {
  debug(error);
}
