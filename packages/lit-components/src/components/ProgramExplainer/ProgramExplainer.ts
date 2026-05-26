import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ProgramExplainerView } from './ProgramExplainerView';

export interface ProgramExplainerProps {
  header?: string;
  description?: string;
  layout: 'horizontal' | 'vertical';
}

function parseLayout(value: unknown): ProgramExplainerProps['layout'] {
  return value === 'vertical' ? 'vertical' : 'horizontal';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-program-explainer': HTMLElement;
  }
}

export const ProgramExplainer = useComponent<ProgramExplainerProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof ProgramExplainerProps, unknown>>;
    const props: ProgramExplainerProps = {
      header: typeof rawProps.header === 'string' ? rawProps.header : undefined,
      description: typeof rawProps.description === 'string' ? rawProps.description : undefined,
      layout: parseLayout(rawProps.layout),
    };

    return ProgramExplainerView(props);
  },
  'sql-program-explainer',
  ['header', 'description', 'layout'] as const
);
