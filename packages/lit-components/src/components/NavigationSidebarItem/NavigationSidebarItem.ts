import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { NavigationSidebarItemView } from './NavigationSidebarItemView';
import { useDemoNavigationSidebarItem, useNavigationSidebarItem } from './useNavigationSidebarItem';

export interface NavigationSidebarItemProps {
  label: string;
  icon?: string;
  path?: string;
  selected?: boolean;
  disabled?: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-navigation-sidebar-item': HTMLElement;
  }
}

export const NavigationSidebarItem = useComponent<NavigationSidebarItemProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: NavigationSidebarItemProps = {
      ...rawProps,
      label: rawProps.label || '',
      selected: host.hasAttribute('selected') && host.getAttribute('selected') !== 'false',
      disabled: host.hasAttribute('disabled') && host.getAttribute('disabled') !== 'false',
    };

    const hookProps = isDemo() ? useDemoNavigationSidebarItem(props) : useNavigationSidebarItem(props);

    return NavigationSidebarItemView({ ...props, ...hookProps });
  },
  'sql-navigation-sidebar-item',
  ['label', 'icon', 'path', 'selected', 'disabled'] as const
);
