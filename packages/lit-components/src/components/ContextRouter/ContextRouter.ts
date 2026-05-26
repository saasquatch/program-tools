import { isDemo } from '@saasquatch/component-boilerplate';
import { useComponent } from '../../hooks/useComponent';
import { ContextRouterView } from './ContextRouterView';
import { useDemoContextRouter, useContextRouter } from './useContextRouter';

export interface ContextRouterProps {}

declare global {
  interface HTMLElementTagNameMap {
    'sql-context-router': HTMLElement;
  }
}

export const ContextRouter = useComponent<ContextRouterProps>(
  () => {
    const props: ContextRouterProps = {};
    const hookProps = isDemo() ? useDemoContextRouter() : useContextRouter();

    return ContextRouterView({ ...props, ...hookProps });
  },
  'sql-context-router',
  [] as const
);
