import { ReferralListViewProps } from './referral-list-view';

interface ReferralListProps extends ReferralListViewProps {}

export function useReferralList(props: ReferralListProps): ReferralListViewProps {
  return props;
}
