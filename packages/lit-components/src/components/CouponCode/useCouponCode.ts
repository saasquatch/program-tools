import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { CouponCodeProps } from './CouponCode';

const CouponCodeQuery = gql`
  query getCouponCode($programId: ID, $rewardKey: String) {
    user: viewer {
      ... on User {
        rewards(
          filter: { programId_eq: $programId, type_eq: "FUEL_TANK", fuelTankCode_exists: true }
        ) {
          data {
            fuelTankCode
            dateExpires
            statuses
          }
        }
      }
    }
  }
`;

export function useCouponCode(props: CouponCodeProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(
    CouponCodeQuery,
    { programId, rewardKey: props.rewardKey },
    !user?.jwt
  );
  const [open, setOpen] = useState(false);

  const rewards = data?.user?.rewards?.data || [];
  const reward = rewards[0];
  const code = reward?.fuelTankCode;
  const statuses = reward?.statuses || [];

  let error = '';
  if (!loading && !code) {
    if (statuses.includes('PENDING')) error = props.errorTextPending;
    else if (statuses.includes('CANCELLED')) error = props.errorTextCancelled;
    else if (statuses.includes('EXPIRED')) error = props.errorTextExpired;
    else if (statuses.includes('REDEEMED')) error = props.errorTextRedeemed;
    else if (statuses.includes('FULFILLED')) error = props.errorTextFulfilled;
    else error = props.errorTextGeneric;
  }

  const copyString = code || '...';

  function onClick() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltipLifespan);
  }

  return {
    onClick,
    open,
    disabled: loading || !!error,
    loading,
    copyString,
    error,
    isCopied: false,
  };
}
