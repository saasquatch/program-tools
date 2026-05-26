import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ReferralCardView } from './ReferralCardView';

export interface ReferralCardProps {
  padding: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-card': HTMLElement;
  }
}

export const ReferralCard = useComponent<ReferralCardProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<ReferralCardProps>;
    const padding = rawProps.padding;
    const props: ReferralCardProps = {
      padding:
        padding === 'none' || padding === 'small' || padding === 'medium' || padding === 'large'
          ? padding
          : 'medium',
      backgroundColor: rawProps.backgroundColor,
      borderColor: rawProps.borderColor,
      borderRadius: rawProps.borderRadius ? Number(rawProps.borderRadius) : undefined,
    };

    return ReferralCardView(props);
  },
  'sql-referral-card',
  ['padding', 'background-color', 'border-color', 'border-radius'] as const
);
