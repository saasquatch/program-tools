/**
 * Shoelace implementation of the framework-agnostic UI contract.
 *
 * Each function maps a normalized props object onto the equivalent
 * `<sl-*>` element with the right attributes, slots, and `@sl-*` event
 * bindings. Views never see this layer directly — they consume `UI.Xxx(...)`
 * from `src/ui/registry.ts`, which dispatches here when this adapter is
 * registered via `setUI(shoelaceUI)` in `src/index.ts`.
 *
 * Replacing Shoelace means writing a parallel file (`src/ui/<other>/index.ts`)
 * exporting a `UIComponents`-typed object and calling `setUI()` with it.
 */
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type {
  AlertProps,
  BadgeProps,
  ButtonProps,
  CheckboxProps,
  DialogProps,
  DropdownProps,
  IconButtonProps,
  IconProps,
  InputProps,
  MenuItemProps,
  MenuProps,
  OptionProps,
  SelectProps,
  SpinnerProps,
  TabGroupProps,
  TabPanelProps,
  TabProps,
  TooltipProps,
  UIComponents,
  Renderable,
} from '../types';

/**
 * Render the standard help-text / error footer used by form fields.
 * Keeps the "error renders in red, otherwise show helpText" logic in one place
 * so every field-shaped adapter stays consistent.
 */
function helpTextSlot(error: Renderable, helpText: Renderable) {
  if (error !== undefined && error !== null && error !== false && error !== '') {
    return html`<span slot="help-text" style="color: var(--sl-color-danger-600)">${error}</span>`;
  }
  if (helpText !== undefined && helpText !== null && helpText !== false && helpText !== '') {
    return html`<span slot="help-text">${helpText}</span>`;
  }
  return nothing;
}

export const shoelaceUI: UIComponents = {
  Input(props: InputProps) {
    return html`<sl-input
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      exportparts=${ifDefined(props.exportparts)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      id=${ifDefined(props.id)}
      label=${ifDefined(props.label)}
      name=${ifDefined(props.name)}
      type=${ifDefined(props.type)}
      placeholder=${ifDefined(props.placeholder)}
      ?required=${props.required ?? false}
      ?disabled=${props.disabled ?? false}
      ?readonly=${props.readonly ?? false}
      ?password-toggle=${props.passwordToggle ?? false}
      size=${ifDefined(props.size)}
      minlength=${ifDefined(props.minLength)}
      maxlength=${ifDefined(props.maxLength)}
      pattern=${ifDefined(props.pattern)}
      .value=${props.value ?? ''}
      @sl-input=${props.onInput ?? null}
      @sl-change=${props.onChange ?? null}
      @sl-blur=${props.onBlur ?? null}
      @sl-focus=${props.onFocus ?? null}
    >
      ${props.prefix ? html`<span slot="prefix">${props.prefix}</span>` : nothing}
      ${props.suffix ? html`<span slot="suffix">${props.suffix}</span>` : nothing}
      ${props.children ?? nothing} ${helpTextSlot(props.error, props.helpText)}
    </sl-input>`;
  },

  Select(props: SelectProps) {
    return html`<sl-select
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      exportparts=${ifDefined(props.exportparts)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      id=${ifDefined(props.id)}
      label=${ifDefined(props.label)}
      name=${ifDefined(props.name)}
      placeholder=${ifDefined(props.placeholder)}
      ?required=${props.required ?? false}
      ?disabled=${props.disabled ?? false}
      size=${ifDefined(props.size)}
      .value=${props.value ?? ''}
      @sl-change=${props.onChange ?? null}
      @sl-blur=${props.onBlur ?? null}
    >
      ${props.children ?? nothing} ${helpTextSlot(props.error, props.helpText)}
    </sl-select>`;
  },

  Option(props: OptionProps) {
    return html`<sl-option
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      value=${props.value}
      ?disabled=${props.disabled ?? false}
      >${props.children ?? nothing}</sl-option
    >`;
  },

  Checkbox(props: CheckboxProps) {
    return html`<sl-checkbox
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      name=${ifDefined(props.name)}
      value=${ifDefined(props.value)}
      size=${ifDefined(props.size)}
      ?checked=${props.checked ?? false}
      ?required=${props.required ?? false}
      ?disabled=${props.disabled ?? false}
      @sl-change=${props.onChange ?? null}
      @sl-input=${props.onInput ?? null}
      >${props.children ?? nothing}</sl-checkbox
    >`;
  },

  Button(props: ButtonProps) {
    return html`<sl-button
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      exportparts=${ifDefined(props.exportparts)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      id=${ifDefined(props.id)}
      variant=${ifDefined(props.variant)}
      size=${ifDefined(props.size)}
      type=${ifDefined(props.type)}
      href=${ifDefined(props.href)}
      target=${ifDefined(props.target)}
      rel=${ifDefined(props.rel)}
      ?disabled=${props.disabled ?? false}
      ?loading=${props.loading ?? false}
      ?pill=${props.pill ?? false}
      ?outline=${props.outline ?? false}
      ?caret=${props.caret ?? false}
      @click=${props.onClick ?? null}
    >
      ${props.prefix ? html`<span slot="prefix">${props.prefix}</span>` : nothing}
      ${props.children ?? nothing}
      ${props.suffix ? html`<span slot="suffix">${props.suffix}</span>` : nothing}
    </sl-button>`;
  },

  IconButton(props: IconButtonProps) {
    return html`<sl-icon-button
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      exportparts=${ifDefined(props.exportparts)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      name=${ifDefined(props.name)}
      src=${ifDefined(props.src)}
      label=${ifDefined(props.label)}
      ?disabled=${props.disabled ?? false}
      @click=${props.onClick ?? null}
    ></sl-icon-button>`;
  },

  Icon(props: IconProps) {
    return html`<sl-icon
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      exportparts=${ifDefined(props.exportparts)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      name=${ifDefined(props.name)}
      src=${ifDefined(props.src)}
      label=${ifDefined(props.label)}
    ></sl-icon>`;
  },

  Badge(props: BadgeProps) {
    return html`<sl-badge
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      variant=${ifDefined(props.variant)}
      ?pill=${props.pill ?? false}
      ?pulse=${props.pulse ?? false}
      >${props.children ?? nothing}</sl-badge
    >`;
  },

  Spinner(props: SpinnerProps) {
    return html`<sl-spinner
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
    ></sl-spinner>`;
  },

  Alert(props: AlertProps) {
    return html`<sl-alert
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      variant=${ifDefined(props.variant)}
      duration=${ifDefined(props.duration)}
      ?open=${props.open ?? false}
      ?closable=${props.closable ?? false}
    >
      ${props.icon ? html`<span slot="icon">${props.icon}</span>` : nothing}
      ${props.children ?? nothing}
    </sl-alert>`;
  },

  Tooltip(props: TooltipProps) {
    return html`<sl-tooltip
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      content=${ifDefined(props.content)}
      placement=${ifDefined(props.placement)}
      trigger=${ifDefined(props.trigger)}
      skidding=${ifDefined(props.skidding)}
      distance=${ifDefined(props.distance)}
      ?open=${props.open ?? false}
      ?disabled=${props.disabled ?? false}
      ?hoist=${props.hoist ?? false}
      >${props.children ?? nothing}</sl-tooltip
    >`;
  },

  Dialog(props: DialogProps) {
    return html`<sl-dialog
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      label=${ifDefined(props.label)}
      ?open=${props.open ?? false}
      ?no-header=${props.noHeader ?? false}
      @sl-request-close=${props.onRequestClose ?? null}
      @sl-after-hide=${props.onAfterHide ?? null}
      @sl-show=${props.onShow ?? null}
      @sl-after-show=${props.onAfterShow ?? null}
      >${props.children ?? nothing}</sl-dialog
    >`;
  },

  Dropdown(props: DropdownProps) {
    return html`<sl-dropdown
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      placement=${ifDefined(props.placement)}
      ?open=${props.open ?? false}
      ?disabled=${props.disabled ?? false}
      ?hoist=${props.hoist ?? false}
      @sl-show=${props.onShow ?? null}
      @sl-hide=${props.onHide ?? null}
    >
      ${props.trigger ? html`<span slot="trigger">${props.trigger}</span>` : nothing}
      ${props.children ?? nothing}
    </sl-dropdown>`;
  },

  Menu(props: MenuProps) {
    return html`<sl-menu
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      @sl-select=${props.onSelect ?? null}
      >${props.children ?? nothing}</sl-menu
    >`;
  },

  MenuItem(props: MenuItemProps) {
    return html`<sl-menu-item
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      value=${ifDefined(props.value)}
      type=${ifDefined(props.type)}
      ?checked=${props.checked ?? false}
      ?disabled=${props.disabled ?? false}
      >${props.children ?? nothing}</sl-menu-item
    >`;
  },

  TabGroup(props: TabGroupProps) {
    return html`<sl-tab-group
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${ifDefined(props.slot)}
      placement=${ifDefined(props.placement)}
      activation=${ifDefined(props.activation)}
      @sl-tab-show=${props.onTabShow ?? null}
      >${props.children ?? nothing}</sl-tab-group
    >`;
  },

  Tab(props: TabProps) {
    return html`<sl-tab
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      slot=${props.slot ?? 'nav'}
      panel=${props.panel}
      ?active=${props.active ?? false}
      ?closable=${props.closable ?? false}
      ?disabled=${props.disabled ?? false}
      >${props.children ?? nothing}</sl-tab
    >`;
  },

  TabPanel(props: TabPanelProps) {
    return html`<sl-tab-panel
      class=${ifDefined(props.className)}
      part=${ifDefined(props.part)}
      style=${ifDefined(props.style)}
      name=${props.name}
      ?active=${props.active ?? false}
      >${props.children ?? nothing}</sl-tab-panel
    >`;
  },
};
