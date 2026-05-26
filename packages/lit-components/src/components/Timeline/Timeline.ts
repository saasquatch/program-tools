import { useComponent } from '../../hooks/useComponent';
import { TimelineView } from './TimelineView';

declare global {
  interface HTMLElementTagNameMap {
    'sql-timeline': HTMLElement;
  }
}

export const Timeline = useComponent(() => TimelineView(), 'sql-timeline');
