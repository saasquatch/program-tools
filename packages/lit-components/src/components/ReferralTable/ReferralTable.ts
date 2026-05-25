import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ReferralTableView } from './ReferralTableView';
import { useReferralTable } from './useReferralTable';

export interface ReferralTableProps {
  perPage: number;
  programId?: string;
  showLabels: boolean;
  hiddenColumns?: string;
  dateShownColumn: string;
  nameShownColumn: string;
  rewardsShownColumn: string;
  statusShownColumn: string;
  emptyStateText: string;
  emptyStateImage?: string;
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
    'sql-referral-table': HTMLElement;
  }
}

export const ReferralTable = useComponent<ReferralTableProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof ReferralTableProps, unknown>>;
    const props: ReferralTableProps = {
      perPage: parseNumber(rawProps.perPage, 4),
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      showLabels: parseBoolean(rawProps.showLabels, true),
      hiddenColumns: typeof rawProps.hiddenColumns === 'string' ? rawProps.hiddenColumns : undefined,
      dateShownColumn:
        typeof rawProps.dateShownColumn === 'string' ? rawProps.dateShownColumn : 'Date Referred',
      nameShownColumn: typeof rawProps.nameShownColumn === 'string' ? rawProps.nameShownColumn : 'Name',
      rewardsShownColumn:
        typeof rawProps.rewardsShownColumn === 'string' ? rawProps.rewardsShownColumn : 'Rewards',
      statusShownColumn:
        typeof rawProps.statusShownColumn === 'string' ? rawProps.statusShownColumn : 'Status',
      emptyStateText: typeof rawProps.emptyStateText === 'string' ? rawProps.emptyStateText : 'No referrals yet',
      emptyStateImage: typeof rawProps.emptyStateImage === 'string' ? rawProps.emptyStateImage : undefined,
    };

    const hookProps = useReferralTable(props);

    return ReferralTableView({ ...props, ...hookProps });
  },
  'sql-referral-table',
  [
    'per-page',
    'program-id',
    'show-labels',
    'hidden-columns',
    'date-shown-column',
    'name-shown-column',
    'rewards-shown-column',
    'status-shown-column',
    'empty-state-text',
    'empty-state-image',
  ] as const
);
