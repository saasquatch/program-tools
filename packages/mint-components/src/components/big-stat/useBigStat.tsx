import { BigStatViewProps } from './big-stat-view';

interface BigStatProps {statdescription: string}

export function useBigStat(props: BigStatProps): BigStatViewProps {
  return {statvalue: 0, ...props};
}
