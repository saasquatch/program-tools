import { useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { useMemo } from '@saasquatch/universal-hooks';
import jsonata from 'jsonata';

const UserQuery = gql`
  {
    user: viewer {
      ... on User {
        customFields
        segments
      }
    }
  }
`;

export type ConditionalSegmentProps = {
  expression: string;
};
export type UseConditionalSection = {
  shouldDisplay: boolean;
};
export function useConditionalSection({ expression = 'false' }: ConditionalSegmentProps) {
  const user = useUserIdentity();
  const { loading, data } = useQuery(UserQuery, {}, !user?.jwt);

  const expr = useMemo(() => {
    // Defaults to false
    return jsonata(expression);
  }, [expression]);

  let result: any;
  try {
    result = expr.evaluate(data);
  } catch (e) {}

  return {
    shouldDisplay: user?.jwt && !loading && result,
  };
}
