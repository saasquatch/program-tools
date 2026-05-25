import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { RouteView } from './RouteView';
import { useRoute } from './useRoute';

export interface RouteProps {
  path: string;
  exact?: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-route': HTMLElement;
  }
}

export const Route = useComponent<RouteProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: RouteProps = {
      ...rawProps,
      path: rawProps.path || '',
      exact: host.hasAttribute('exact') && host.getAttribute('exact') !== 'false',
    };

    const hookProps = useRoute(props);
    host.toggleAttribute('hidden', !hookProps.visible);

    return RouteView({ ...props, ...hookProps });
  },
  'sql-route',
  ['path', 'exact'] as const
);
