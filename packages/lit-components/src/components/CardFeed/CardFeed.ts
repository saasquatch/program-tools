import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { CardFeedView } from './CardFeedView';

export interface CardFeedProps {
  width: number;
  gap: number;
}

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-card-feed': HTMLElement;
  }
}

export const CardFeed = useComponent<CardFeedProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof CardFeedProps, unknown>>;
    const props: CardFeedProps = {
      width: parseNumber(rawProps.width, 347),
      gap: parseNumber(rawProps.gap, 24),
    };

    return CardFeedView(props);
  },
  'sql-card-feed',
  ['width', 'gap'] as const
);
