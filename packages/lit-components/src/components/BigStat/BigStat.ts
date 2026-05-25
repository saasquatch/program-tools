import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { BigStatView } from './BigStatView';
import { useBigStat, useDemoBigStat } from './useBigStat';

export interface BigStatProps {
  statType?: string;
  flexReverse?: boolean;
  alignment?: 'left' | 'right' | 'center';
  programId?: string;
  statTextColor?: string;
  statFontSize?: number;
  statFontWeight?: number;
  descriptionTextColor?: string;
  descriptionFontSize?: number;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

const parseNumber = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return undefined;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-big-stat': HTMLElement;
  }
}

export const BigStat = useComponent<BigStatProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof BigStatProps, unknown>>;
    const props: BigStatProps = {
      statType: typeof rawProps.statType === 'string' ? rawProps.statType : '',
      flexReverse: parseBoolean(rawProps.flexReverse, false),
      alignment:
        rawProps.alignment === 'left' || rawProps.alignment === 'right' || rawProps.alignment === 'center'
          ? rawProps.alignment
          : 'center',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
      statTextColor: typeof rawProps.statTextColor === 'string' ? rawProps.statTextColor : undefined,
      statFontSize: parseNumber(rawProps.statFontSize),
      statFontWeight: parseNumber(rawProps.statFontWeight),
      descriptionTextColor:
        typeof rawProps.descriptionTextColor === 'string' ? rawProps.descriptionTextColor : undefined,
      descriptionFontSize: parseNumber(rawProps.descriptionFontSize),
    };

    const hookProps = isDemo() ? useDemoBigStat(props) : useBigStat(props);

    return BigStatView({ ...props, ...hookProps });
  },
  'sql-big-stat',
  [
    'stat-type',
    'flex-reverse',
    'alignment',
    'program-id',
    'stat-text-color',
    'stat-font-size',
    'stat-font-weight',
    'description-text-color',
    'description-font-size',
  ] as const
);
