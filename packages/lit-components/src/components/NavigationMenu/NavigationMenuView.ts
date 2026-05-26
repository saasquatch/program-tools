import { html } from 'lit';
import { UI } from '../../ui';
import type { NavigationMenuProps } from './NavigationMenu';
import { useNavigationMenu } from './useNavigationMenu';

export function NavigationMenuView(
  props: NavigationMenuProps & ReturnType<typeof useNavigationMenu>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .nav-menu-tabs {
        display: flex;
        gap: var(--sl-spacing-small);
        border-bottom: 1px solid var(--sl-color-neutral-200);
        padding: 0 var(--sl-spacing-medium);
      }
    </style>
    ${props.menuStyle === 'dropdown'
      ? html`
          ${UI.Dropdown({
            open: props.isOpen,
            trigger: UI.Button({ caret: true, onClick: props.toggleMenu, children: 'Menu' }),
            children: html`${UI.Menu({ children: html`<slot></slot>` })}`,
          })}
        `
      : html`
          <div class="nav-menu-tabs" data-selected-index="${props.selectedIndex}">
            <slot></slot>
          </div>
        `}
  `;
}
