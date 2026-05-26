import { useComponent } from '../../hooks/useComponent';
import { RouterView } from './RouterView';
import { useRouter } from './useRouter';

export interface RouterProps {}

declare global {
  interface HTMLElementTagNameMap {
    'sql-router': HTMLElement;
  }
}

export const Router = useComponent<RouterProps>((_host) => {
  const hookProps = useRouter();

  return RouterView({ ...hookProps });
}, 'sql-router');
