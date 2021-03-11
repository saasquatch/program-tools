import { BigStatViewProps } from './big-stat-view';

interface BigStatProps extends BigStatViewProps {}

export function useBigStat(props: BigStatProps): BigStatViewProps {
  return props;
}
