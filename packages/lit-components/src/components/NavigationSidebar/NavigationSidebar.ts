import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { NavigationSidebarView } from './NavigationSidebarView';

export interface NavigationSidebarProps {
  header?: string;
  backgroundColor?: string;
  borderColor?: string;
  width?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-navigation-sidebar': HTMLElement;
  }
}

export const NavigationSidebar = useComponent<NavigationSidebarProps>(
  (host) => {
    const props: NavigationSidebarProps = {
      width: '250px',
      ...getProps(host),
    };

    return NavigationSidebarView(props);
  },
  'sql-navigation-sidebar',
  ['header', 'background-color', 'border-color', 'width'] as const
);
