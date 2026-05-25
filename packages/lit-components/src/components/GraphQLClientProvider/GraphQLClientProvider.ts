import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { GraphQLClientProviderView } from './GraphQLClientProviderView';

export interface GraphQLClientProviderProps {
  domain?: string;
  tenantAlias?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-graphql-client-provider': HTMLElement;
  }
}

export const GraphQLClientProvider = useComponent<GraphQLClientProviderProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: GraphQLClientProviderProps = {
      domain: rawProps.domain || undefined,
      tenantAlias: rawProps.tenantAlias || undefined,
    };

    return GraphQLClientProviderView(props);
  },
  'sql-graphql-client-provider',
  ['domain', 'tenant-alias'] as const
);
