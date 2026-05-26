import { useComponent } from '../../hooks/useComponent';
import { TabsView } from './TabsView';
import { useTabs } from './useTabs';

export interface TabsProps {}

declare global {
  interface HTMLElementTagNameMap {
    'sql-tabs': HTMLElement;
  }
}

export const Tabs = useComponent<TabsProps>((_host) => {
  const hookProps = useTabs();

  return TabsView({ ...hookProps });
}, 'sql-tabs');
