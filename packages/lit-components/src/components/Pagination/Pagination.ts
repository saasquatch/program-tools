import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PaginationView } from './PaginationView';
import { useDemoPagination, usePagination } from './usePagination';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  showPreviousLabel?: string;
  showNextLabel?: string;
}

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-pagination': HTMLElement;
  }
}

export const Pagination = useComponent<PaginationProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PaginationProps, unknown>>;
    const props: PaginationProps = {
      currentPage: parseNumber(rawProps.currentPage, 1),
      totalPages: parseNumber(rawProps.totalPages, 1),
      showPreviousLabel:
        typeof rawProps.showPreviousLabel === 'string' ? rawProps.showPreviousLabel : 'Previous',
      showNextLabel: typeof rawProps.showNextLabel === 'string' ? rawProps.showNextLabel : 'Next',
    };

    const hookProps = isDemo() ? useDemoPagination(props) : usePagination(props);

    return PaginationView({ ...props, ...hookProps });
  },
  'sql-pagination',
  ['current-page', 'total-pages', 'show-previous-label', 'show-next-label'] as const
);
