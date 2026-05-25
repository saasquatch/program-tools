import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TimelineEntryView } from './TimelineEntryView';

export interface TimelineEntryProps {
  entryLabel?: string;
  entryDescription?: string;
  entryDate?: string;
  entryIcon: string;
  entryColor: string;
  status: 'complete' | 'active' | 'pending';
}

function parseStatus(value: unknown): TimelineEntryProps['status'] {
  return value === 'complete' || value === 'active' ? value : 'pending';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-timeline-entry': HTMLElement;
  }
}

export const TimelineEntry = useComponent<TimelineEntryProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof TimelineEntryProps, unknown>>;
    const props: TimelineEntryProps = {
      entryLabel: typeof rawProps.entryLabel === 'string' ? rawProps.entryLabel : undefined,
      entryDescription:
        typeof rawProps.entryDescription === 'string' ? rawProps.entryDescription : undefined,
      entryDate: typeof rawProps.entryDate === 'string' ? rawProps.entryDate : undefined,
      entryIcon: typeof rawProps.entryIcon === 'string' ? rawProps.entryIcon : 'circle-fill',
      entryColor:
        typeof rawProps.entryColor === 'string'
          ? rawProps.entryColor
          : 'var(--sl-color-primary-600)',
      status: parseStatus(rawProps.status),
    };

    return TimelineEntryView(props);
  },
  'sql-timeline-entry',
  ['entry-label', 'entry-description', 'entry-date', 'entry-icon', 'entry-color', 'status'] as const
);
