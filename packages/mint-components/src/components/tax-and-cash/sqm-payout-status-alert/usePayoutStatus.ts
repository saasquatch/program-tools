import { useQuery } from "@saasquatch/component-boilerplate";
import { useState, useEffect } from "@saasquatch/stencil-hooks";
import { UserQuery, GET_USER } from "../sqm-tax-and-cash/data";
import { PayoutStatusAlert } from "./sqm-payout-status-alert";
import { gql } from "graphql-request";

export type PayoutStatus =
  | "INFORMATION_REQUIRED"
  | "VERIFICATION_NEEDED"
  | "HOLD"
  | "DONE";

const GET_USER_STATUS = gql`
  query getUserStatus {
    user: viewer {
      ... on User {
        id
        impactConnection {
          connected
          publisher {
            id
            payoutsAccount {
              hold
            }
          }
        }
      }
    }
  }
`;

export function usePayoutStatus(props: PayoutStatusAlert) {
  const { loading, data, errors, refetch } = useQuery<UserQuery>(
    GET_USER_STATUS,
    {}
  );
  const [status, setStatus] = useState<PayoutStatus | undefined>(undefined);

  useEffect(() => {
    if (!data) return;

    function getStatus(data: UserQuery): PayoutStatus {
      const account = data.user.impactConnection?.publisher?.payoutsAccount;

      if (!account) return "INFORMATION_REQUIRED";
      if (account.hold) return "HOLD";
      // @ts-ignore, TODO: add check for account verification
      if (!account.verified) return "VERIFICATION_NEEDED";
      return "DONE";
    }

    const s = getStatus(data);
    setStatus(s);
  }, [data]);

  useEffect(() => {
    const cb = () => refetch();
    window.addEventListener("sqm:tax-form-updated", cb);
    return () => window.removeEventListener("sqm:tax-form-updated", cb);
  }, []);

  return { states: { loading, status, showVerifyIdentity: false }, text: props.getTextProps(), callbacks: { verifyIdentityCancel: () => console.log("AL: TODO")} };
}
