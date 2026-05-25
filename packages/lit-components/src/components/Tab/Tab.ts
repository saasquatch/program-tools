import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TabView } from './TabView';

export interface TabProps {
  header: string;
  disabled?: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-tab': HTMLElement;
  }
}

export const Tab = useComponent<TabProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: TabProps = {
      ...rawProps,
      header: rawProps.header || '',
      disabled: host.hasAttribute('disabled') && host.getAttribute('disabled') !== 'false',
    };

    return TabView(props);
  },
  'sql-tab',
  ['header', 'disabled'] as const
);
