import { useQuery } from '@saasquatch/component-boilerplate';
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
export function useConditionalSection(props: ConditionalSegmentProps) {
  const { loading, data } = useQuery(UserQuery, {});

  const expr = useMemo(() => {
    return jsonata(props.expression);
  }, [props.expression]);

  let result: any;
  try {
    result = expr.evaluate(data);
  } catch (e) {}

  return {
    shouldDisplay: !loading && result,
  };
}
