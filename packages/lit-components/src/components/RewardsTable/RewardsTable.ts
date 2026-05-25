import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { RewardsTableView } from './RewardsTableView';
import { useRewardsTable } from './useRewardsTable';

export interface RewardsTableProps {
  perPage: number;
  programId?: string;
  showLabels: boolean;
  dateShownColumn: string;
  rewardShownColumn: string;
  sourceShownColumn: string;
  statusShownColumn: string;
  emptyStateText: string;
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsedValue = Number(value);
    return Number.isNaN(parsedValue) ? fallback : parsedValue;
  }
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-rewards-table': HTMLElement;
  }
}

export const RewardsTable = useComponent<RewardsTableProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof RewardsTableProps, unknown>>;
    const props: RewardsTableProps = {
      perPage: parseNumber(rawProps.perPage, 4),
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      showLabels: parseBoolean(rawProps.showLabels, true),
      dateShownColumn:
        typeof rawProps.dateShownColumn === 'string' ? rawProps.dateShownColumn : 'Date Received',
      rewardShownColumn: typeof rawProps.rewardShownColumn === 'string' ? rawProps.rewardShownColumn : 'Reward',
      sourceShownColumn: typeof rawProps.sourceShownColumn === 'string' ? rawProps.sourceShownColumn : 'Source',
      statusShownColumn: typeof rawProps.statusShownColumn === 'string' ? rawProps.statusShownColumn : 'Status',
      emptyStateText: typeof rawProps.emptyStateText === 'string' ? rawProps.emptyStateText : 'No rewards yet',
    };

    const hookProps = useRewardsTable(props);

    return RewardsTableView({ ...props, ...hookProps });
  },
  'sql-rewards-table',
  [
    'per-page',
    'program-id',
    'show-labels',
    'date-shown-column',
    'reward-shown-column',
    'source-shown-column',
    'status-shown-column',
    'empty-state-text',
  ] as const
);
