import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { RewardExchangeListView } from './RewardExchangeListView';
import { useRewardExchangeList } from './useRewardExchangeList';

export interface RewardExchangeItem {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  costPrettyValue: string;
  costValue?: number;
  available?: boolean;
}

export interface RewardExchangeListProps {
  headerText: string;
  emptyText: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-reward-exchange-list': HTMLElement;
  }
}

export const RewardExchangeList = useComponent<RewardExchangeListProps>(
  (host) => {
    const props: RewardExchangeListProps = {
      headerText: 'Redeem Rewards',
      emptyText: 'No rewards available to redeem',
      ...getProps(host),
    };

    const hookProps = useRewardExchangeList(props);

    return RewardExchangeListView({ ...props, ...hookProps });
  },
  'sql-reward-exchange-list',
  ['header-text', 'empty-text', 'program-id'] as const
);
