import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { EmptyView } from './EmptyView';

export interface EmptyProps {
  emptyStateImage?: string;
  emptyStateHeader?: string;
  emptyStateText?: string;
  supportText?: string;
}

const DEFAULT_EMPTY_STATE_IMAGE =
  'https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_leaderboard2.png';

declare global {
  interface HTMLElementTagNameMap {
    'sql-empty': HTMLElement;
  }
}

export const Empty = useComponent<EmptyProps>(
  (host) => {
    if (!host.getAttribute('slot')) {
      host.setAttribute('slot', 'empty');
    }

    const rawProps = getProps(host) as Partial<EmptyProps>;
    const props: EmptyProps = {
      emptyStateImage: rawProps.emptyStateImage !== undefined ? rawProps.emptyStateImage : DEFAULT_EMPTY_STATE_IMAGE,
      emptyStateHeader: rawProps.emptyStateHeader,
      emptyStateText: rawProps.emptyStateText,
      supportText: rawProps.supportText,
    };

    return EmptyView(props);
  },
  'sql-empty',
  ['empty-state-image', 'empty-state-header', 'empty-state-text', 'support-text'] as const
);
