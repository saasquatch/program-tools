import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { NavigationMenuView } from './NavigationMenuView';
import { useNavigationMenu } from './useNavigationMenu';

export interface NavigationMenuProps {
  menuStyle?: 'tabs' | 'dropdown';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-navigation-menu': HTMLElement;
  }
}

export const NavigationMenu = useComponent<NavigationMenuProps>(
  (host) => {
    const props: NavigationMenuProps = {
      menuStyle: 'tabs',
      ...getProps(host),
    };

    const hookProps = useNavigationMenu(props);

    return NavigationMenuView({ ...props, ...hookProps });
  },
  'sql-navigation-menu',
  ['menu-style'] as const
);
