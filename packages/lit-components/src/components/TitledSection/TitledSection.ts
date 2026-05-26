import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TitledSectionView } from './TitledSectionView';

export type TitledSectionSpacing =
  | 'none'
  | 'xxx-small'
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
  | 'xxx-large'
  | 'xxxx-large';

export interface TitledSectionProps {
  label?: string;
  textAlign: 'left' | 'center' | 'right';
  labelMargin: TitledSectionSpacing;
  padding: TitledSectionSpacing;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-titled-section': HTMLElement;
  }
}

export const TitledSection = useComponent<TitledSectionProps>(
  (host) => {
    const props: TitledSectionProps = {
      textAlign: 'left',
      labelMargin: 'small',
      padding: 'none',
      ...getProps(host),
    } as TitledSectionProps;

    return TitledSectionView(props);
  },
  'sql-titled-section',
  ['label', 'text-align', 'label-margin', 'padding'] as const
);
