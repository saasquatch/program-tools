import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalFooterView } from './PortalFooterView';

export interface PortalFooterProps {
  supportEmail?: string;
  supportLink?: string;
  faqLink?: string;
  faqText: string;
  termsLink?: string;
  termsText: string;
  showPoweredBy: boolean;
  textColor?: string;
  padding: 'none' | 'small' | 'medium' | 'large';
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-footer': HTMLElement;
  }
}

export const PortalFooter = useComponent<PortalFooterProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalFooterProps, unknown>>;
    const props: PortalFooterProps = {
      supportEmail: typeof rawProps.supportEmail === 'string' ? rawProps.supportEmail : undefined,
      supportLink: typeof rawProps.supportLink === 'string' ? rawProps.supportLink : undefined,
      faqLink: typeof rawProps.faqLink === 'string' ? rawProps.faqLink : undefined,
      faqText: typeof rawProps.faqText === 'string' ? rawProps.faqText : 'FAQ',
      termsLink: typeof rawProps.termsLink === 'string' ? rawProps.termsLink : undefined,
      termsText: typeof rawProps.termsText === 'string' ? rawProps.termsText : 'Terms & Conditions',
      showPoweredBy: parseBoolean(rawProps.showPoweredBy, true),
      textColor: typeof rawProps.textColor === 'string' ? rawProps.textColor : undefined,
      padding:
        rawProps.padding === 'none' || rawProps.padding === 'small' || rawProps.padding === 'large'
          ? rawProps.padding
          : 'medium',
    };

    return PortalFooterView(props);
  },
  'sql-portal-footer',
  [
    'support-email',
    'support-link',
    'faq-link',
    'faq-text',
    'terms-link',
    'terms-text',
    'show-powered-by',
    'text-color',
    'padding',
  ] as const
);
