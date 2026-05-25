import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ProgramExplainerStepView } from './ProgramExplainerStepView';

export interface ProgramExplainerStepProps {
  stepTitle?: string;
  stepDescription?: string;
  stepNumber?: number;
  icon?: string;
  iconColor: string;
}

const parseNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-program-explainer-step': HTMLElement;
  }
}

export const ProgramExplainerStep = useComponent<ProgramExplainerStepProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof ProgramExplainerStepProps, unknown>>;
    const props: ProgramExplainerStepProps = {
      stepTitle: typeof rawProps.stepTitle === 'string' ? rawProps.stepTitle : undefined,
      stepDescription:
        typeof rawProps.stepDescription === 'string' ? rawProps.stepDescription : undefined,
      stepNumber: parseNumber(rawProps.stepNumber),
      icon: typeof rawProps.icon === 'string' ? rawProps.icon : undefined,
      iconColor:
        typeof rawProps.iconColor === 'string'
          ? rawProps.iconColor
          : 'var(--sl-color-primary-600)',
    };

    return ProgramExplainerStepView(props);
  },
  'sql-program-explainer-step',
  ['step-title', 'step-description', 'step-number', 'icon', 'icon-color'] as const
);
